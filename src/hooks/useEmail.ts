"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/felix";

/* The address is assembled in the browser after load, so it never appears in
   the page HTML where spam bots harvest addresses. Returns "" until mounted. */
export function useEmail() {
    const [email, setEmail] = useState("");
    useEffect(() => {
        setEmail([profile.emailUser, profile.emailDomain].join(String.fromCharCode(64)));
    }, []);
    return email;
}
