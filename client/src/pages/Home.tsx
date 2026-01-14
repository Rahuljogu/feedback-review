import { useReviews } from "@/hooks/use-reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, BookOpen, MessageSquare, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: reviews, isLoading } = useReviews();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/reviews?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const featuredReviews = reviews?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g315c04f8878a7d2a4bdf6e3ad54605c039d399fa04612b5f3fe0ad28980d3dd268b43d97515e8a31d99dcf6ef2e8846f68d3c125b1a826dcbb9ddd668888224a_1280.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Elevate Education Through <span className="text-accent">Transparent Feedback</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Join thousands of students sharing their real experiences. Help others make informed decisions about their educational journey.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for your university or college..." 
                className="h-12 w-full rounded-full bg-white pl-12 pr-4 text-foreground shadow-xl ring-offset-primary transition-all focus:ring-2 focus:ring-accent"
              />
              <Button type="submit" className="absolute right-1.5 top-1.5 rounded-full bg-primary px-6 h-9 hover:bg-primary/90">
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Real Reviews",
                desc: "Authentic feedback from verified students about courses and campus life."
              },
              {
                icon: ShieldCheck,
                title: "Anonymous & Safe",
                desc: "Share your honest thoughts without fear. We protect your privacy."
              },
              {
                icon: BookOpen,
                title: "Better Decisions",
                desc: "Make informed choices about your future based on community insights."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Recent Feedback</h2>
              <p className="mt-2 text-muted-foreground">See what students are saying right now.</p>
            </div>
            <Link href="/reviews">
              <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                View all reviews <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-secondary/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/submit-feedback">
              <Button size="lg" className="rounded-full px-8 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
                Share Your Experience
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
