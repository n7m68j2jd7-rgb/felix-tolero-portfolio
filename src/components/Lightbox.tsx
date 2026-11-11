"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import type { Project } from "@/data/felix";

export function Lightbox({ project, start = 0, onClose }: { project: Project; start?: number; onClose: () => void }) {
    const [i, setI] = useState(start);
    const total = project.items.length;
    const item = project.items[i];
    const lenis = useLenis();
    const closeRef = useRef<HTMLButtonElement>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const touchX = useRef<number | null>(null);

    const go = useCallback((d: number) => setI((n) => (n + d + total) % total), [total]);

    useEffect(() => {
        const prevFocus = document.activeElement as HTMLElement | null;
        lenis?.stop();
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            lenis?.start();
            prevFocus?.focus();
        };
    }, [go, onClose, lenis]);

    /* keep the active thumbnail in view */
    useEffect(() => {
        thumbsRef.current
            ?.querySelector<HTMLElement>(".is-active")
            ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, [i]);

    /* preload neighbouring images so arrows feel instant */
    useEffect(() => {
        [1, -1].forEach((d) => {
            const next = project.items[(i + d + total) % total];
            if (next.video) return;
            const img = new Image();
            img.src = next.src;
        });
    }, [i, project, total]);

    return createPortal(
        <div
            className="fx-lb"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="fx-lb__top">
                <div>
                    <p className="fx-lb__title">{project.title}</p>
                    <p className="fx-lb__sub">{project.client}</p>
                </div>
                <button ref={closeRef} type="button" className="fx-lb__btn" onClick={onClose} aria-label="Close">
                    <i className="icon icon-close" />
                </button>
            </div>

            <div
                className="fx-lb__stage"
                onClick={(e) => e.target === e.currentTarget && onClose()}
                onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                    if (touchX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchX.current;
                    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                    touchX.current = null;
                }}
            >
                {total > 1 && (
                    <button type="button" className="fx-lb__btn fx-lb__nav is-prev" onClick={() => go(-1)} aria-label="Previous">
                        <i className="icon icon-arrow-caret-left" />
                    </button>
                )}
                {item.video ? (
                    <video
                        key={item.src}
                        src={item.src}
                        className="fx-lb__img fx-lb__video"
                        controls
                        autoPlay
                        playsInline
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={item.src} src={item.src} alt={item.cap} className="fx-lb__img" />
                )}
                {total > 1 && (
                    <button type="button" className="fx-lb__btn fx-lb__nav is-next" onClick={() => go(1)} aria-label="Next">
                        <i className="icon icon-arrow-caret-right" />
                    </button>
                )}
            </div>

            <div className="fx-lb__bar">
                <p className="fx-lb__cap">
                    <span className="fx-lb__num">
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    {item.cap}
                </p>
                {item.href && (
                    <a className="fx-lb__watch" href={item.href} target="_blank" rel="noopener noreferrer">
                        Watch episode <i className="icon icon-arrow-right-top" />
                    </a>
                )}
            </div>

            {total > 1 && (
                <div className="fx-lb__thumbs" ref={thumbsRef}>
                    {project.items.map((it, n) => (
                        <button
                            key={it.src}
                            type="button"
                            className={n === i ? "is-active" : ""}
                            onClick={() => setI(n)}
                            aria-label={`Show ${it.cap}`}
                        >
                            {it.video ? (
                                <video src={`${it.src}#t=0.5`} muted playsInline preload="metadata" />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={it.src} alt="" loading="lazy" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>,
        document.body,
    );
}
