import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description?: string;
  image?: string;
  slug: string;
  productCount?: number;
}

export const CategoryCard = ({ name, description, image, slug, productCount }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-glow cursor-pointer">
        <div className="relative h-64 overflow-hidden bg-gradient-secondary">
          {image && (
            <>
              <img 
                src={image} 
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </>
          )}
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-heading font-bold mb-2">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-white/90 mb-3 line-clamp-2">
                {description}
              </p>
            )}
            {productCount !== undefined && (
              <p className="text-xs text-white/80 mb-3">
                {productCount} Products
              </p>
            )}
            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
