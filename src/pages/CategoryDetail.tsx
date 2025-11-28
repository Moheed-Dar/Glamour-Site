import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();

  // Fetch category details
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch products in this category
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["category-products", category?.id],
    queryFn: async () => {
      if (!category?.id) return [];
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!category?.id,
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image_url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    });
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">This category doesn't exist</p>
        <Link to="/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <section className="relative py-20 bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {category.image_url && (
            <img 
              src={category.image_url} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="container mx-auto px-4 relative">
          <Link to="/categories">
            <Button variant="outline" className="mb-6 border-white/30 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Exclusive Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-white/90 mb-4">
                {category.description}
              </p>
            )}
            <p className="text-lg text-white/80">
              {products?.length || 0} Products Available
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {productsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading products...</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.image_url || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"}
                  category={category.name}
                  isFeatured={product.is_featured}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No products in this category yet</p>
              <Link to="/products">
                <Button variant="outline">Browse All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {products && products.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Explore our other categories or browse all products to find your perfect match
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button size="lg">View All Products</Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline">Other Categories</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
