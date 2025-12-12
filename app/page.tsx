"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroAnimated } from "@/components/landing/HeroAnimated";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Projects } from "@/components/landing/Projects";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { PageTransition, ScrollProgress } from "@/components/animations";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="dark bg-[#f6f8f6] dark:bg-[#152111] text-slate-900 dark:text-white overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <HeroAnimated />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </PageTransition>
  );
}
