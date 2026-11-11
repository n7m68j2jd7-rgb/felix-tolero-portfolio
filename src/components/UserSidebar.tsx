import { ImageSwitch } from "./ImageSwitch";
import { profile } from "@/data/felix";

export function UserSidebar() {
    return (
        <div className="sidebar-user">
            <div className="wrap">
                <div className="user-image">
                    <div className="image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            width={900}
                            height={1352}
                            src={profile.portrait}
                            alt={`${profile.fullName}, ${profile.duty}`}
                            fetchPriority="high"
                        />
                    </div>
                    <div className="meta-left d-none d-sm-block">
                        <div className="bg-item-svg">
                            <ImageSwitch
                                light="/assets/images/item/vector-user.svg"
                                dark="/assets/images/item/vector-user_dark.svg"
                                width={32}
                                height={227}
                            />
                        </div>
                        <p className="avaiable-dot vertical text-body-3 text-black-72 fw-medium">
                            <span className="text-vertical">Available for Work</span>
                            <span className="dot" />
                        </p>
                    </div>
                </div>
                <div className="user-info">
                    <p className="avaiable-dot text-body-3 fw-medium d-sm-none">
                        <span className="dot" />
                        <span>Available for Work</span>
                    </p>
                    <h5 className="greeting letter-space--2 text-white animationtext clip">
                        <span className="text-nowrap">Hey, I’m</span>
                        <span className="cd-words-wrapper">
                            {profile.rotatingNames.map((name, i) => (
                                <span key={name} className={`item-text ${i === 0 ? "is-visible" : "is-hidden"}`}>
                                    {name}
                                </span>
                            ))}
                        </span>
                    </h5>
                    <p className="introduce text-white-56 letter-space--05 text-body-3">
                        {profile.bio} {profile.location}.
                    </p>
                    <div className="br-line" />
                    <div className="action-group">
                        <a href="#contact" className="tf-btn-action scroll-link">
                            <span className="ic-wrap">
                                <i className="icon icon-arrow-right-top" />
                            </span>
                            <span className="text text-body-3 letter-space--05 fw-medium">Let’s talk</span>
                            <span className="ic-wrap">
                                <i className="icon icon-arrow-right-top" />
                            </span>
                        </a>
                        <a href="#contact" className="action-down scroll-link">
                            <i className="icon icon-send" />
                            <span className="text-body-3">Email me</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
