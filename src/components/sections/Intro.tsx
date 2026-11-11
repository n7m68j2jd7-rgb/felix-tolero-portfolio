import { clients, profile } from "@/data/felix";
import AutoRepeatMarquee from "@/components/AutoRepeatMarquee";

export function Intro() {
    return (
        <div id="home" className="section-intro fx-intro flat-spacing">
            <div className="intro-author effectFade fadeUp no-div">
                <div className="author-info letter-space--05">
                    <p className="info_name text-black">{profile.fullName}</p>
                    <p className="info_duty text-black-50 text-body-3">{profile.duty}</p>
                </div>
            </div>

            <h1 className="intro-title letter-space--2">
                Design &amp; <span className="is-bg">video</span> <br />
                that keeps your <span className="type-2 is-bg">brand</span> sharp
            </h1>

            <div className="fx-intro__row effectFade fadeUp no-div">
                <a href="#work" className="tf-btn animate-btn animate-dark scroll-link">
                    <span className="text-body-3">View work</span>
                </a>
            </div>

            <p className="intro-client letter-space--05 text-body-3">
                <i className="icon icon-global-elip" />
                Trusted by
            </p>
            <AutoRepeatMarquee direction="left" className="infiniteSlide-brand" pauseOnHover speed={30} repeat={4}>
                {clients.map((c) => (
                    <span className="fx-client" key={c}>
                        {c}
                    </span>
                ))}
            </AutoRepeatMarquee>
        </div>
    );
}
