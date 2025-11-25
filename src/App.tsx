import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import DesignVariants from "./pages/DesignVariants";
import LaunchVariants from "./pages/LaunchVariants";
import TestSingleStepConfig from "./pages/TestSingleStepConfig";
import TestSingleStepConfig2 from "./pages/TestSingleStepConfig2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Campaigns />} />
          <Route path="/campaign/:id" element={<Index />} />
          <Route path="/design-variants" element={<DesignVariants />} />
          <Route path="/launch-variants" element={<LaunchVariants />} />
          <Route path="/test-single-step-config" element={<TestSingleStepConfig />} />
          <Route path="/test-single-step-config-2" element={<TestSingleStepConfig2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
