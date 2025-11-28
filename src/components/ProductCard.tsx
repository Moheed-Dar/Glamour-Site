import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  isFeatured?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  isFeatured,
  onAddToCart 
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-glow">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isFeatured && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        {category && (
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
            {category}
          </p>
        )}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-heading font-bold text-primary">
          ₹{price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={onAddToCart}
          className="w-full group"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
