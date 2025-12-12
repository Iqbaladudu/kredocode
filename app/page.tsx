import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Projects } from "@/components/landing/Projects";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="dark bg-[#f6f8f6] dark:bg-[#152111] text-slate-900 dark:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
