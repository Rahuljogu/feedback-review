import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Empowering Students with Voice & Transparency
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            EduVoice was founded on a simple belief: education improves when feedback flows freely. 
            We provide a platform where students can share honest, constructive reviews about their 
            institutions, helping future students make better choices and institutions improve.
          </p>
          
          <div className="mt-8 space-y-4">
            {[
              "100% Student-Driven Reviews",
              "Anonymous & Verified Feedback",
              "Direct Impact on Institutional Quality",
              "Community-Led Education Reform"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Library / students studying */}
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" 
              alt="Students collaborating" 
              className="w-full object-cover h-[500px]"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent z-[-1]"></div>
          <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-secondary z-[-1]"></div>
        </motion.div>
      </div>
    </div>
  );
}
