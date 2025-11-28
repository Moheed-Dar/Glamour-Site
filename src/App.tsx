import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CartSidebar } from "@/components/CartSidebar";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        cartItemsCount={totalItems}
        onCartClick={() => setCartOpen(true)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
