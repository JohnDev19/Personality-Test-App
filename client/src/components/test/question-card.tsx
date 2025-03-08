import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const ratings = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
          {question.text}
        </h2>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between text-xs sm:text-sm font-medium">
            <span className="text-red-500">Strongly Disagree</span>
            <span className="text-green-500">Strongly Agree</span>
          </div>

          <div className="rating-scale grid grid-cols-7 gap-1 sm:gap-2">
            {ratings.map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnswer(rating)}
                className={cn(
                  "h-10 sm:h-12 rounded-full transition-colors",
                  "hover:ring-2 hover:ring-primary/50 focus:outline-none focus:ring-2 focus:ring-primary",
                  rating === 4 && "bg-gray-100 hover:bg-gray-200 neutral-marker",
                  rating < 4 && `bg-red-${(4 - rating) * 100} hover:bg-red-${(4 - rating) * 100}/80`,
                  rating > 4 && `bg-green-${(rating - 4) * 100} hover:bg-green-${(rating - 4) * 100}/80`,
                  "flex items-center justify-center text-sm sm:text-base font-medium touch-manipulation"
                )}
              >
                {rating}
              </motion.button>
            ))}
          </div>

          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>←</span>
            <span>Neutral</span>
            <span>→</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}