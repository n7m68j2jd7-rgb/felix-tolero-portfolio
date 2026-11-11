import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

const title = "Felix Tolero · Graphic Designer & Video Editor";
const description =
    "Podcast production, video, social campaigns, decks and Webflow builds. Based in Cebu City, working remotely.";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.felixtoleroportfolio.com"),
    title,
    description,
    openGraph: { title, description, type: "website", images: ["/felix/work/podcast/impact-society-ep5.webp"] },
    icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0f0f0f",
};

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Felix Mari Tolero",
    jobTitle: "Graphic Designer & Video Editor",
    url: "https://www.felixtoleroportfolio.com/",
    address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressCountry: "PH" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Cebu" },
    knowsAbout: ["Graphic Design", "Video Editing", "Podcast Production", "Presentation Design", "Webflow"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <BootstrapClient />
                <SmoothScroll>
                    <ThemeProvider>{children}</ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
