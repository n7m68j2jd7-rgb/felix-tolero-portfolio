import { profile } from "@/data/felix";

export function Footer() {
    return (
        <div id="footer" className="tf-footer fx-footer flat-spacing">
            <div className="br-line" />
            <p className="fx-footer__mark effectFade fadeUp no-div" aria-hidden="true">
                Felix Tolero
            </p>
            <div className="foot-bottom">
                <p className="text-nocopy text-black-56">© {new Date().getFullYear()} {profile.fullName}</p>
                <p className="text-black-56">{profile.location}</p>
            </div>
        </div>
    );
}
