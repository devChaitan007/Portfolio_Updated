
import Shell from "@/components/Shell";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Craft from "@/components/Craft";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <Shell>
      <Header />

      <main>
        <Hero />
        <Marquee />
        <Work />
        <Craft />
        <Services />
        <About />
        <Contact />
      </main>
    </Shell>
  );
}
