import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const [_, navigate] = useLocation();
  const [name, setName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // if there's a saved name in sessionStorage
    const savedName = sessionStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }

    setIsLoaded(true);
  }, []);

  const handleStart = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to start the test",
        variant: "destructive",
      });
      return;
    }
    sessionStorage.setItem("userName", name.trim());
    navigate("/test");
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        delay: custom * 0.2
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInVariants}
          custom={0}
          className="text-center px-2 sm:px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Discover Your Personality Type
          </h1>
          <motion.p 
            variants={fadeInVariants}
            custom={1}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Take our scientifically based personality test to understand yourself better
            and unlock your true potential
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          custom={2}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-6 sm:mb-8 px-2 sm:px-4"
        >
          <Card className="bg-white/50 backdrop-blur-sm border border-primary/10 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="order-2 md:order-1 flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    What You'll Discover
                  </h2>
                  <ul className="space-y-2 text-left text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span> 
                      <span>Your unique personality profile</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span> 
                      <span>Detailed trait analysis with personalized insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span> 
                      <span>Key personal strengths and talents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span> 
                      <span>Growth opportunities and development paths</span>
                    </li>
                  </ul>
                </div>
                <div className="md:order-2 order-1 mb-4 md:mb-0">
                  <img
                    src="https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/getty_862457080_200012792000928089_371310.jpg"
                    alt="Personality Insights"
                    className="rounded-lg object-cover w-full h-40 sm:h-48 md:h-52 shadow-md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          custom={3}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-md mx-auto space-y-4 mb-6 sm:mb-8 px-4"
        >
          <div className="text-left">
            <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1.5 bg-white/80"
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          custom={4}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleStart}
            className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all group"
          >
            Start the Test
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}