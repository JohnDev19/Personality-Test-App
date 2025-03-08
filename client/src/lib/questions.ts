export const questions = [
  // Mind category (Extraversion vs Introversion)
  {
    id: "q1",
    text: "You regularly make new friends",
    category: "mind",
  },
  {
    id: "q5",
    text: "You prefer group activities over solo endeavors",
    category: "mind",
  },
  {
    id: "q9",
    text: "You feel comfortable in crowds",
    category: "mind",
  },
  {
    id: "q13",
    text: "You often take initiative in social situations",
    category: "mind",
  },
  {
    id: "q17",
    text: "You enjoy being the center of attention",
    category: "mind",
  },
  {
    id: "q21",
    text: "After a long day, you prefer to recharge by spending time with others rather than alone",
    category: "mind",
  },
  {
    id: "q25",
    text: "You find it easy to introduce yourself to new people",
    category: "mind",
  },
  {
    id: "q29",
    text: "You tend to think out loud rather than process thoughts internally first",
    category: "mind",
  },

  // Energy category (Sensing vs Intuition)
  {
    id: "q2",
    text: "You spend a lot of your free time exploring various random topics that pique your interest",
    category: "energy",
  },
  {
    id: "q6",
    text: "You are more practical than creative",
    category: "energy",
  },
  {
    id: "q10",
    text: "You prefer hands-on learning over theoretical discussions",
    category: "energy",
  },
  {
    id: "q14",
    text: "You prefer focusing on details rather than the big picture",
    category: "energy",
  },
  {
    id: "q18",
    text: "You prefer concrete facts over abstract theories",
    category: "energy",
  },
  {
    id: "q22",
    text: "You often notice small details that others miss",
    category: "energy",
  },
  {
    id: "q26",
    text: "You enjoy thinking about what could be more than what currently is",
    category: "energy",
  },
  {
    id: "q30",
    text: "You prefer following established methods rather than experimenting with new approaches",
    category: "energy",
  },

  // Nature category (Thinking vs Feeling)
  {
    id: "q3",
    text: "Seeing other people cry can easily make you feel like you want to cry too",
    category: "nature",
  },
  {
    id: "q7",
    text: "Other people's feelings are more important than logical solutions",
    category: "nature",
  },
  {
    id: "q11",
    text: "You often make decisions based on your emotions",
    category: "nature",
  },
  {
    id: "q15",
    text: "You find it easy to empathize with fictional characters",
    category: "nature",
  },
  {
    id: "q19",
    text: "You often consult others before making important decisions",
    category: "nature",
  },
  {
    id: "q23",
    text: "You value harmony in your relationships more than being right",
    category: "nature",
  },
  {
    id: "q27",
    text: "When giving feedback, you prioritize being tactful over being truthful",
    category: "nature",
  },
  {
    id: "q31",
    text: "You find it difficult to make decisions that might hurt others, even if they're logical",
    category: "nature",
  },

  // Tactics category (Judging vs Perceiving)
  {
    id: "q4",
    text: "You usually make a backup plan for a backup plan",
    category: "tactics",
  },
  {
    id: "q8",
    text: "You rarely do something just out of sheer curiosity",
    category: "tactics",
  },
  {
    id: "q12",
    text: "Your personal work style is more planned than spontaneous",
    category: "tactics",
  },
  {
    id: "q16",
    text: "You prefer having a detailed schedule for your day",
    category: "tactics",
  },
  {
    id: "q20",
    text: "You like to keep your options open rather than plan everything",
    category: "tactics",
  },
  {
    id: "q24",
    text: "You prefer to complete one project before starting another",
    category: "tactics",
  },
  {
    id: "q28",
    text: "You find it stressful when plans change at the last minute",
    category: "tactics",
  },
  {
    id: "q32",
    text: "You enjoy spontaneous activities more than planned ones",
    category: "tactics",
  },

  {
    id: "q33",
    text: "You find it difficult to talk about your feelings",
    category: "nature",
  },
  {
    id: "q34",
    text: "You prefer working in a structured environment with clear expectations",
    category: "tactics",
  },
  {
    id: "q35",
    text: "You often think about how your actions affect others",
    category: "nature",
  },
  {
    id: "q36",
    text: "You enjoy abstract philosophical discussions",
    category: "energy",
  },
  {
    id: "q37",
    text: "You need time alone to recharge after social events",
    category: "mind",
  },
  {
    id: "q38",
    text: "You prefer to follow your intuition rather than established procedures",
    category: "energy",
  },
  {
    id: "q39",
    text: "You find it easy to stick to deadlines and commitments",
    category: "tactics",
  },
  {
    id: "q40",
    text: "You tend to analyze problems logically rather than considering how solutions affect people",
    category: "nature",
  },
]

export const personalityTypes = {
  INTJ: {
    name: "Architect",
    description:
      "INTJ (Architect) is a personality type with the Introverted, Intuitive, Thinking, and Judging traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one.",
    image: "https://i.ibb.co/CHbwmXp/IMG-20250112-001201.jpg",
    strengths: ["Strategic thinking", "Independent", "Innovative", "Determined", "Analytical"],
    growthAreas: [
      "Emotional expression",
      "Social interaction",
      "Handling criticism",
      "Flexibility",
      "Patience with others",
    ],
  },
  INTP: {
    name: "Logician",
    description:
      "INTP (Logician) is a personality type with the Introverted, Intuitive, Thinking, and Prospecting traits. These flexible thinkers enjoy taking an unconventional approach to many aspects of life. They often seek out unlikely paths, mixing willingness to experiment with personal creativity.",
    image: "https://i.ibb.co/4gRvrQs/IMG-20250112-001440.jpg",
    strengths: ["Analytical thinking", "Original ideas", "Open-minded", "Objective", "Learning ability"],
    growthAreas: ["Emotional awareness", "Practical matters", "Following rules", "Social skills", "Project completion"],
  },
  ENTJ: {
    name: "Commander",
    description:
      "ENTJ (Commander) is a personality type with the Extraverted, Intuitive, Thinking, and Judging traits. They are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them.",
    image: "https://i.ibb.co/cvtpy95/IMG-20250112-001804.jpg",
    strengths: ["Leadership", "Strategic planning", "Charismatic", "Efficient", "Decisive"],
    growthAreas: ["Emotional sensitivity", "Patience", "Accepting criticism", "Flexibility", "Work-life balance"],
  },
  ENTP: {
    name: "Debater",
    description:
      "ENTP (Debater) is a personality type with the Extraverted, Intuitive, Thinking, and Prospecting traits. They tend to be bold and creative, deconstructing and rebuilding ideas with great mental agility. They pursue their goals vigorously despite any resistance they might encounter.",
    image: "https://i.ibb.co/VNRNzhb/IMG-20250112-000402.jpg",
    strengths: ["Innovation", "Knowledge seeking", "Charisma", "Adaptability", "Problem solving"],
    growthAreas: ["Follow-through", "Sensitivity", "Organization", "Practical focus", "Patience"],
  },
  INFJ: {
    name: "Advocate",
    description:
      "INFJ (Advocate) is a personality type with the Introverted, Intuitive, Feeling, and Judging traits. They tend to approach life with deep thoughtfulness and imagination. Their inner vision, personal values, and a quiet, principled version of humanism guide them in all things.",
    image: "https://i.ibb.co/Wxn5L8y/IMG-20250112-000219.jpg",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    growthAreas: ["Perfectionism", "Avoiding conflict", "Burnout tendency", "Opening up", "Self-criticism"],
  },
  INFP: {
    name: "Mediator",
    description:
      "INFP (Mediator) is a personality type with the Introverted, Intuitive, Feeling, and Prospecting traits. These rare personality types tend to be quiet, open-minded, and imaginative, and they apply a caring and creative approach to everything they do. Poetic, kind and altruistic people, always eager to help a good cause.",
    image: "https://i.ibb.co/0QgNyWB/IMG-20250112-002016.jpg",
    strengths: ["Empathy", "Creativity", "Idealism", "Adaptability", "Dedication"],
    growthAreas: ["Practical skills", "Taking criticism", "Self-confidence", "Focus", "Organization"],
  },
  ENFJ: {
    name: "Protagonist",
    description:
      "ENFJ (Protagonist) is a personality type with the Extraverted, Intuitive, Feeling, and Judging traits. These warm, forthright types love helping others, and they tend to have strong ideas and values. They back their perspective with the creative energy to achieve their goals. Charismatic and inspiring leaders, able to mesmerize their listeners.",
    image: "https://i.ibb.co/4pJy3w9/IMG-20250112-002313.jpg",
    strengths: ["Leadership", "Charisma", "Empathy", "Organization", "Reliability"],
    growthAreas: ["Overextending", "Overthinking", "Perfectionism", "Taking criticism", "Self-care"],
  },
  ENFP: {
    name: "Campaigner",
    description:
      "ENFP (Campaigner) is a personality type with the Extraverted, Intuitive, Feeling, and Prospecting traits. These people tend to embrace big ideas and actions that reflect their sense of hope and goodwill toward others. Their vibrant energy can flow in many directions. Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    image: "https://i.ibb.co/RSWPZdR/IMG-20250112-002703.jpg",
    strengths: ["Creativity", "Enthusiasm", "Adaptability", "Communication", "Collaboration"],
    growthAreas: ["Focus", "Follow-through", "Organization", "Practical matters", "Stress management"],
  },
  ISTJ: {
    name: "Logistician",
    description:
      "ISTJ (Logistician) is a personality type with the Introverted, Observant, Thinking, and Judging traits. These people tend to be reserved yet willful, with a rational outlook on life. They compose their actions carefully and carry them out with methodical purpose. Practical and fact-minded individuals, whose reliability cannot be doubted.",
    image: "https://i.ibb.co/4gRvrQs/IMG-20250112-001440.jpg",
    strengths: ["Organized", "Reliable", "Detail-oriented", "Practical", "Honest"],
    growthAreas: ["Flexibility", "Innovation", "Emotional expression", "Change adaptation", "Social skills"],
  },
  ISFJ: {
    name: "Defender",
    description:
      "ISFJ (Defender) is a personality type with the Introverted, Observant, Feeling, and Judging traits. These people tend to be warm and unassuming in their own steady way. They’re efficient and responsible, giving careful attention to practical details in their daily lives. Very dedicated and warm protectors, always ready to defend their loved ones.",
    image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c",
    strengths: ["Supportive", "Reliable", "Patient", "Detail-oriented", "Traditional"],
    growthAreas: ["Saying no", "Self-expression", "Change adaptation", "Taking risks", "Innovation"],
  },
  ESTJ: {
    name: "Executive",
    description:
      "ESTJ (Executive) is a personality type with the Extraverted, Observant, Thinking, and Judging traits. They possess great fortitude, emphatically following their own sensible judgment. They often serve as a stabilizing force among others, able to offer solid direction amid adversity. Excellent administrators, unsurpassed at managing things – or people.",
    image: "https://i.ibb.co/f1TpMNz/IMG-20250112-003124.jpg",
    strengths: ["Organization", "Leadership", "Dedication", "Directness", "Stability"],
    growthAreas: ["Flexibility", "Empathy", "Innovation", "Handling emotions", "Relaxation"],
  },
  ESFJ: {
    name: "Consul",
    description:
      "ESFJ (Consul) is a personality type with the Extraverted, Observant, Feeling, and Judging traits. They are attentive and people-focused, and they enjoy taking part in their social community. Their achievements are guided by decisive values, and they willingly offer guidance to others. Extraordinarily caring, social and popular people, always eager to help.",
    image: "https://i.ibb.co/r5ZpmxJ/IMG-20250112-003733.jpg",
    strengths: ["Popularity", "Practical help", "Loyalty", "Organization", "Leadership"],
    growthAreas: ["Innovation", "Self-care", "Taking criticism", "Inflexibility", "Worrying"],
  },
  ISTP: {
    name: "Virtuoso",
    description:
      "ISTP (Virtuoso) is a personality type with the Introverted, Observant, Thinking, and Prospecting traits. They tend to have an individualistic mindset, pursuing goals without needing much external connection. They engage in life with inquisitiveness and personal skill, varying their approach as needed. Bold and practical experimenters, masters of all kinds of tools.",
    image: "https://i.ibb.co/FVWvxzW/IMG-20250112-003955.jpg",
    strengths: ["Creativity", "Problem-solving", "Crisis management", "Adaptability", "Technical skills"],
    growthAreas: ["Emotional awareness", "Commitment", "Planning ahead", "Social skills", "Following rules"],
  },
  ISFP: {
    name: "Adventurer",
    description:
      "ISFP (Adventurer) is a personality type with the Introverted, Observant, Feeling, and Prospecting traits. They tend to have open minds, approaching life, new experiences, and people with grounded warmth. Their ability to stay in the moment helps them uncover exciting potentials. Flexible and charming artists, always ready to explore and experience something new.",
    image: "https://i.ibb.co/7J2kFLx/IMG-20250112-004232.jpg",
    strengths: ["Creativity", "Aesthetics", "Experimentation", "Charm", "Adaptability"],
    growthAreas: [
      "Long-term planning",
      "Career focus",
      "Dealing with criticism",
      "Taking initiative",
      "Self-discipline",
    ],
  },
  ESTP: {
    name: "Entrepreneur",
    description:
      "ESTP (Entrepreneur) is a personality type with the Extraverted, Observant, Thinking, and Prospecting traits. They tend to be energetic and action-oriented, deftly navigating whatever is in front of them. They love uncovering life’s opportunities, whether socializing with others or in more personal pursuits. Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    image: "https://i.ibb.co/0fmJzCz/IMG-20250112-004521.jpg",
    strengths: ["Risk-taking", "Perceptiveness", "Sociability", "Practicality", "Rationality"],
    growthAreas: ["Long-term planning", "Following rules", "Emotional awareness", "Commitment", "Organization"],
  },
  ESFP: {
    name: "Entertainer",
    description:
      "ESFP (Entertainer) is a personality type with the Extraverted, Observant, Feeling, and Prospecting traits. These people love vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They can be very social, often encouraging others into shared activities. Spontaneous, energetic and enthusiastic people – life is never boring around them.",
    image: "https://i.ibb.co/LZ9DrtY/IMG-20250112-004803.jpg",
    strengths: ["Showmanship", "Practicality", "Aesthetics", "Observation", "Originality"],
    growthAreas: ["Focus", "Planning", "Follow-through", "Organization", "Serious matters"],
  },
}

export function calculateType(answers: Record<string, number>): {
  type: string
  details: {
    mind: number
    energy: number
    nature: number
    tactics: number
    traits: {
      extraversion: number
      introversion: number
      sensing: number
      intuition: number
      thinking: number
      feeling: number
      judging: number
      perceiving: number
    }
  }
} {
  const scores = {
    mind: 0, // Extraversion (E) vs. Introversion (I)
    energy: 0, // Sensing (S) vs. Intuition (N)
    nature: 0, // Thinking (T) vs. Feeling (F)
    tactics: 0, // Judging (J) vs. Perceiving (P)
  }

  const questionCounts = {
    mind: questions.filter((q) => q.category === "mind").length,
    energy: questions.filter((q) => q.category === "energy").length,
    nature: questions.filter((q) => q.category === "nature").length,
    tactics: questions.filter((q) => q.category === "tactics").length,
  }

  questions.forEach((q) => {
    // skip if question wasn't answered
    if (!answers[q.id]) return

    // convert 1-7 scale to -3 to +3 range
    const score = answers[q.id] - 4
    scores[q.category as keyof typeof scores] += score
  })

  // normalize scores to -100 to 100 range accounting for unanswered questions
  Object.keys(scores).forEach((key) => {
    const category = key as keyof typeof scores
    const answeredQuestions = questions.filter((q) => q.category === category && answers[q.id]).length

    if (answeredQuestions > 0) {
      const maxPossibleScore = answeredQuestions * 3
      scores[category] = (scores[category] / maxPossibleScore) * 100
    }
  })

  const traits = {
    extraversion: Math.max(0, scores.mind),
    introversion: Math.max(0, -scores.mind),
    sensing: Math.max(0, scores.energy),
    intuition: Math.max(0, -scores.energy),
    thinking: Math.max(0, -scores.nature),
    feeling: Math.max(0, scores.nature),
    judging: Math.max(0, scores.tactics),
    perceiving: Math.max(0, -scores.tactics),
  }

  const type = [
    scores.mind > 0 ? "E" : "I", // Positive = Extraversion, Negative = Introversion
    scores.energy > 0 ? "S" : "N", // Positive = Sensing, Negative = Intuition
    scores.nature > 0 ? "F" : "T", // Positive = Feeling, Negative = Thinking
    scores.tactics > 0 ? "J" : "P", // Positive = Judging, Negative = Perceiving
  ].join("")

  return {
    type,
    details: {
      ...scores,
      traits,
    },
  }
}

