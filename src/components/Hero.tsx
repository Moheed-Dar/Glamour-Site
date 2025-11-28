import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mehndi.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white animate-in fade-in slide-in-from-left duration-1000">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Traditional Beauty,
            <span className="block text-secondary">Modern Elegance</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Discover our exquisite collection of mehndi, cosmetics, and bridal beauty products. 
            Each item crafted with care for your special moments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
