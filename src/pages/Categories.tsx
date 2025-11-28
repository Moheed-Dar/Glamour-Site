import { CategoryCard } from "@/components/CategoryCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

export default function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  // Get product count for each category
  const { data: productCounts } = useQuery({
    queryKey: ["category-product-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category_id");
      
      if (error) throw error;
      
      // Count products per category
      const counts: Record<string, number> = {};
      data.forEach((product) => {
        if (product.category_id) {
          counts[product.category_id] = (counts[product.category_id] || 0) + 1;
        }
      });
      
      return counts;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Browse Our Collections</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Shop by Category
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our carefully curated collections of mehndi, cosmetics, and bridal beauty products. 
              Each category is designed to help you find exactly what you need for your special moments.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading categories...</p>
            </div>
          ) : categories && categories.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    description={category.description || undefined}
                    image={category.image_url || undefined}
                    slug={category.slug}
                    productCount={productCounts?.[category.id] || 0}
                  />
                ))}
              </div>

              {/* Info Section */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-2xl bg-muted/50 backdrop-blur">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    All products are carefully selected and tested for the highest quality standards.
                  </p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-muted/50 backdrop-blur">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Authentic Products</h3>
                  <p className="text-muted-foreground">
                    We guarantee 100% authentic products sourced directly from trusted suppliers.
                  </p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-muted/50 backdrop-blur">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground">
                    Quick and reliable delivery to ensure your products arrive on time.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No categories found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
