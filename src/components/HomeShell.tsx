"use client";

import { useEffect } from "react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { Intro } from "./sections/Intro";
import { Education } from "./sections/Education";
import { Work } from "./sections/Work";
import { Services } from "./sections/Services";
import { Tech } from "./sections/Tech";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { useIsakAnimations } from "@/hooks/useIsakAnimations";
import { useClock } from "@/hooks/useClock";
import { useHeadlineRotate } from "@/hooks/useHeadlineRotate";
import { useInfiniteSlide } from "@/hooks/useInfiniteSlide";
import { useBodyThemeClass } from "@/hooks/useBodyThemeClass";

const BODY_CLASSES = ["counter-scroll", "body-default", "dark-v1"];

export function HomeShell() {
    useBodyThemeClass({ defaultMode: "dark" });

    useEffect(() => {
        document.body.classList.add(...BODY_CLASSES);
        return () => document.body.classList.remove(...BODY_CLASSES);
    }, []);

    useClock();
    useInfiniteSlide();
    useHeadlineRotate();
    useIsakAnimations();

    return (
        <>
            <Preloader bgDark />
            <BodyBackground showCloudItem={false} showVideo={false} />
            <MobileMenu />
            <DesktopSidebar positionClass="pst-v1" />

            <main id="wrapper">
                <HeaderClock />
                <UserSidebar />
                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <Intro />
                                    <Work />
                                    <Services />
                                    <Education />
                                    <Tech />
                                    <Contact />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
