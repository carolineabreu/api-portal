import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HighlightedAPIs } from "@/components/HighlightedAPIs";
import { Resources } from "@/components/Resources";
import { Support } from "@/components/Support";

export default function Home() {
  return (
    <div className="containerMain">
      <Header />
      <main>
        <Hero />
        <Resources />
        <HighlightedAPIs />
        <Support />
      </main>
      <Footer />
    </div>
  )
}