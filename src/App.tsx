import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateAutomation from "./pages/CreateAutomation";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
// import Automations from "./pages/Automations";
import Account from "./pages/Account";
import History from "./pages/History";
import TeamMembers from "./pages/TeamMembers";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateAutomation />} />
          <Route path="/templates" element={<Templates />} />
          {/* <Route path="/automations" element={<Automations />} /> */}
          <Route path="/account" element={<Account />} />
          <Route path="/history" element={<History />} />
          <Route path="/team-members" element={<TeamMembers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
