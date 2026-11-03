import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookOpen } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/blog" component={BlogIndex}/>
      <Route path="/blog/:slug" component={BlogPost}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Link href="/blog" className="fixed bottom-6 right-6 z-50 bg-[#1e3a8a]/85 backdrop-blur-md hover:bg-[#172554]/90 text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] font-semibold text-[0.95rem] transition-transform duration-300 hover:-translate-y-1 border border-white/20 flex items-center gap-2" data-testid="button-floating-blog">
          <BookOpen className="w-5 h-5" />
          Read Blog
        </Link>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;