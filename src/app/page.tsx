import IndexSection from '@/components/sections/IndexSection';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <main>
        <IndexSection />
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
