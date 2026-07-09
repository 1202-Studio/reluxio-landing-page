"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll choreography for the sections below the hero (fourmula.ai-style
 * card motion, kept monochrome). Runs only on desktop + motion-safe; mobile
 * and reduced-motion fall back to the CSS `.section-reveal` animation, which
 * is scoped to <768px so the two systems never fight over the cascade.
 *
 * Sections stay server components — this reads `data-fx` hooks from the DOM:
 *   data-fx="rise"        fade + rise on enter
 *   data-fx="tilt"        big card enters rotated and straightens
 *   data-fx-group         container whose [data-fx="card"] children are
 *                         dealt in with alternating rotation
 *   data-fx="draw"        line draws in from the left
 *   data-fx="ghost"       giant numeral drifts (scrubbed parallax)
 *   data-count-to (+ data-count-suffix)  number counts up on enter
 */
export function ScrollFx() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const motionOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    if (!desktop || !motionOk) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /**
       * Reveal helper: set the start state, then animate to it on enter and
       * `clearProps` afterwards. Unlike `gsap.from()`, this never leaves an
       * element stuck at its start transform on a ScrollTrigger refresh — the
       * bug that let displaced cards overlap the pricing note. `clearProps`
       * returns each element to its natural layout (and any class-based rest
       * tilt) once revealed, so paint and layout stay in sync.
       */
      const reveal = (
        target: gsap.TweenTarget,
        trigger: Element,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
      ) => {
        gsap.set(target, from);
        ScrollTrigger.create({
          trigger,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(target, {
              ...to,
              clearProps: "transform,opacity",
            }),
        });
      };

      gsap.utils.toArray<HTMLElement>("[data-fx='rise']").forEach((el) => {
        reveal(
          el,
          el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx='tilt']").forEach((el, i) => {
        reveal(
          el,
          el,
          { y: 90, rotate: i % 2 ? 2.5 : -2.5, scale: 0.96, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx-group]").forEach((group) => {
        const cards = group.querySelectorAll("[data-fx='card']");
        if (!cards.length) return;
        reveal(
          cards,
          group,
          { y: 56, opacity: 0, rotate: (i) => ((i % 3) - 1) * 2 }, // -2°, 0°, 2° …
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx='draw']").forEach((el) => {
        reveal(
          el,
          el,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        );
      });

      // Ghost numerals drift slowly against the scroll (parallax scrub).
      gsap.utils.toArray<HTMLElement>("[data-fx='ghost']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70 },
          {
            y: -70,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Stat count-ups, formatted for the active locale.
      const lang = document.documentElement.lang || "vi";
      const fmt = new Intl.NumberFormat(lang === "vi" ? "vi-VN" : "en-US");
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
        const target = Number(el.dataset.countTo);
        if (!Number.isFinite(target)) return;
        const suffix = el.dataset.countSuffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = fmt.format(Math.round(state.v)) + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
