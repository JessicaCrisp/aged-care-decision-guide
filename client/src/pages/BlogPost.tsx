import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import logo from "@assets/ageD_care_guide-3_1771751737790.png";
import { useToast } from "@/hooks/use-toast";
import { ComingSoonModal } from "@/components/ComingSoonModal";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const post = blogPosts.find(p => p.slug === params?.slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Aged Care Decision Guide`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.excerpt);

      // Update Open Graph tags for better social/AI sharing
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', `${post.title} | Aged Care Decision Guide`);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', post.excerpt);
    }
  }, [post]);

  const handleBuyNow = () => {
    setShowComingSoon(true);
    
    // Track clicks in local storage as a mockup for the requested JSON file
    const currentClicks = parseInt(localStorage.getItem("buy_button_clicks") || "0", 10) + 1;
    localStorage.setItem("buy_button_clicks", currentClicks.toString());
    console.log(`[Demand Tracker] Buy button clicked! Total clicks: ${currentClicks}`);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <Link href="/blog">
            <a className="text-[#1d4ed8] hover:underline">← Back to blog</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#333333]">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50 py-3 z-50 sticky top-0 shadow-sm">
        <div className="container mx-auto pl-2 pr-6 md:px-6 max-w-6xl flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center flex-shrink-0 mr-4">
              <img src={logo} alt="Aged Care Decision Guide" className="h-6 sm:h-12 w-auto object-contain rounded-xl" />
            </a>
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

      {/* Article Header */}
      <article className="pt-16 pb-20 px-6">
        <div className="container mx-auto max-w-[700px]">
          <Link href="/blog">
            <a className="inline-flex items-center text-[#1d4ed8] font-bold hover:text-[#0ea5e9] transition-colors mb-8">
              <span className="mr-2">←</span> Back to blog
            </a>
          </Link>

          <div className="flex items-center gap-4 mb-6 text-[0.95rem] font-medium text-gray-500 uppercase tracking-wider">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="flex items-center gap-1.5"><span className="text-[#10b981]">⏱</span> {post.readTime} min read</span>
          </div>

          <h1 className="text-[2.5rem] md:text-[3.2rem] font-serif font-bold text-[#1e3a8a] leading-[1.15] mb-12">
            {post.title}
          </h1>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:font-serif prose-headings:text-[#1e3a8a] prose-a:text-[#1d4ed8] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr className="my-12 border-gray-200" />

          {/* CTA at bottom */}
          <div className="mt-12 space-y-5">
            <div className="rounded-2xl border border-[#bae6fd] bg-[#e0f2fe] p-8 text-center">
              <h3 className="mb-4 text-[1.5rem] font-serif font-bold text-[#1e3a8a]">
                Need Help Right Now?
              </h3>
              <p className="mb-6 text-[1.1rem] text-[#1e3a8a]/80">
                Download our free Crisis Guide if you're facing an immediate aged care decision.
              </p>
              <Button 
                className="h-12 rounded-full bg-[#10b981] px-8 text-[1.05rem] font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:bg-[#059669]"
                onClick={() => { window.location.href = '/#free-resource-section'; }}
                data-testid="button-blog-free-crisis-guide"
              >
                Get Free Crisis Guide
              </Button>
            </div>

            <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-8 text-center">
              <h3 className="mb-4 text-[1.5rem] font-serif font-bold text-[#166534]">
                Want the Complete Picture?
              </h3>
              <p className="mb-6 text-[1.1rem] text-[#166534]/80">
                The full Aged Care Decision Guide covers everything in this article plus RAD/DAP strategies, facility checklists, cost calculators, and more.
              </p>
              <Button 
                className="h-12 rounded-full bg-[#10b981] px-8 text-[1.05rem] font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:bg-[#059669]"
                onClick={handleBuyNow}
                data-testid="button-blog-get-guide"
              >
                Get the Guide - $29
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#2d3e50] text-white py-12 text-center mt-auto">
        <div className="container mx-auto px-6">
           <p className="text-[1rem] text-gray-400 mb-4">&copy; {new Date().getFullYear()} Aged Care Decision Guide. All rights reserved.</p>
           <div className="flex justify-center gap-6 text-[1rem]">
             <Link href="/blog"><a className="text-gray-400 hover:text-white underline">Blog</a></Link>
             <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
             <a href="#" className="text-gray-400 hover:text-white underline">Terms of Service</a>
           </div>
        </div>
      </footer>
      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}