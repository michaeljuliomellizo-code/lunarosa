import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Benefits from "@/components/home/Benefits";
import BannerGrid from "@/components/home/BannerGrid";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import InstagramSection from "@/components/home/InstagramSection";

export default function HomePage() {
  return (
    <main className="bg-light min-h-screen">
      
      <Hero />

      <Categories />

      <section id="catalogo">

        <FeaturedProducts />

      </section>

      <BannerGrid />

      <Testimonials />

      <InstagramSection />

      <Newsletter />
    </main>
  );
}