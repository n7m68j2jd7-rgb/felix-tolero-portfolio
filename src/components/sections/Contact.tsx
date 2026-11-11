"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/felix";
import { useEmail } from "@/hooks/useEmail";

/* No backend: a valid submit opens the visitor's own email app, so they have
   to send from a real address. These checks stop bots and repeat spam first. */
const MIN_FILL_MS = 4000; // humans can't fill the form faster than this
const COOLDOWN_MS = 10 * 60 * 1000; // one message per visitor per 10 minutes
const MAX_LINKS = 2;
const MSG_MIN = 15;
const MSG_MAX = 1000;
const STORE_KEY = "fx-contact-last";

type Status = { kind: "error" | "ok"; text: string } | null;

const readLast = () => {
    try {
        return Number(localStorage.getItem(STORE_KEY)) || 0;
    } catch {
        return 0;
    }
};
const writeLast = () => {
    try {
        localStorage.setItem(STORE_KEY, String(Date.now()));
    } catch {
        /* storage blocked – cooldown just won't persist */
    }
};

export function Contact() {
    const email = useEmail();
    const openedAt = useRef(0);
    const [status, setStatus] = useState<Status>(null);
    const [msgLen, setMsgLen] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        openedAt.current = Date.now();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const d = new FormData(form);
        const name = String(d.get("name") || "").trim();
        const from = String(d.get("email") || "").trim();
        const message = String(d.get("message") || "").trim();

        // Honeypot: real people never see this field. Pretend success, send nothing.
        if (d.get("company")) {
            setStatus({ kind: "ok", text: "Thanks! Your message is on its way." });
            form.reset();
            return;
        }
        if (Date.now() - openedAt.current < MIN_FILL_MS) {
            setStatus({ kind: "error", text: "That was quick. Give it a second and try again." });
            return;
        }
        if (name.length < 2) return setStatus({ kind: "error", text: "Please add your name." });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(from))
            return setStatus({ kind: "error", text: "Please add a valid email so I can reply." });
        if (message.length < MSG_MIN)
            return setStatus({ kind: "error", text: "Tell me a little more about the project." });
        if ((message.match(/https?:\/\/|www\./gi) || []).length > MAX_LINKS)
            return setStatus({ kind: "error", text: `Please include no more than ${MAX_LINKS} links.` });

        const wait = readLast() + COOLDOWN_MS - Date.now();
        if (wait > 0) {
            const mins = Math.ceil(wait / 60000);
            return setStatus({
                kind: "error",
                text: `You’ve just sent a message. You can send another in ${mins} min.`,
            });
        }
        if (!email) return;

        writeLast();
        const subject = `Project enquiry from ${name}`;
        const body = `${message}\n\n${name} · ${from}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus({ kind: "ok", text: "Your email app should open with the message ready to send." });
    };

    const copyEmail = async () => {
        if (!email) return;
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <div id="contact" className="section-contact flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-send" />
                Contact
            </div>
            <h4 className="s-title letter-space--2 split-text effect-blur-fade">
                Have a project? <br className="d-none d-lg-block" />
                Let’s make it look good.
            </h4>
            <form className="form-contact" id="contactform" onSubmit={handleSubmit} noValidate>
                <div className="form-content effectFade fadeUp no-div">
                    <fieldset className="field-ip">
                        <input type="text" name="name" placeholder="Your Name *" required maxLength={80} autoComplete="name" aria-label="Your name" />
                    </fieldset>
                    <fieldset className="field-ip">
                        <input type="email" name="email" placeholder="Email Address *" required maxLength={120} autoComplete="email" aria-label="Email address" />
                    </fieldset>
                    <fieldset className="field-ip fx-msg">
                        <textarea
                            name="message"
                            placeholder="What do you need? *"
                            required
                            rows={3}
                            maxLength={MSG_MAX}
                            aria-label="Project description"
                            onChange={(e) => setMsgLen(e.target.value.length)}
                        />
                        <span className="fx-msg__count" aria-hidden="true">
                            {msgLen}/{MSG_MAX}
                        </span>
                    </fieldset>
                    {/* Honeypot – hidden from people and screen readers, bots fill it in */}
                    <div className="fx-hp" aria-hidden="true">
                        <label>
                            Company
                            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                        </label>
                    </div>
                </div>
                <p className={`fx-status${status ? ` is-${status.kind}` : ""}`} role="status" aria-live="polite">
                    {status?.text}
                </p>
                <div className="form-action effectFade fadeUp no-div">
                    <div className="send-wrap">
                        <button type="submit" className="tf-btn animate-btn animate-dark">
                            <span className="text-body-3">Send Message</span>
                        </button>
                    </div>
                    <div className="fx-contact-links">
                        <button type="button" className="fx-copy text-body-1 letter-space--2 text-black-72" onClick={copyEmail} disabled={!email}>
                            {email || "Loading email…"}
                            <span className="fx-copy__hint">{copied ? "Copied" : "Copy"}</span>
                        </button>
                        <a href={`tel:${profile.phone}`} className="text-body-3 link text-black-56">
                            {profile.phoneLabel}
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
