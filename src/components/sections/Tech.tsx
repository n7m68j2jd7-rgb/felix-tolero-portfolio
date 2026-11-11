import { tools } from "@/data/felix";

export function Tech() {
    return (
        <div id="tools" className="section-tech-stack flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tech-stack" />
                Tools
            </div>
            <div className="fx-tools">
                {tools.map((g) => (
                    <div className="fx-tools__row effectFade fadeUp no-div" key={g.group}>
                        <p className="fx-tools__group">{g.group}</p>
                        <p className="fx-tools__list">
                            {g.items.map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
