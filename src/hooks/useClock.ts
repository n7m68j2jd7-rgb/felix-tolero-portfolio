"use client";

import { useEffect } from "react";

export function useClock() {
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Manila",
      });
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "Asia/Manila",
      });
      document.querySelectorAll<HTMLElement>(".time-local").forEach((el) => {
        const date = el.querySelector(".date");
        const clock = el.querySelector(".clock");
        if (date) date.textContent = dateString;
        if (clock) clock.textContent = `${timeString} Cebu`;
      });
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
}
