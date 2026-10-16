import Shell from "@/components/Shell";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Craft from "@/components/Craft";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <Shell>
      <Header />
      <main>
        <Hero />
        <Work />
        <Craft />
        <About />
        <Contact />
      </main>
    </Shell>
  );
}
