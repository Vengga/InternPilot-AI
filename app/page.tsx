import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Pipeline } from "@/components/landing/Pipeline";
import { Features } from "@/components/landing/Features";
import { Stack } from "@/components/landing/Stack";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Pipeline />
      <Features />
      <Stack />
      <Footer />
    </main>
  );
}
