"use client";

import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Features } from "./Features";
import { Teachers } from "./Teachers";
import { Programs } from "./Programs";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { InquiryForm } from "./InquiryForm";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Teachers />
        <Programs />
        <Stats />
        <Testimonials />
        <FAQ />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
}
