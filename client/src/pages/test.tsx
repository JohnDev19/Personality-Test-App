import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, calculateType } from "@/lib/questions";
import { useLocation } from "wouter";
import QuestionCard from "@/components/test/question-card";
import ProgressBar from "@/components/test/progress-bar";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import WalkthroughOverlay from "@/components/test/walkthrough-overlay";
import { AlertCircle, Brain, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [previousAnswers, setPreviousAnswers] = useState<Record<string, number>>({});
  const [userName, setUserName] = useState<string>("Anonymous");
  const [_, navigate] = useLocation();
  const [showWalkthrough, setShowWalkthrough] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      toast({
        title: "Session Expired",
        description: "Please enter your name to start the test",
        variant: "destructive",
      });
      navigate("/");
    }

    const savedAnswers = sessionStorage.getItem("testAnswers");
    const savedQuestion = sessionStorage.getItem("currentQuestion");

    if (savedAnswers && savedQuestion) {
      try {
        setAnswers(JSON.parse(savedAnswers));
        setCurrentQuestion(parseInt(savedQuestion, 10));
        toast({
          title: "Progress Restored",
          description: "We've restored your previous answers",
        });
      } catch (e) {
        console.error("Error restoring progress:", e);
      }
    }
  }, [navigate, toast]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      sessionStorage.setItem("testAnswers", JSON.stringify(answers));
      sessionStorage.setItem("currentQuestion", currentQuestion.toString());
    }
  }, [answers, currentQuestion]);

  const submitMutation = useMutation({
    mutationFn: async (result: any) => {
      const response = await apiRequest("POST", "/api/test/submit", {
        ...result,
        userName,
      });
      return response.json();
    },
    onSuccess: (data) => {
      sessionStorage.removeItem("testAnswers");
      sessionStorage.removeItem("currentQuestion");
      navigate(`/results/${data.type}`);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again. Your answers have been saved.",
        variant: "destructive",
      });
    }
  });

  const handleAnswer = (rating: number) => {
    setPreviousAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answers[questions[currentQuestion].id]
    }));

    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: rating
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = calculateType(answers);
      submitMutation.mutate({
        userId: 1,
        answers,
        type: result.type,
        details: result.details,
        createdAt: new Date().toISOString()
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    if (window.confirm("Are you sure you want to restart the test? All your progress will be lost.")) {
      setAnswers({});
      setCurrentQuestion(0);
      sessionStorage.removeItem("testAnswers");
      sessionStorage.removeItem("currentQuestion");
    }
  };

  return (
    <>
      {showWalkthrough && (
        <WalkthroughOverlay onComplete={() => setShowWalkthrough(false)} />
      )}
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto py-4 sm:py-6 md:py-8">
          {/* header with name and progress */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="mr-2 rounded-full"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-medium">
                Hello, <span className="font-bold text-primary">{userName}</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRestart}
                className="text-xs"
              >
                Restart
              </Button>
            </div>
          </div>

          {/* progress bar */}
          <div className="mb-8">
            <ProgressBar 
              current={currentQuestion + 1} 
              total={questions.length} 
              className="h-2 sm:h-3"
            />
          </div>

          {/* main content area */}
          <AnimatePresence mode="wait">
            {submitMutation.isPending ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center p-6 sm:p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                  <motion.div
                    className="absolute inset-0 border-4 border-primary/30 rounded-full"
                    style={{ borderTopColor: "hsl(var(--primary))" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <Brain className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 m-auto text-primary opacity-75" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Analyzing Your Responses
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Please wait while we calculate your personality type...
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Analyzing traits</div>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Mapping patterns</div>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Creating profile</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <QuestionCard
                  question={questions[currentQuestion]}
                  onAnswer={handleAnswer}
                  previousAnswer={answers[questions[currentQuestion].id]}
                />

                {/* Nav buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="text-sm"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="text-center text-xs sm:text-sm text-muted-foreground flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1 text-primary" />
                    Answer honestly for accurate results
                  </div>

                  {answers[questions[currentQuestion].id] !== undefined && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(prev => prev + 1);
                        }
                      }}
                      disabled={currentQuestion === questions.length - 1}
                      className="text-sm"
                    >
                      Skip
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom guidance text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 p-4 bg-primary/5 rounded-lg text-sm"
          >
            <div className="font-medium mb-1">Test Progress</div>
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}% Complete</span>
              <span>{Object.keys(answers).length} of {questions.length} Questions Answered</span>
              <span>{questions.length - Object.keys(answers).length} Questions Remaining</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
