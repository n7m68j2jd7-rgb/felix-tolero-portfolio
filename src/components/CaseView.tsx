"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BodyBackground } from "./BodyBackground";
import { useBodyThemeClass } from "@/hooks/useBodyThemeClass";
import { shortUrl, watchUrl, type CaseStudy, type Video } from "@/data/cases";

const BODY_CLASSES = ["body-default", "dark-v1"];
const SHORTS_PREVIEW = 12;

function PlayIcon({ size = 18 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
    );
}

/* Shows the thumbnail; loads the YouTube player only when clicked. */
function FeaturedPlayer({ video }: { video: Video }) {
    const [playing, setPlaying] = useState(false);
    return (
        <div className="fx-case__player">
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                />
            ) : (
                <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${video.title}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={video.thumb} alt="" fetchPriority="high" />
                    <span className="fx-play is-xl">
                        <PlayIcon size={26} />
                    </span>
                </button>
            )}
        </div>
    );
}

export function CaseView({ study, next }: { study: CaseStudy; next?: CaseStudy }) {
    useBodyThemeClass({ defaultMode: "dark" });
    useEffect(() => {
        document.body.classList.add(...BODY_CLASSES);
        window.scrollTo(0, 0);
        return () => document.body.classList.remove(...BODY_CLASSES);
    }, []);

    const [featured, ...rest] = study.episodes;
    const [showAll, setShowAll] = useState(false);

    return (
        <>
            <BodyBackground showCloudItem={false} showVideo={false} />
            <div className="fx-case">
                <header className="fx-case__nav">
                    <Link href="/#work" className="fx-case__back">
                        <i className="icon icon-arrow-caret-left" /> All work
                    </Link>
                    <Link href="/" className="fx-monogram" aria-label="Felix Tolero, home">
                        FT
                    </Link>
                    <Link href="/#contact" className="fx-case__talk">
                        Let’s talk
                    </Link>
                </header>

                <section className="fx-case__hero">
                    <p className="fx-case__eyebrow">Case study · Podcast &amp; Video</p>
                    <h1 className="fx-case__title">{study.title}</h1>
                    <p className="fx-case__summary">{study.summary}</p>

                    <dl className="fx-case__meta">
                        <div>
                            <dt>Client</dt>
                            <dd>{study.client}</dd>
                        </div>
                        <div>
                            <dt>Role</dt>
                            <dd>{study.role}</dd>
                        </div>
                        <div>
                            <dt>Year</dt>
                            <dd>{study.year}</dd>
                        </div>
                        <div>
                            <dt>Channel</dt>
                            <dd>
                                <a href={study.channel.url} target="_blank" rel="noopener noreferrer">
                                    {study.channel.name} <i className="icon icon-arrow-right-top" />
                                </a>
                            </dd>
                        </div>
                    </dl>
                </section>

                <FeaturedPlayer video={featured} />
                <p className="fx-case__caption">{featured.title}</p>

                {rest.length > 0 && (
                    <section className="fx-case__section">
                        <div className="fx-case__head">
                            <h2>More episodes</h2>
                            <span>Opens on YouTube</span>
                        </div>
                        <div className={`fx-case__eps${rest.length === 1 ? " is-single" : ""}`}>
                            {rest.map((v) => (
                                <a key={v.id} href={watchUrl(v.id)} target="_blank" rel="noopener noreferrer" className="fx-links__item">
                                    <span className="fx-card__media" style={{ aspectRatio: "16 / 9" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={v.thumb} alt="" className="is-on" loading="lazy" />
                                        <span className="fx-play">
                                            <PlayIcon />
                                        </span>
                                    </span>
                                    <span className="fx-links__cap">{v.title}</span>
                                </a>
                            ))}
                            {rest.length === 1 && (
                                <a href={study.channel.url} target="_blank" rel="noopener noreferrer" className="fx-links__item">
                                    <span className="fx-card__media fx-case__channel" style={{ aspectRatio: "16 / 9" }}>
                                        <span>See all episodes</span>
                                        <strong>
                                            {study.channel.name} <i className="icon icon-arrow-right-top" />
                                        </strong>
                                    </span>
                                    <span className="fx-links__cap">YouTube channel</span>
                                </a>
                            )}
                        </div>
                    </section>
                )}

                {study.shorts && study.shorts.length > 0 && (
                    <section className="fx-case__section">
                        <div className="fx-case__head">
                            <h2>Shorts</h2>
                            <span>{study.shorts.length} clips · Opens on YouTube</span>
                        </div>
                        <div className="fx-case__shorts">
                            {study.shorts.slice(0, showAll ? undefined : SHORTS_PREVIEW).map((v) => (
                                <a key={v.id} href={shortUrl(v.id)} target="_blank" rel="noopener noreferrer" className="fx-links__item">
                                    <span className="fx-card__media" style={{ aspectRatio: "9 / 16" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={v.thumb} alt="" className="is-on" loading="lazy" />
                                        <span className="fx-play">
                                            <PlayIcon />
                                        </span>
                                    </span>
                                    <span className="fx-links__cap">{v.title}</span>
                                </a>
                            ))}
                        </div>
                        {study.shorts.length > SHORTS_PREVIEW && (
                            <div className="fx-case__more">
                                <button type="button" className="fx-case__talk" onClick={() => setShowAll((s) => !s)}>
                                    {showAll ? "Show fewer" : `Show all ${study.shorts.length} Shorts`}
                                </button>
                            </div>
                        )}
                    </section>
                )}

                <section className="fx-case__section">
                    <div className="fx-case__head">
                        <h2>What I handled</h2>
                    </div>
                    <p className="fx-tools__list">
                        {study.services.map((s) => (
                            <span key={s}>{s}</span>
                        ))}
                    </p>
                </section>

                <section className="fx-case__cta">
                    <h2>Want this for your show?</h2>
                    <Link href="/#contact" className="fx-btn-solid">
                        Let’s talk <i className="icon icon-arrow-right-top" />
                    </Link>
                </section>

                <footer className="fx-case__foot">
                    <Link href="/#work">← All work</Link>
                    {next && (
                        <Link href={`/work/${next.slug}`} className="fx-case__next">
                            <span>Next project</span>
                            {next.title} →
                        </Link>
                    )}
                </footer>
            </div>
        </>
    );
}
