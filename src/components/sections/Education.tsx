import { education, experience } from "@/data/felix";

export function Education() {
    return (
        <div id="experience" className="section-education-experience flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-edu" />
                Experience
            </div>
            <div className="timeline scroll-down">
                <div className="timeline-line">
                    <div className="prg-line" />
                </div>
                {experience.map((item) => (
                    <div className="timeline-item effectFade fadeUp no-div" key={item.role + item.org}>
                        <p className="timeline-date text-black-56">{item.date}</p>
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                            <p className="timeline-role fw-medium text-black-72">{item.role}</p>
                            <p className="timeline-desc text-body-3 text-black-56">{item.org}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="fx-edu text-body-3 text-black-56 effectFade fadeUp no-div">
                <span className="text-black-72 fw-medium">{education.degree}</span> · {education.school}
            </p>
        </div>
    );
}
