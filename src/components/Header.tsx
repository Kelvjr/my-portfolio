"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navigation, socials } from "@/data/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const toggleButton = toggle.current;
    const main = document.querySelector("main");
    if (main) main.inert = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = [...menu.current!.querySelectorAll<HTMLAnchorElement>("a")];
    links[0]?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const focusable: HTMLElement[] = [toggleButton!, ...links];
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        focusable[
          (index + (event.shiftKey ? -1 : 1) + focusable.length) %
            focusable.length
        ].focus();
      }
    };
    document.addEventListener("keydown", key);
    const compact = matchMedia("(max-width: 760px)");
    const resize = () => {
      if (!compact.matches) setOpen(false);
    };
    compact.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      if (main) main.inert = false;
      document.removeEventListener("keydown", key);
      compact.removeEventListener("change", resize);
      toggleButton?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <>
      <header className={`site-header${open ? " menu-open" : ""}`}>
        <nav
          className="header-nav header-nav-left"
          aria-label="Main navigation"
        >
          {navigation.slice(0, 2).map((link) => (
            <a className="header-link" key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-logo">
          <Link href="/" className="logo-text">
            Kelvin
            <br />
            Kyere
          </Link>
        </div>
        <nav
          className="header-nav header-nav-right"
          aria-label="Secondary navigation"
        >
          {[navigation[2], navigation[4]].map((link) => (
            <a className="header-link" key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-link header-link-mobile">
          Contact
        </a>
        <button
          ref={toggle}
          className={`menu-toggle${open ? " active" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div
        ref={menu}
        id="mobile-menu"
        className={`menu-overlay${open ? " active" : ""}`}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="menu-overlay-content">
          <nav className="menu-overlay-nav" aria-label="Mobile navigation">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="menu-overlay-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="menu-overlay-divider" />
          <div className="menu-overlay-socials">
            {socials.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
