import { Hero } from "@/components/hero/hero";
import { ScrollFx } from "@/components/scroll-fx";
import { FinalCta } from "@/components/sections/final-cta";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Showcase } from "@/components/sections/showcase";
import { SocialProof } from "@/components/sections/social-proof";
import { TrustStrip } from "@/components/sections/trust-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Showcase />
        <Features />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
      <ScrollFx />
    </div>
  );
}
