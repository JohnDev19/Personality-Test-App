import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function NotFound() {
  const [_, navigate] = useLocation();
  const [path, setPath] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);

    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120,
        duration: 0.8 
      }
    }
  };

  const possibleIssues = [
    "The page may have been moved or deleted",
    "The URL might be misspelled or incorrect",
    "You might not have permission to access this page",
    "The page might be temporarily unavailable"
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-primary/5 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-xl"
      >
        <Card className="backdrop-blur-sm bg-white/90 border border-primary/10 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-primary"></div>

          <CardContent className="pt-8 pb-6">
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center bg-red-50 rounded-full p-4">
                <motion.div
                  variants={numberVariants}
                  className="relative"
                >
                  <AlertCircle className="h-10 w-10 text-red-500" />
                  {animationComplete && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white"
                    />
                  )}
                </motion.div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">404</span>
                  <span className="text-xl sm:text-2xl font-medium text-gray-700">|</span>
                  <span className="ml-2 text-xl sm:text-2xl font-medium text-gray-700">Page Not Found</span>
                </h1>
                <p className="mt-2 text-gray-600">
                  The page you're looking for doesn't exist or isn't available
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6"
            >
              <p className="text-amber-800 text-sm flex items-start">
                <span className="mr-2 mt-0.5"><Search className="h-4 w-4" /></span>
                <span>
                  <strong>Requested URL:</strong> {path}
                </span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-medium text-gray-800 mb-3">What might have happened?</h2>
              <ul className="space-y-2 pl-1">
                {possibleIssues.map((issue, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="text-primary mr-2">•</span>
                    {issue}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between py-4">
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </motion.div>
          </CardFooter>
        </Card>

        <motion.p 
          variants={itemVariants}
          className="text-center text-sm text-gray-500 mt-4"
        >
          If you believe this is an error, please contact our support team.
        </motion.p>
      </motion.div>
    </div>
  );
}