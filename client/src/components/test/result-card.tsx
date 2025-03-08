import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { personalityTypes } from "@/lib/questions";
import { CheckCircle2, Brain, TrendingUp, Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultCardProps {
  type: string;
  name: string;
  description: string;
  image: string;
  details?: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
    traits: {
      extraversion: number;
      introversion: number;
      sensing: number;
      intuition: number;
      thinking: number;
      feeling: number;
      judging: number;
      perceiving: number;
    };
  };
}

export default function ResultCard({ type, name, description, image, details }: ResultCardProps) {
  const personalityType = personalityTypes[type as keyof typeof personalityTypes];

  const chartData = details ? [
    {
      trait: "Mind",
      value: Math.abs(details.mind),
      fullMark: 100,
    },
    {
      trait: "Energy",
      value: Math.abs(details.energy),
      fullMark: 100,
    },
    {
      trait: "Nature",
      value: Math.abs(details.nature),
      fullMark: 100,
    },
    {
      trait: "Tactics",
      value: Math.abs(details.tactics),
      fullMark: 100,
    },
  ] : [];

  const traitPairs = details?.traits ? [
    { label: "Extraversion vs Introversion", a: details.traits.extraversion, b: details.traits.introversion },
    { label: "Sensing vs Intuition", a: details.traits.sensing, b: details.traits.intuition },
    { label: "Thinking vs Feeling", a: details.traits.thinking, b: details.traits.feeling },
    { label: "Judging vs Perceiving", a: details.traits.judging, b: details.traits.perceiving },
  ] : [];

  return (
    <Card className="overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-[200px] sm:h-[250px] md:h-full min-h-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="inline-block bg-primary/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm md:text-base text-white font-medium mb-2">
                {type}
              </div>
              <h3 className="text-xl md:text-2xl font-bold">{name}</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            <div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {details && (
              <>
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Trait Analysis
                  </h4>
                  {traitPairs.map((pair, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                        <span>{pair.label}</span>
                        <span>{Math.round(Math.max(pair.a, pair.b))}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${Math.max(pair.a, pair.b)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-[180px] sm:h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
                      <Radar
                        name="Personality Traits"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Key Strengths
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {personalityType.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Growth Areas
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {personalityType.growthAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}