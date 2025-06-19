import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import EditorPage from "./pages/EditorPage";
import TemplatesGalleryPage from "./pages/TemplatesGalleryPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Placeholder pages for routes that might not be fully implemented yet
const PlaceholderPage = ({ title }: { title: string }) => {
  console.log(`${title} loaded (placeholder)`);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">This page is under construction.</p>
      <Link to="/" className="mt-4 text-primary hover:underline">Go to Homepage</Link>
    </div>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider> {/* Moved TooltipProvider higher as EditorPage uses it */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/templates" element={<TemplatesGalleryPage />} />
          <Route path="/dashboard/*" element={<UserDashboardPage />} /> 
          {/* Using /* for dashboard to allow nested routes within UserDashboardPage if needed (e.g. /dashboard/settings) - Sidebar component handles internal nav */}
          <Route path="/auth" element={<AuthenticationPage />} />
          
          {/* Placeholder routes from Homepage footer & Auth page examples */}
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;