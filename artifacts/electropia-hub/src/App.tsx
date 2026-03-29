import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import ProductDetails from "@/pages/ProductDetails";
import ShopProfile from "@/pages/ShopProfile";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderDetails from "@/pages/OrderDetails";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/:tab" component={Dashboard} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/shop/:id" component={ShopProfile} />
        <Route path="/shop/:id/:tab" component={ShopProfile} />
        <Route path="/cart" component={Cart} />
        <Route path="/cart/:version" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/checkout/:step" component={Checkout} />
        <Route path="/order/:id" component={OrderDetails} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
