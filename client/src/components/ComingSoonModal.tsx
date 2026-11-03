import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComingSoonModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-2xl">
        {/* Hidden Title & Description for Accessibility */}
        <DialogTitle className="sr-only">Checkout Coming Soon</DialogTitle>
        <DialogDescription className="sr-only">
          We're putting the finishing touches on our secure checkout experience.
        </DialogDescription>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 shadow-[0_20px_70px_-10px_rgba(14,165,233,0.3)] transform-gpu">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-emerald-400/10 opacity-70"></div>
          
          <div className="relative p-8 md:p-10 flex flex-col items-center text-center space-y-6">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              className="w-24 h-24 bg-gradient-to-tr from-[#0ea5e9] to-[#1e3a8a] rounded-2xl rotate-3 flex items-center justify-center shadow-xl shadow-blue-500/40"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Sparkles className="w-12 h-12 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            
            <div className="space-y-3 relative z-10">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9] font-serif tracking-tight leading-tight"
              >
                Almost Ready
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-600 text-[1.1rem] leading-relaxed max-w-sm mx-auto"
              >
                We're putting the finishing touches on our secure checkout experience.
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 rounded-full text-[0.95rem] font-bold mt-2 shadow-sm"
              >
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Check back very soon</span>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full pt-4"
            >
              <Button 
                onClick={onClose}
                className="w-full h-14 text-[1.1rem] font-bold bg-gradient-to-r from-[#1e3a8a] to-[#172554] hover:from-[#172554] hover:to-[#0f172a] text-white rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Got it, thanks!
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
