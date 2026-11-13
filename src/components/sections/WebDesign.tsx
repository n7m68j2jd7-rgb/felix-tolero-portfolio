"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/felix";
import { Lightbox } from "@/components/Lightbox";

type Open = { project: Project; start: number } | null;

/* One website: a hero (top of the home page) with "View more"; the other pages expand below. */
function SiteGallery({ project, onOpen }: { project: Project; onOpen: (page: number) => void }) {
    const [expanded, setExpanded] = useState(false);
    const [home, ...pages] = project.items;
    const panelId = `${project.id}-pages`;

    return (
        <div className={`fx-webgal__wrap${expanded ? " is-open" : ""}`}>
            <div className="fx-webhero">
                <button
                    type="button"
                    className="fx-webhero__media"
                    onClick={() => onOpen(0)}
                    aria-label={`Preview ${project.client} – ${home.cap}`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={home.src} alt="" loading="eager" />
                </button>
                <div className="fx-webhero__overlay">
                    <div className="fx-webhero__text">
                        <p className="fx-webhero__kicker">
                            {project.title} · {project.year}
                        </p>
                        <h3 className="fx-webhero__title">{project.client}</h3>
                    </div>
                    <button
                        type="button"
                        className="fx-webhero__btn"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setExpanded((v) => !v)}
                    >
                        {expanded ? "View less" : `View more · ${project.items.length} pages`}
                        <i className={`icon icon-arrow-${expanded ? "top" : "right-top"}`} />
                    </button>
                </div>
            </div>

            <div id={panelId} className="fx-webgal" hidden={!expanded}>
                {pages.map((item, n) => (
                    <button
                        key={item.src}
                        type="button"
                        className="fx-webgal__item"
                        onClick={() => onOpen(n + 1)}
                        aria-label={`Preview ${project.client} – ${item.cap}`}
                    >
                        <span className="fx-card__media">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.src} alt="" loading="lazy" className="is-on" />
                            <span className="fx-hover" aria-hidden="true">
                                <span className="fx-hover__title">{project.client}</span>
                                <span className="fx-hover__sub">{item.cap}</span>
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function WebDesign() {
    const sites = projects.filter((p) => p.category === "Web & UI");
    const [open, setOpen] = useState<Open>(null);
    if (!sites.length) return null;

    return (
        <div id="web" className="section-web fx-web flat-spacing">
            <div className="sect-tag text-caption fw-medium">
                <i className="icon icon-global-elip" />
                Web Design
            </div>
            <div className="fx-web__list">
                {sites.map((p) => (
                    <SiteGallery key={p.id} project={p} onOpen={(start) => setOpen({ project: p, start })} />
                ))}
            </div>
            {open && <Lightbox project={open.project} start={open.start} onClose={() => setOpen(null)} />}
        </div>
    );
}
