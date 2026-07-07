"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { CtaLink } from "@/components/cta-link";
import { HeroPlate } from "@/components/hero/hero-plate";
import { SIGNUP_URL } from "@/lib/site";

// The WebGL scene is code-split and client-only so it never blocks first paint.
const FlowCanvas = dynamic(() => import("./flow-canvas"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

/**
 * Cinematic hero — ONE act of scroll-scrub (~1.6 viewports), then the page
 * scrolls normally. Desktop + motion-safe gets the live WebGL flow and GSAP
 * scrub; mobile and prefers-reduced-motion get a static plate with the same
 * content in a single viewport (height handled purely by CSS, so there is no
 * hydration layout jump).
 */
export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [canvasOn, setCanvasOn] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cinematic =
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!cinematic) return;

    setCanvasOn(supportsWebGL());

    // The CSS entrance animations (fill-mode: both) would override GSAP's
    // inline styles — CSS animations win the cascade — so strip them here;
    // the scrub owns these elements in cinematic mode.
    section
      .querySelectorAll(".animate-rise")
      .forEach((el) =>
        el.classList.remove(
          "animate-rise",
          "reveal-delay-1",
          "reveal-delay-2",
          "reveal-delay-3",
        ),
      );

    // Pause the render loop whenever the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(section);

    // Lenis smooth scroll for the whole page, driven by the GSAP ticker.
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The one-act scrub: text tracks in over the flow as the camera travels.
    const q = gsap.utils.selector(stageRef);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      },
    });

    tl.fromTo(
      q(".hero-word"),
      { opacity: 0, letterSpacing: "0.55em" },
      { opacity: 1, letterSpacing: "0.18em", duration: 0.3 },
      0.02,
    )
      .fromTo(
        q(".hero-hint"),
        { opacity: 1 },
        { opacity: 0, duration: 0.1 },
        0.06,
      )
      .fromTo(
        q(".hero-eyebrow"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.12 },
        0.08,
      )
      .fromTo(
        q(".hero-promise"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.18 },
        0.34,
      )
      .fromTo(
        q(".hero-sub"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.15 },
        0.52,
      )
      .fromTo(
        q(".hero-ctas"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.15 },
        0.7,
      );

    return () => {
      io.disconnect();
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setCanvasOn(false);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      // Mobile / reduced-motion: one viewport. Desktop motion-safe: scrub room.
      className="relative h-[100svh] md:motion-safe:h-[260vh]"
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden"
      >
        {/* Backdrop: static plate always present; live flow fades in over it. */}
        <HeroPlate />
        {canvasOn && (
          <div aria-hidden className="animate-rise absolute inset-0">
            <FlowCanvas progressRef={progressRef} active={inView} />
          </div>
        )}

        {/* Content — real DOM, visible without JS, scrubbed when cinematic. */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
          <p className="hero-eyebrow animate-rise text-muted-foreground text-xs font-medium tracking-[0.3em] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="hero-word text-sheen font-serif text-6xl font-semibold tracking-[0.18em] uppercase sm:text-7xl lg:text-8xl">
            Reluxio
          </h1>
          <p className="hero-promise animate-rise reveal-delay-1 font-serif text-2xl text-balance sm:text-3xl">
            {t("promise")}
          </p>
          <p className="hero-sub animate-rise reveal-delay-2 text-muted-foreground max-w-xl text-balance leading-relaxed">
            {t("sub")}
          </p>
          <div className="hero-ctas animate-rise reveal-delay-3 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href={SIGNUP_URL} size="lg">
              {t("ctaPrimary")}
            </CtaLink>
            <CtaLink href="#product" variant="outline" size="lg">
              {t("ctaSecondary")}
            </CtaLink>
          </div>
        </div>

        {/* Scroll hint — only meaningful when the scrub exists. */}
        <div className="hero-hint text-muted-foreground absolute bottom-8 hidden flex-col items-center gap-2 md:motion-safe:flex">
          <span className="text-[10px] tracking-[0.3em] uppercase">
            {t("scrollHint")}
          </span>
          <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
