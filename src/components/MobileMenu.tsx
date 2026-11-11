"use client";

import { useState } from "react";
import { navItems } from "@/data/felix";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.classList.toggle("overflow-hidden", next);
  };

  return (
    <>
      <div className="action-open-mobile d-lg-none">
        <div className="tf-btn-icon style-2" onClick={toggle}>
          <div className={`btn-mobile-menu${open ? " close" : ""}`}>
            <span />
          </div>
        </div>
        <div className={`nav-mobile-list${open ? " open" : ""}`}>
          <ul className="nav-mobile-item">
            {navItems.map((item, i) => (
              <div key={item.href + i}>
                <li className="nav-item">
                  <a href={item.href} className="item-link scroll-link" onClick={() => setOpen(false)}>
                    <i className={`icon ${item.icon}`} />
                    <p className="tool-tip text-caption">{item.label}</p>
                  </a>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className={`overlay-pop${open ? " open" : ""}`} onClick={toggle} />
    </>
  );
}
