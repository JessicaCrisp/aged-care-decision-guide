import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";
import logo from "@assets/ageD_care_guide-3_1771751737790.png";
import { useToast } from "@/hooks/use-toast";
import { ComingSoonModal } from "@/components/ComingSoonModal";

export default function BlogIndex() {
  const { toast } = useToast();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleBuyNow = () => {
    setShowComingSoon(true);
    
    // Track clicks in local storage as a mockup for the requested JSON file
    const currentClicks = parseInt(localStorage.getItem("buy_button_clicks") || "0", 10) + 1;
    localStorage.setItem("buy_button_clicks", currentClicks.toString());
    console.log(`[Demand Tracker] Buy button clicked! Total clicks: ${currentClicks}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-[#333333]">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50 py-3 z-50 sticky top-0 shadow-sm">
        <div className="container mx-auto pl-2 pr-6 md:px-6 max-w-6xl flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0 mr-4">
            <img src={logo} alt="Aged Care Decision Guide" className="h-6 sm:h-12 w-auto object-contain rounded-xl" />
          </Link>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="hidden md:flex h-9 text-[0.85rem] font-bold border-transparent bg-[#e0f2fe] text-[#1d4ed8] hover:bg-[#bfdbfe] rounded-full transition-colors"
              onClick={() => { window.location.href = '/#free-resource-section'; }}
            >
              Free 5 Questions
            </Button>
            <div className="group relative inline-block w-full sm:w-auto">
              <Button 
                onClick={handleBuyNow} 
                className="relative z-10 h-9 w-full rounded-lg bg-[#10b981] px-4 text-[0.85rem] font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)] transition-all hover:bg-[#059669] group-hover:-translate-y-0.5 sm:h-12 sm:w-auto sm:rounded-xl sm:px-8 sm:text-[1.05rem]"
              >
                Get the Guide $29
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Hero */}
      <section className="bg-[#172554] py-16 text-center px-6">
        <div className="container mx-auto max-w-3xl space-y-4">
          <h1 className="text-[2.5rem] md:text-[3rem] font-serif font-bold text-white leading-tight">
            Aged Care Decision Guide - Blog
          </h1>
          <p className="text-[1.1rem] md:text-[1.25rem] text-[#e0f2fe] font-medium max-w-2xl mx-auto">
            Expert insights on navigating Australia's aged care system
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4 text-[0.9rem] font-medium text-gray-500">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1.5"><span className="text-[#10b981]">⏱</span> {post.readTime} min read</span>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="block mb-4">
                  <h2 className="text-[1.8rem] font-serif font-bold text-[#1e3a8a] group-hover:text-[#0ea5e9] transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-[1.05rem] text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[#1d4ed8] font-bold hover:text-[#0ea5e9] transition-colors">
                  Read more <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d3e50] text-white py-12 text-center">
        <div className="container mx-auto px-6">
           <p className="text-[1rem] text-gray-400 mb-4">&copy; {new Date().getFullYear()} Aged Care Decision Guide. All rights reserved.</p>
           <div className="flex justify-center gap-6 text-[1rem]">
             <Link href="/blog" className="text-gray-400 hover:text-white underline">Blog</Link>
             <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
             <a href="#" className="text-gray-400 hover:text-white underline">Terms of Service</a>
           </div>
        </div>
      </footer>
      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}