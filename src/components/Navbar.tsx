import { ShoppingCart, Menu, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  onMessagesClick?: () => void;
  isAdmin?: boolean;
}

export const Navbar = ({ cartItemsCount = 0, onCartClick, onMessagesClick, isAdmin }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
              Mehndi Beauty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
              Categories
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onMessagesClick && (
              <Button variant="ghost" size="icon" onClick={onMessagesClick} className="relative">
                <MessageCircle className="h-5 w-5" />
              </Button>
            )}
            
            {!isAdmin && onCartClick && (
              <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            )}

            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-primary">
                    Home
                  </Link>
                  <Link to="/products" className="text-lg font-medium hover:text-primary">
                    Products
                  </Link>
                  <Link to="/categories" className="text-lg font-medium hover:text-primary">
                    Categories
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg font-medium hover:text-primary">
                      Dashboard
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
