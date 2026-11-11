import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, getCase } from "@/data/cases";
import { CaseView } from "@/components/CaseView";

export function generateStaticParams() {
    return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const c = getCase((await params).slug);
    if (!c) return {};
    const title = `${c.title} · Felix Tolero`;
    return {
        title,
        description: c.summary,
        openGraph: { title, description: c.summary, images: [c.episodes[0].thumb] },
    };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getCase(slug);
    if (!c) notFound();
    const i = cases.indexOf(c);
    const next = cases[(i + 1) % cases.length];
    return <CaseView study={c} next={next.slug === c.slug ? undefined : next} />;
}
