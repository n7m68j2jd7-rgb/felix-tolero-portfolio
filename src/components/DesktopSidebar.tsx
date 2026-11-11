"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { navItems } from "@/data/felix";

type DesktopSidebarProps = {
  positionClass?: string;
};

export function DesktopSidebar({ positionClass = "pst-v1" }: DesktopSidebarProps = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : undefined;

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`sidebar-tools ${positionClass}`}>
      <div className="nav-top">
        <div className={`tf-btn-icon toggle-switch-mode${theme === "dark" ? " active" : ""}`} onClick={handleToggle} role="button" aria-label="Toggle light and dark mode">
          <i className="icon icon-light" />
        </div>
      </div>
      <ul className="nav-list">
        {navItems.map((item, i) => (
            <li  key={item.href + i} className="nav-item">
              <a href={item.href} className="item-link scroll-link">
                <i className={`icon ${item.icon}`} />
                <p className="tool-tip text-caption">{item.label}</p>
              </a>
            </li>
        ))}
      </ul>
      <div className="nav-bottom">
        <a href="#" className="tf-btn-icon go-top" onClick={goTop}>
          <i className="icon icon-arrow-top" />
        </a>
      </div>
    </div>
  );
}
