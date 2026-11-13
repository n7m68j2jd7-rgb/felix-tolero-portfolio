"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categories, projects, type Category, type Project } from "@/data/felix";

/* Web & UI has its own section (WebDesign.tsx), so it is left out here. */
const workCategories = categories.filter((c) => c !== "Web & UI");
const workProjects = projects.filter((p) => p.category !== "Web & UI");
const isGallery = (p: Project) => p.layout === "thumbs" || p.category === "Social" || p.category === "Decks";
import { Lightbox } from "@/components/Lightbox";

type Filter = "All" | Category;
type Open = { project: Project; start: number } | null;

const reducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Calls back with true/false as the element enters/leaves the viewport. */
function useInView<T extends HTMLElement>(threshold = 0.35) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return { ref, inView };
}

/* Cycles a card's cover through its first few images while it is on screen. */
function useAutoCycle(count: number, offset: number, active: boolean) {
    const [{ index, prev }, setState] = useState({ index: 0, prev: -1 });

    useEffect(() => {
        if (!active || count < 2 || reducedMotion()) return;
        let timer: ReturnType<typeof setInterval> | undefined;
        const start = setTimeout(() => {
            timer = setInterval(() => setState((s) => ({ index: (s.index + 1) % count, prev: s.index })), 3200);
        }, offset);
        return () => {
            clearTimeout(start);
            clearInterval(timer);
        };
    }, [count, offset, active]);

    return { index, prev };
}

/* Project name shown only on hover, over the image – nothing printed below the work. */
function HoverLabel({ title, sub }: { title: string; sub?: string }) {
    return (
        <span className="fx-hover" aria-hidden="true">
            <span className="fx-hover__title">{title}</span>
            {sub && <span className="fx-hover__sub">{sub}</span>}
        </span>
    );
}

/* Header above each project to separate them. */
function ProjectHeader({ project }: { project: Project }) {
    const unit = project.category === "Decks" ? "slides" : project.layout === "reels" ? "reels" : "pieces";
    return (
        <span className="fx-phead">
            <span className="fx-phead__title">{project.title}</span>
            <span className="fx-phead__sub">
                {project.client} · {project.year}
                {!project.page && (
                    <span className="fx-phead__count">
                        {project.items.length} {unit}
                    </span>
                )}
            </span>
        </span>
    );
}

/* Standard project: one cover that cycles, opens the gallery. */
function WorkCard({ project, order, onOpen }: { project: Project; order: number; onOpen: () => void }) {
    const previews = project.items.slice(0, 4);
    const { ref, inView } = useInView<HTMLElement>();
    const { index, prev } = useAutoCycle(previews.length, (order % 4) * 700, inView);

    const className = `fx-card${project.wide ? " is-wide" : ""}`;
    const body = (
        <>
            <ProjectHeader project={project} />
            <span className="fx-card__media" style={{ aspectRatio: project.ratio }}>
                {previews.map((item, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={item.src}
                        src={item.src}
                        alt=""
                        loading={order < 3 && i === 0 ? "eager" : "lazy"}
                        className={i === index ? "is-on" : i === prev ? "is-prev" : ""}
                    />
                ))}
                <span className="fx-card__count">
                    {project.page
                        ? "View project"
                        : `${project.items.length} ${project.category === "Decks" ? "slides" : "pieces"}`}
                </span>
                <span className="fx-card__open" aria-hidden="true">
                    <i className="icon icon-arrow-right-top" />
                </span>
            </span>
        </>
    );

    if (project.page) {
        return (
            <Link ref={ref as React.Ref<HTMLAnchorElement>} href={project.page} className={className}>
                {body}
            </Link>
        );
    }
    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            className={className}
            onClick={onOpen}
            aria-label={`Open ${project.title}, ${project.items.length} pieces`}
        >
            {body}
        </button>
    );
}

/* Gallery: every graphic visible as a plain image; click to view full size. */
function GalleryGrid({ project, onOpen }: { project: Project; onOpen: (i: number) => void }) {
    const isThumbs = project.layout === "thumbs";
    const isDeck = project.category === "Decks";
    return (
        <div className={`fx-card is-wide fx-links fx-gallery${isDeck ? " is-deck" : ""}`}>
            <ProjectHeader project={project} />
            <div className="fx-links__grid">
                {project.items.map((item, i) => (
                    <button
                        key={item.src}
                        type="button"
                        className={`fx-links__item fx-thumb${isThumbs && i === 0 ? " is-lead" : ""}`}
                        onClick={() => onOpen(i)}
                        aria-label={`View ${item.cap} full size`}
                    >
                        <span className="fx-card__media" style={{ aspectRatio: project.ratio }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.src} alt={item.cap} className="is-on" loading={i < 3 ? "eager" : "lazy"} />
                            <HoverLabel title={isDeck ? project.title : item.cap} sub={project.client} />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

/* Reels: vertical videos side by side, muted autoplay while on screen. */
function ReelsRow({ project, onOpen }: { project: Project; onOpen: (i: number) => void }) {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);
    const videos = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        videos.current.forEach((v) => {
            if (!v) return;
            if (inView && !reducedMotion()) v.play().catch(() => {});
            else v.pause();
        });
    }, [inView]);

    return (
        <div ref={ref} className="fx-card is-wide fx-reels">
            <ProjectHeader project={project} />
            <div className="fx-reels__row">
                {project.items.map((item, i) => (
                    <button
                        key={item.src}
                        type="button"
                        className="fx-reels__item"
                        onClick={() => onOpen(i)}
                        aria-label={`Play ${item.cap} with sound`}
                    >
                        <span className="fx-card__media" style={{ aspectRatio: "9 / 16" }}>
                            <video
                                ref={(el) => {
                                    videos.current[i] = el;
                                }}
                                src={`${item.src}#t=0.5`}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />
                            <span className="fx-play" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                                </svg>
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function Work() {
    const [filter, setFilter] = useState<Filter>("All");
    const [open, setOpen] = useState<Open>(null);

    const shown = useMemo(
        () => (filter === "All" ? workProjects : workProjects.filter((p) => p.category === filter)),
        [filter],
    );

    return (
        <div id="work" className="section-work fx-work flat-spacing">
            <div className="fx-work__head">
                <div className="sect-tag text-caption fw-medium mb-0">
                    <i className="icon icon-high-light" />
                    Selected Work
                </div>
                <div className="fx-filters" role="tablist" aria-label="Filter work">
                    {(["All", ...workCategories] as Filter[]).map((f) => (
                        <button
                            key={f}
                            type="button"
                            role="tab"
                            aria-selected={filter === f}
                            className={`fx-chip${filter === f ? " is-active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="fx-grid">
                {shown.map((p, i) =>
                    isGallery(p) ? (
                        <GalleryGrid key={p.id} project={p} onOpen={(start) => setOpen({ project: p, start })} />
                    ) : p.layout === "reels" ? (
                        <ReelsRow key={p.id} project={p} onOpen={(start) => setOpen({ project: p, start })} />
                    ) : (
                        <WorkCard key={p.id} project={p} order={i} onOpen={() => setOpen({ project: p, start: 0 })} />
                    ),
                )}
            </div>

            {open && <Lightbox project={open.project} start={open.start} onClose={() => setOpen(null)} />}
        </div>
    );
}
