export interface Question {
  id: string;
  text: string;
  category: "mind" | "energy" | "nature" | "tactics";
}

export interface PersonalityType {
  name: string;
  description: string;
  image: string;
  strengths: string[];
  growthAreas: string[];
}

export interface TestResult {
  type: string;
  details: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
  };
}