import { services } from "@/data/felix";

export function Services() {
    return (
        <div id="service" className="section-service flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-service" />
                Services
            </div>
            <ul className="fx-services">
                {services.map((s, i) => (
                    <li key={s.id} className="fx-services__item effectFade fadeUp no-div">
                        <span className="fx-services__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="fx-services__name">{s.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
