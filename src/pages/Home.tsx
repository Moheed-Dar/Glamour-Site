import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";

export default function Home() {
  const { addItem } = useCart();

  // Fetch featured products
  const { data: products } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image_url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    });
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Handpicked for You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular and carefully curated beauty essentials
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                image={product.image_url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"}
                category={product.category_id}
                isFeatured={product.is_featured}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="group">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our diverse range of beauty categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
            {categories?.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                description={category.description || undefined}
                image={category.image_url || undefined}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Enhance Your Beauty?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their beauty needs
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
