import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, ShieldCheck, TrendingDown, CreditCard, Quote, FileText, Flag, CalendarCheck, Award, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ComingSoonModal } from "@/components/ComingSoonModal";

import bookCover from "@assets/Screen_Shot_2026-03-08_at_10.22.29_am_1772960570658.png";
import logo from "@assets/ageD_care_guide-3_1771751737790.png";
import familyPhoto from "@assets/411a69bb-795d-4647-ada1-4f24997a377f_1771756644959.jpg";
import familyPaperwork from "@assets/b74f4e2b-4087-47cb-9ff9-1e7eb40ead0a_1771799334443.jpg";
import pdfPreview from "@assets/Screen_Shot_2026-03-08_at_9.46.43_pm_1772966882815.png";
import doctorPatientPhoto from "@assets/e68bb579-4401-4fcd-828b-157a899b9612_1771977073711.jpg";
import samplePageOne from "@assets/Screen_Shot_2026-04-08_at_11.39.23_am_1775612592979.png";
import samplePageTwo from "@assets/Screen_Shot_2026-04-08_at_11.39.44_am_1775612599540.png";
import infographic from "@/assets/images/infographic.png";
import author from "@/assets/images/author.png";

import { motion } from "framer-motion";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address."),
});

export default function Home() {
  const { toast } = useToast();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  
  const leadForm = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  const onSubmit = (data: z.infer<typeof leadSchema>) => {
    toast({
      title: "Success!",
      description: `Redirecting to Stripe checkout for ${data.firstName}...`,
    });
  };

  const handleBuyNow = () => {
    setShowComingSoon(true);
    
    // Track clicks in local storage as a mockup for the requested JSON file
    const currentClicks = parseInt(localStorage.getItem("buy_button_clicks") || "0", 10) + 1;
    localStorage.setItem("buy_button_clicks", currentClicks.toString());
    console.log(`[Demand Tracker] Buy button clicked! Total clicks: ${currentClicks}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip text-[#333333]">
      {/* Minimal Navbar */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50 py-3 z-50 sticky top-0 shadow-sm">
        <div className="container mx-auto pl-2 pr-6 md:px-6 max-w-6xl flex justify-between items-center">
          <a href="/" className="flex items-center flex-shrink-0 mr-4">
            <img src={logo} alt="Aged Care Decision Guide" className="h-6 sm:h-12 w-auto object-contain rounded-xl" data-testid="img-header-logo" />
          </a>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="hidden md:flex h-9 text-[0.85rem] font-bold border-transparent bg-[#e0f2fe] text-[#1d4ed8] hover:bg-[#bfdbfe] rounded-full transition-colors"
              onClick={() => {
                document.getElementById('free-resource-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-header-free"
            >Free Crisis Guide</Button>
            <div className="relative inline-block w-full sm:w-auto group">
              <Button 
                onClick={handleBuyNow} 
                className="relative z-10 w-full sm:w-auto h-9 sm:h-12 text-[0.85rem] sm:text-[1.05rem] px-4 sm:px-8 font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-lg sm:rounded-xl shadow-[0_4px_14px_rgba(16,185,129,0.4)] transition-all group-hover:-translate-y-0.5" 
                data-testid="button-header-buy"
              >
                Get the Guide $29
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section (Mindstream Style) */}
      <section className="bg-[#172554] pt-8 pb-10 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left Column: Value Proposition */}
            <div className="flex-1 space-y-5 lg:pr-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0ea5e9]/20">
                  <span className="h-2 w-2 rounded-full bg-[#0ea5e9] animate-shimmer"></span>
                </span>
                <span className="text-[#0ea5e9] font-bold text-[0.85rem] tracking-wider uppercase">updated with Current 2026 Regulations</span>
              </div>
              
              <h1 className="text-[2rem] lg:text-[2.6rem] font-serif font-medium text-white leading-[1.15]">Before You Sign Anything. The Guide Australian Families Need Right Now.</h1>
              
              <p className="font-medium text-white/90 max-w-xl text-[20px]">Empower yourself with expert, unbiased guidance on navigating Australia's aged care system. Save time, money, and stress.</p>
              
              <div className="text-[1.05rem] text-white/90 leading-relaxed max-w-xl space-y-4">
                <p>
                  Before you call My Aged Care. Before you visit facilities. Before you make decisions you can't undo.
                </p>
              </div>
              
              <div className="py-4 space-y-4">
                <div className="relative inline-block w-full sm:w-auto group">
                  <Button onClick={handleBuyNow} className="relative z-10 w-full sm:w-auto h-14 text-[1.1rem] px-10 font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all group-hover:-translate-y-0.5" data-testid="button-hero-buy">
                    Get the Guide Today $29
                  </Button>
                </div>
                <p className="text-[0.95rem] text-white/70 font-medium">    Every fee, every exemption, every mistake to avoid • Instant download</p>
              </div>
            </div>

            {/* Right Column: Book Cover */}
            <div className="w-full max-w-[186px] lg:max-w-[250px] mx-auto lg:mx-0 lg:w-[250px] flex-shrink-0 mt-10 lg:mt-0 [perspective:1200px]">
              <motion.div 
                initial={{ y: 0, rotateY: -25, rotateX: 5 }}
                animate={{ y: [-5, 5, -5] }}
                whileHover={{ scale: 1.05, rotateY: -5, rotateX: 2, transition: { duration: 0.3 } }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full transition-all duration-700 ease-out [transform-style:preserve-3d]"
              >
                
                {/* Intense Ground/Depth Shadow */}
                <div className="absolute -bottom-8 left-2 right-[-30px] h-12 bg-black/70 blur-[25px] rounded-[100%] [transform:rotateX(50deg)] z-0 pointer-events-none"></div>
                <div className="absolute -bottom-2 -right-4 w-full h-full bg-black/30 blur-[40px] z-0 pointer-events-none [transform:translateZ(-50px)]"></div>
                
                {/* Pages - Right Edge */}
                <div className="absolute top-[1.5%] right-[-24px] w-[24px] h-[97%] bg-[#fcfcfc] [transform-origin:left_center] [transform:rotateY(90deg)] border-r border-gray-300 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] overflow-hidden rounded-r-[1px]">
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,#d1d5db_0,#d1d5db_1px,transparent_1px,transparent_4px)] opacity-60"></div>
                </div>

                {/* Pages - Bottom Edge */}
                <div className="absolute bottom-[-24px] left-[1.5%] w-[97%] h-[24px] bg-[#fcfcfc] [transform-origin:top_center] [transform:rotateX(-90deg)] border-b border-gray-300 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] overflow-hidden rounded-b-[1px]">
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#d1d5db_0,#d1d5db_1px,transparent_1px,transparent_4px)] opacity-60"></div>
                </div>

                {/* Spine fold effect */}
                <div className="absolute inset-y-0 left-0 w-[12px] bg-gradient-to-r from-black/40 via-white/20 to-transparent z-20 pointer-events-none rounded-l-sm mix-blend-overlay"></div>
                <div className="absolute inset-y-0 left-[12px] w-[2px] bg-black/10 z-20 pointer-events-none"></div>

                {/* Cover */}
                <img 
                  src={bookCover} 
                  alt="Aged Care Decision Guide Book Cover" 
                  className="relative z-10 w-full h-auto block rounded-sm"
                  data-testid="img-book-hero"
                />
              </motion.div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSamplePreview(true)}
                  className="h-11 w-full border-white/20 bg-white/10 px-6 font-bold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  data-testid="button-read-sample"
                >
                  Read Sample
                </Button>
                <p className="text-center text-[0.85rem] font-medium text-white/65" data-testid="text-sample-caption">
                  Preview two real pages from Chapter 1 before you buy.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* Book Mockup & 5 Trust Signals */}
      <section className="pt-8 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Trust Signal 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2, boxShadow: "0 10px 25px -5px rgba(14,165,233,0.2)" }}
              className="h-full"
            >
              <Card className="h-full border border-gray-100 shadow-sm transition-all duration-300 bg-white group transform-gpu">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Check className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-[0.85rem] font-bold text-[#172554] uppercase tracking-wide leading-tight">GENUINELY
                  Independent</h3>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">No facility commissions, no placement service fees</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Trust Signal 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2, boxShadow: "0 10px 25px -5px rgba(14,165,233,0.2)" }}
              className="h-full"
            >
              <Card className="h-full border border-gray-100 shadow-sm transition-all duration-300 bg-white group transform-gpu">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-[0.85rem] font-bold text-[#172554] uppercase tracking-wide leading-tight">Based on Government Regulations</h3>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">
                    Aged Care Act 1997, Social Security Act 1991
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Signal 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2, boxShadow: "0 10px 25px -5px rgba(14,165,233,0.2)" }}
              className="h-full"
            >
              <Card className="h-full border border-gray-100 shadow-sm transition-all duration-300 bg-white group transform-gpu">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Flag className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-[0.85rem] font-bold text-[#172554] uppercase tracking-wide leading-tight">Written From Inside the System</h3>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">Fee schedules, legislation, and real family scenarios</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Signal 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2, boxShadow: "0 10px 25px -5px rgba(14,165,233,0.2)" }}
              className="h-full"
            >
              <Card className="h-full border border-gray-100 shadow-sm transition-all duration-300 bg-white group transform-gpu">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <CalendarCheck className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-[0.85rem] font-bold text-[#172554] uppercase tracking-wide leading-tight">Regularly Updated</h3>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">Current for 2026 regulations and fees</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Signal 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2, boxShadow: "0 10px 25px -5px rgba(14,165,233,0.2)" }}
              className="h-full md:col-span-1 col-span-2"
            >
              <Card className="h-full border border-gray-100 shadow-sm transition-all duration-300 bg-white group transform-gpu">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-[0.85rem] font-bold text-[#172554] uppercase tracking-wide leading-tight">30-Day Guarantee</h3>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">
                    Full refund if it doesn't help
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
        </div>
      </section>
      {/* Free Resource Section */}
      <section id="free-resource-section" className="py-20 bg-[#e0f2fe] text-[#1e3a8a] relative z-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Left Column: Visuals */}
            <motion.div 
              className="w-full md:w-5/12 relative mt-6 md:mt-0 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, type: "spring", bounce: 0.15 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white w-full aspect-[4/3] md:aspect-auto md:h-[400px] transform hover:scale-[1.02] transition-transform duration-500">
                <img src={doctorPatientPhoto} alt="Patient in hospital consulting with doctor" className="w-full h-full object-cover object-[center_10%]" />
              </div>
              <motion.div 
                className="absolute -bottom-16 -right-2 md:-bottom-32 md:-right-6 rounded-xl overflow-hidden shadow-2xl border-[4px] border-white bg-white w-[130px] md:w-[160px] z-10"
                initial={{ opacity: 0, rotate: 20, scale: 0.8, x: 150, y: 50 }}
                whileInView={{ opacity: 1, rotate: -5, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.8, delay: 0.4, type: "spring", bounce: 0.15 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <img src={pdfPreview} alt="5 Questions to Ask Staff PDF Preview" className="w-full h-auto" />
              </motion.div>
            </motion.div>
            
            {/* Right Column: Text & CTA */}
            <div className="w-full md:w-7/12 text-center md:text-left space-y-6 lg:pl-6">
              <div className="inline-block px-4 py-1.5 bg-[#bfdbfe] text-[#1d4ed8] font-bold text-[0.85rem] tracking-wider uppercase rounded-full">
                Free Resource &ndash; Get Instant Help in Urgent Situations
              </div>
              
              <h2 className="text-[2rem] md:text-[2.6rem] font-serif font-bold leading-tight">Facing a Rushed Aged Care Decision in Hospital? Read This Before You Sign Anything.</h2>
              
              <p className="text-[1.15rem] leading-relaxed text-[#1e3a8a]/80">When time is short and pressure is high, knowing what to ask can prevent costly mistakes. Download our FREE Crisis Guide cheat sheet—designed for Australian families to get quick clarity on care options, fees, and rights. </p>
              
              <div className="pt-2 space-y-3">
                <a 
                  href="/free-crisis-guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-14 text-[1.05rem] font-bold bg-[#10b981] hover:bg-[#059669] text-white px-10 rounded-full shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105" 
                  data-testid="button-free-resource"
                >Download Free  Crisis Guide</a>
                <p className="text-[0.95rem] text-[#1e3a8a]/70 font-medium">
                  Instant access &bull; No email required &bull; No registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* The Problem You're Facing */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            
            {/* Right Column: Visual Infographic */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-start">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white max-w-[500px] w-full aspect-[4/3]">
                <img 
                  src={familyPaperwork} 
                  alt="Family concerned about aged care decisions" 
                  className="w-full h-full object-cover object-[center_45%]"
                />
              </div>
            </div>

            {/* Left Column: Text */}
            <div className="w-full lg:w-7/12 space-y-6">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-serif font-bold leading-tight text-[#1e3a8a]">Most Families Lose $50,000–$200,000 in Aged Care. Not Because They Don't Care. Because Nobody Told Them the Rules.</h2>
              
              <div className="space-y-4 text-[0.95rem] md:text-[1rem] leading-relaxed text-gray-700">
                <p>Navigating Australia's aged care system is overwhelming. From choosing facilities to understanding the three types of fees, to means testing, one wrong move can lead to choices they cannot undo.</p>
                <p>This guide, updated for 2026 changes, gives you the complete picture to help you avoid common traps like choosing the wrong Aged Care, overpaying on RADs or missing subsidies.</p>
              </div>
              
              <div className="pt-4">
                <a 
                  href="#buy-section" 
                  className="inline-flex items-center text-[#1d4ed8] font-bold text-[1.1rem] hover:text-[#1e3a8a] transition-colors group"
                >
                  Learn More 
                  <span className="ml-2 transform group-hover:translate-y-1 transition-transform">&darr;</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* What You'll Get */}
      <section className="py-12 md:py-16 bg-[#172554] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#2563eb] blur-[100px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9] blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 lg:gap-12">
            
            {/* Right Column: Text */}
            <div className="w-full lg:w-1/2 space-y-4 lg:space-y-5">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-serif font-medium leading-tight text-white">
                Inside the Guide: Practical Tools to Make Confident Choices
              </h2>
              
              <div className="space-y-2 text-[0.95rem] lg:text-[1rem] text-white/90">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">A complete plain-English guide to major aged care decision Australian families face.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">Breakdown of 2026 funding changes and how to maximize benefits (what you'll actually pay each month).</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">How to avoid $200K+ mistakes.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">Real case studies from Australian families.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">Printable checklists for every decision point &mdash; before you sign anything.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
                  <p className="leading-snug md:leading-relaxed">Genuinely independent advice — no facility commissions, no provider relationships, no sales pitches</p>
                </div>
              </div>

              <div className="pt-2 lg:pt-3 border-t border-white/10 mt-4 lg:mt-5">
                <p className="font-bold text-white mb-3 text-[0.95rem] lg:text-[1rem]">After reading this guide you'll know:</p>
                <div className="space-y-2 text-[0.9rem] lg:text-[0.95rem] text-white/90">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex gap-2.5 items-start"
                  >
                    <span className="text-[#60a5fa] font-bold shrink-0 mt-[1px]">✓</span>
                    <p className="leading-snug">Exactly what you'll pay each month — and what you won't have to</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex gap-2.5 items-start"
                  >
                    <span className="text-[#60a5fa] font-bold shrink-0 mt-[1px]">✓</span>
                    <p className="leading-snug">Whether selling the family home is necessary or a costly mistake</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex gap-2.5 items-start"
                  >
                    <span className="text-[#60a5fa] font-bold shrink-0 mt-[1px]">✓</span>
                    <p className="leading-snug">What to ask before you sign anything</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex gap-2.5 items-start"
                  >
                    <span className="text-[#60a5fa] font-bold shrink-0 mt-[1px]">✓</span>
                    <p className="leading-snug">How to slow down a decision everyone is pressuring you to make in 24 hours</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex gap-2.5 items-start"
                  >
                    <span className="text-[#60a5fa] font-bold shrink-0 mt-[1px]">✓</span>
                    <p className="leading-snug">When you need a financial adviser — and when you don't</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="py-4 lg:hidden">
                <div className="relative inline-block w-full sm:w-auto group">
                  <Button onClick={handleBuyNow} className="relative z-10 w-full sm:w-auto h-14 text-[1.1rem] px-10 font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all group-hover:-translate-y-0.5" data-testid="button-inside-guide-buy">
                    Get the Guide Today $29
                  </Button>
                </div>
              </div>
            </div>

            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:-mt-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 w-full z-0">
                <img 
                  src={familyPhoto} 
                  alt="Family discussing aged care options" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Product Image Overlay */}
              <motion.div 
                className="absolute -bottom-16 -right-4 lg:-right-8 w-[160px] md:w-[220px] lg:w-[240px] z-10"
                initial={{ opacity: 0, x: 50, y: 50, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src={bookCover} alt="Aged Care Decision Guide" className="w-full h-auto drop-shadow-2xl" />
              </motion.div>

              <div className="hidden lg:block pt-[200px] w-full text-center">
                <div className="relative inline-block group">
                  <Button onClick={handleBuyNow} className="relative z-10 h-14 text-[1.2rem] px-12 font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all group-hover:-translate-y-0.5" data-testid="button-inside-guide-buy-lg">
                    Get the Guide Today $29
                  </Button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-12 bg-[#f5f8fa] border-t border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[1.8rem] font-bold text-[#2d3e50]"
          >
            Trusted by Australian Families
          </motion.h2>
          
          <div className="grid gap-5 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -10px rgba(14,165,233,0.15)" }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-6 text-left transform-gpu transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-[#e6f2ff] shrink-0" />
              <div>
                <p className="text-[1.1rem] italic text-gray-800 mb-4 leading-relaxed">"This book saved us from selling Dad's house immediately. The chapter on RAD vs DAP strategies is worth 1000x the price of the book alone. Clear, concise, and incredibly practical."</p>
                <div>
                  <p className="font-bold text-[1rem] text-[#2d3e50]">Mel V</p>
                  <p className="text-[0.9rem] text-gray-500">Sydney, Australia</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -10px rgba(14,165,233,0.15)" }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-6 text-left transform-gpu transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-[#e6f2ff] shrink-0" />
              <div>
                <p className="text-[1.1rem] italic text-gray-800 mb-4 leading-relaxed">"The checklists alone were worth it - they helped us realize Mum could stay home with proper support instead of going into a facility. The guide walked us through exactly who to contact and how to get funding approved fast. Wish we'd found this sooner."</p>
                <div>
                  <p className="font-bold text-[1rem] text-[#2d3e50]">Matt</p>
                  <p className="text-[0.9rem] text-gray-500">Perth, Australia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-2xl space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[1.8rem] md:text-[2.2rem] font-serif font-bold text-center text-[#2d3e50]"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                I'M IN CRISIS RIGHT NOW — WHICH SHOULD I GET?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                Start with the Free Crisis Guide — it's six questions you can use today in the hospital or facility. If you have any time at all, get the full guide too. Chapter 6 specifically covers how to buy yourself time even when everyone is pressuring you to decide immediately, and Chapter 7 has printable questions for every conversation you're about to have.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                WHY PAY FOR THIS WHEN THERE'S FREE INFO ONLINE?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5 space-y-4">
                <p>Government websites explain the rules but don't show you how to APPLY them to your situation. Free advice from facilities is often biased (they want you to choose them).</p>
                <p>My Aged Care explains the system. This guide explains how to navigate it without losing $50,000–$200,000.</p>
                <p>This guide is independent, shows you exactly what to do in YOUR situation, and costs less than one hour with a financial adviser ($200-400) while potentially saving you $50,000-200,000.</p>
                <p className="font-semibold text-[#1d4ed8]">Think of it as insurance against expensive mistakes.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                IS THIS WRITTEN BY AN AGED CARE FINANCIAL ADVISER?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                No — and that's intentional. This guide is written from the perspective of someone who went looking for plain-English information and couldn't find it. Every fee, cap, and threshold is drawn directly from official government fee schedules and legislation including the Aged Care Act 1997 and Social Security Act 1991. It tells you exactly what the rules are, what the numbers are, and what mistakes to avoid. Chapter 8 specifically explains when you do need a professional adviser and how to find a good one.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                IS THIS FINANCIAL ADVICE?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                No. This is information — the same information that's publicly available through government legislation and fee schedules, organised and explained in plain English so you can understand your situation before you speak to professionals. It tells you what questions to ask and what mistakes to avoid. For decisions involving significant assets, Chapter 8 explains when to get formal financial advice and what that should cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                IS THIS INFORMATION CURRENT?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                Yes. The guide is updated for 2026 regulations including the new fee structure that came into effect on 1 November 2025 and the January 2026 fee indexation. All figures are drawn from the current government Schedule of Fees and Charges for Residential Care.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                WHO IS THIS FOR?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                Adult children whose parent is facing aged care — whether that's an immediate hospital discharge decision or planning ahead for the next 6–12 months. It's also for the older person themselves who wants to understand their rights and options. If you're dealing with the Australian aged care system and feel overwhelmed by the fees, the jargon, or the pressure to decide quickly, this guide is for you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                WHAT FORMAT IS IT?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                A PDF ebook — instant download the moment you purchase. You can read it on any device, print sections you need, and use the checklists in Chapter 12 directly. No app required, nothing to install.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
              <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                WHAT IF I DON'T LIKE IT?
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                Full refund within 30 days, no questions asked. If it doesn't help your situation, you shouldn't pay for it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </motion.div>
        </div>
      </section>
      {/* Final Conversion Section */}
      <section className="py-12 md:py-16 bg-[#172554] text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            
            {/* Left side: Book Cover */}
            <div className="w-48 md:w-64 shrink-0 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src={bookCover} alt="Aged Care Decision Guide" className="w-full h-auto drop-shadow-2xl filter brightness-110" />
            </div>

            {/* Right side: Content */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <h2 className="text-[2rem] md:text-[2.6rem] font-serif font-bold text-white leading-tight">
                The decision is coming whether you're ready or not. Be ready.
              </h2>
              <p className="text-[1.1rem] md:text-[1.25rem] text-white/90 leading-relaxed max-w-xl">
                You're about to make one of the biggest financial decisions of your family's life. $29 is not the time to guess.
              </p>
              <div className="relative inline-block w-full sm:w-auto group">
                <Button 
                  onClick={handleBuyNow} 
                  className="relative z-10 w-full sm:w-auto h-16 text-[1.15rem] px-12 font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-[0_8px_25px_rgba(16,185,129,0.4)] transition-all group-hover:-translate-y-1" 
                  data-testid="button-final-buy"
                >
                  Get the Guide Today $29
                </Button>
              </div>
              <p className="text-[0.95rem] text-white/70 font-medium">Independent • PDF guide • Instant download • 30-day money-back guarantee</p>
            </div>

          </div>
        </div>
      </section>
      {/* General Aged Care FAQs */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[1.8rem] md:text-[2.2rem] font-serif font-bold text-center text-[#2d3e50]"
          >Aged Care FAQ's - Understanding Aged Care in Australia</motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="faq-1" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT IS A REFUNDABLE ACCOMMODATION DEPOSIT (RAD)?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  A RAD is a lump sum payment you make to an aged care facility for your accommodation. It's fully refundable when you leave the facility, minus any retention amounts (up to 2% per year, capped at 10% total). The facility holds this money interest-free and must refund it to you or your estate within 14 days of you permanently leaving. You can choose to pay all RAD, all Daily Accommodation Payment (DAP), or a combination of both.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT IS THE DIFFERENCE BETWEEN A RAD AND A DAP?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  A RAD is a lump sum payment that you get back when you leave care. A DAP is a daily rental payment calculated using the Maximum Permissible Interest Rate (MPIR) set by the government. For example, if a facility's accommodation price is $400,000, you can pay $400,000 as a RAD (refundable), or pay approximately $90-110 per day as a DAP (not refundable), or split it - perhaps $200,000 RAD plus $45-55 per day DAP. The total accommodation cost is the same; you're just choosing how to pay it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  HOW MUCH DOES AGED CARE REALLY COST IN AUSTRALIA?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5 space-y-4">
                  <p>Aged care costs depend on your income, assets, and the facility you choose. Here's what you'll pay:</p>
                  
                  <div>
                    <p className="font-semibold text-[#2d3e50]">Everyone pays:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li><strong>Basic daily fee:</strong> Around $60/day ($22,000/year) - this is 85% of the single Age Pension</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#2d3e50]">Accommodation costs (choose one):</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li><strong>RAD (lump sum):</strong> $0 to $550,000+ depending on facility - fully refundable</li>
                      <li><strong>DAP (daily payment):</strong> $0 to $150+/day depending on facility - not refundable</li>
                      <li><strong>Combination:</strong> Part RAD + part DAP</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#2d3e50]">If you have higher income/assets:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li><strong>Means-tested care fee:</strong> $0 to $33,000/year (capped annually)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#2d3e50]">Total annual costs:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li><strong>Low assets/income:</strong> $22,000/year (basic fee only)</li>
                      <li><strong>Medium assets/income:</strong> $40,000-$60,000/year</li>
                      <li><strong>High assets/income:</strong> Up to $80,000+/year</li>
                    </ul>
                  </div>

                  <p className="font-medium text-[#1d4ed8]">The Aged Care Decision Guide breaks down all costs with real examples, calculators, and strategies to minimize what you pay.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  DO I NEED AN ACAT ASSESSMENT TO ENTER AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Yes, you must have an Aged Care Assessment Team (ACAT) assessment before entering permanent residential aged care in Australia. ACAT assesses your care needs and approves your eligibility for government-funded aged care. You can request an assessment through My Aged Care (1800 200 422) or your GP can refer you. The assessment is free and usually takes 2-4 weeks, though urgent cases can be prioritized.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT IS MEANS TESTING FOR AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Means testing determines how much you contribute to your care costs based on your income and assets. Services Australia (Centrelink) conducts the assessment, looking at your Age Pension, other income, savings, investments, and property. Depending on your total assets and income, you may pay a means-tested care fee on top of basic fees. Your family home may be exempt or partially exempt if your spouse still lives there or under certain other circumstances. The assessment affects both your accommodation costs and care fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  HOW DO I CHOOSE THE RIGHT AGED CARE FACILITY?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Visit at least 3-5 facilities in person, ideally during meal times. Check their star ratings on My Aged Care website (government quality ratings). Ask about staff-to-resident ratios, activities programs, and specialized care (dementia, palliative, etc.). Review the accommodation agreement carefully - understand all costs including RAD/DAP, extra service fees, and what happens if you run out of money. Check proximity to family and friends for regular visits. The Aged Care Decision Guide includes a comprehensive 25-point facility evaluation checklist.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  CAN I PROTECT MY FAMILY HOME FROM AGED CARE COSTS?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Your home may be exempt from the assets test if your spouse or dependent child still lives there. If you're single and your home is valued under the capped amount (currently $204,000), it's fully exempt. Above that amount, only $204,000 is exempt. You can rent out your home and the rental income is assessed. You're not forced to sell your home to pay aged care costs, but you'll need to pay accommodation costs another way (through a RAD, DAP, or combination). Many families use the rental income to cover DAP costs. Seek advice from an aged care financial adviser for your specific situation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT HAPPENS TO MY RAD WHEN I DIE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Your RAD (minus any retention amounts, unpaid fees, or additional charges) is refundable to your estate. The facility must refund the balance within 14 days of receiving all required documentation (including probate if needed). If you paid a combination RAD/DAP, the RAD portion is refundable. Any retention amounts (up to 2% per year, capped at 10% total) are kept by the facility. Make sure your executor knows about the RAD and has copies of your accommodation agreement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-9" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  HOW LONG DOES IT TAKE TO GET INTO AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  After receiving ACAT approval, timing varies significantly. Some facilities have immediate vacancies and you could move in within days (especially for emergency placements). Popular facilities in desirable locations may have waiting lists of several months. On average, expect 2-8 weeks from ACAT approval to moving in if you're not in crisis. For emergency placements (hospital discharge, unsafe at home), placements can happen within 24-48 hours, though you may need to accept whatever is available initially and transfer later.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-10" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT'S THE DIFFERENCE BETWEEN HIGH CARE AND LOW CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Australia no longer officially uses "high care" and "low care" classifications - this changed in 2014. Now all residential aged care is simply "residential aged care" and facilities must provide the level of care you need as assessed by ACAT. However, you'll still hear these terms used informally. What matters now is your ACAT assessment which determines your care needs and the government funding the facility receives to care for you. Some facilities specialize in higher-dependency residents (dementia, palliative care), while others focus on more independent residents.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-11" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  CAN MY PARTNER AND I STAY TOGETHER IN AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Yes, many facilities offer couple's accommodation. You can share a room if both of you require residential care and the facility has couple's rooms available. If only one of you needs care, the other can sometimes stay as a "social" resident (paying full costs without government subsidies). Costs are calculated individually based on each person's means test. Not all facilities offer couple's accommodation, so ask specifically when touring facilities if this is important to you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-12" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT IF I RUN OUT OF MONEY TO PAY FOR AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  If you've used all your assets to pay aged care costs (including any RAD), you become a "supported resident." The government then pays your accommodation costs and you pay a basic daily fee only (currently around $60/day). Facilities cannot evict you for inability to pay if you've genuinely used your assets for care. However, you must disclose your financial situation honestly - hiding assets can result in penalties. This is one reason many people choose partial RAD/partial DAP strategies to preserve assets longer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-13" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  IS AGED CARE AT HOME CHEAPER THAN RESIDENTIAL CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Home Care Packages (HCP) can be cheaper initially but may become more expensive as care needs increase. HCP levels 1-4 provide $9,000 to $58,000 per year in government funding, but you still pay for additional services, home modifications, and living costs. Residential care provides 24/7 care, meals, accommodation, and activities in one package. For low-level care needs, home care is usually cheaper. For high care needs (dementia, mobility issues, 24-hour supervision), residential care often becomes more cost-effective. The decision depends on care needs, home suitability, and personal preference, not just cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-14" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  WHAT SHOULD I BRING TO AGED CARE?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Bring personal items that make your room feel like home: photos, small furniture if space allows, favorite chair, blankets, TV (check facility rules). Clothing should be comfortable, easy to wash, and labeled with your name. Bring medications in original packaging and a current medication list. Most facilities provide bed, bedding, meals, and basic toiletries. Don't bring large amounts of cash or valuable jewelry. Check your facility's specific list - most provide a "what to bring" guide. The Aged Care Decision Guide includes a complete packing checklist.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-15" className="bg-gray-50 border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md">
                <AccordionTrigger className="text-[1.1rem] font-bold text-[#2d3e50] hover:no-underline hover:text-[#1d4ed8] text-left py-5">
                  CAN I CHANGE FACILITIES AFTER MOVING IN?
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-gray-700 leading-relaxed pb-5">
                  Yes, you can move to a different facility, though there are financial implications. Your RAD from the first facility is refundable (minus retention and fees) and can be used toward the new facility's RAD. You'll need a new accommodation agreement with the new facility. Some people do temporary placements while waiting for their preferred facility to have availability. Give proper notice to your current facility (check your agreement - usually 14 days). You don't need a new ACAT assessment to transfer between facilities.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
      <footer className="bg-[#2d3e50] text-white py-12 text-center">
        <div className="container mx-auto px-6">
           <p className="text-[1rem] text-gray-400 mb-4">&copy; {new Date().getFullYear()} Aged Care Decision Guide. All rights reserved.</p>
           <div className="flex justify-center gap-6 text-[1rem]">
             <a href="/blog" className="text-gray-400 hover:text-white underline">Blog</a>
             <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
             <a href="#" className="text-gray-400 hover:text-white underline">Terms of Service</a>
           </div>
        </div>
      </footer>

      <Dialog open={showSamplePreview} onOpenChange={setShowSamplePreview}>
        <DialogContent className="max-h-[90vh] overflow-hidden border-white/30 bg-white/95 p-0 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] sm:max-w-5xl">
          <DialogTitle className="sr-only">Read a sample from the Aged Care Decision Guide</DialogTitle>
          <DialogDescription className="sr-only">
            Preview two sample pages from Chapter 1 of the Aged Care Decision Guide.
          </DialogDescription>

          <div className="max-h-[90vh] overflow-y-auto px-4 py-5 md:px-8 md:py-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]">
                <div className="aspect-[668/1000] overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50">
                  <img
                    src={samplePageOne}
                    alt="Sample page 11 from the Aged Care Decision Guide"
                    className="h-full w-full object-cover"
                    loading="eager"
                    data-testid="img-sample-page-11"
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]">
                <div className="aspect-[668/1000] overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50">
                  <img
                    src={samplePageTwo}
                    alt="Sample page 12 from the Aged Care Decision Guide"
                    className="h-full w-full object-cover"
                    loading="eager"
                    data-testid="img-sample-page-12"
                  />
                </div>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}