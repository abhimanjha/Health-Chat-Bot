export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface HealthTopic {
  keywords: string[];
  responses: string[];
  followUp?: string;
}

const topics: HealthTopic[] = [
  {
    keywords: ["anxiety", "anxious", "nervous", "panic", "worry", "stressed", "stress", "overwhelmed"],
    responses: [
      "I hear you — anxiety can feel really overwhelming. A few things that can help right now:\n\n• **Box breathing**: Inhale 4s → hold 4s → exhale 4s → hold 4s. Repeat 4 times.\n• **5-4-3-2-1 grounding**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.\n• **Progressive muscle relaxation**: Tense each muscle group for 5s, then release.\n\nHow long have you been feeling this way?",
      "Stress and anxiety are your body's alarm system going off — but we can work with that. On a scale of 1–10, how would you rate your anxiety right now?\n\nSome immediate relief strategies:\n• Step outside for even 5 minutes of fresh air\n• Cold water on your wrists and face\n• Write down exactly what's worrying you — externalizing thoughts reduces their power.",
    ],
    followUp: "What's been the biggest source of stress for you lately?",
  },
  {
    keywords: ["depressed", "depression", "sad", "hopeless", "empty", "worthless", "no motivation", "unmotivated"],
    responses: [
      "Thank you for sharing that with me. Feeling depressed is genuinely hard, and you're not alone in this.\n\nA few gentle things that can help:\n• **Behavioral activation**: Even small actions (a 10-min walk, making your bed) can shift your mood chemistry.\n• **Sunlight**: 20–30 minutes of morning sunlight helps regulate serotonin and melatonin.\n• **Connection**: Reaching out to even one person today can help.\n\nHave you been able to talk to anyone about how you're feeling?",
      "I'm glad you reached out. Depression can make everything feel heavier — including asking for help.\n\nToday, try just one small kind act for yourself:\n• Eat something nourishing\n• Take a shower\n• Go outside for 10 minutes\n\nProgress isn't linear. What's one thing, however small, that's brought you any comfort recently?",
    ],
    followUp: "Are you getting any professional support at the moment?",
  },
  {
    keywords: ["sleep", "insomnia", "tired", "fatigue", "exhausted", "can't sleep", "wake up", "nightmare"],
    responses: [
      "Sleep issues are incredibly common and deeply affect everything else. Here's what the research says works:\n\n**Sleep hygiene essentials:**\n• Same wake time every day (even weekends) — this anchors your circadian rhythm\n• No screens 60 minutes before bed (blue light blocks melatonin)\n• Keep your room at 65–68°F / 18–20°C\n• No caffeine after 2 PM\n\nHow many hours are you typically sleeping?",
      "Poor sleep creates a vicious cycle. Let's break it.\n\n**Tonight, try:**\n• 4-7-8 breathing to fall asleep (inhale 4s, hold 7s, exhale 8s)\n• Write tomorrow's to-do list before bed (offloads mental load)\n• Keep your bed for sleep only — no scrolling or working in bed\n\nIs your sleep issue more about falling asleep, or staying asleep?",
    ],
    followUp: "What time do you usually go to bed and wake up?",
  },
  {
    keywords: ["diet", "nutrition", "eating", "food", "weight", "meal", "calories", "healthy eating"],
    responses: [
      "Nutrition is one of the most powerful tools for mental and physical health. Here's a practical framework:\n\n**The 80/20 rule**: Eat nutritiously 80% of the time, enjoy flexibility 20%.\n\n**Brain-boosting foods:**\n• Omega-3s (salmon, walnuts, flaxseed)\n• Leafy greens (spinach, kale)\n• Berries (antioxidants)\n• Fermented foods (gut-brain connection)\n\nWhat does a typical day of eating look like for you?",
      "A balanced plate for mental wellbeing:\n• **½ plate**: Colorful vegetables\n• **¼ plate**: Lean protein (fish, legumes, eggs)\n• **¼ plate**: Complex carbs (quinoa, brown rice, oats)\n\n**Hydration tip**: Even mild dehydration affects mood and cognition. Aim for 8 cups of water daily.\n\nAre you trying to address any specific nutritional goals?",
    ],
    followUp: "Are there any specific dietary challenges you're facing?",
  },
  {
    keywords: ["exercise", "workout", "fitness", "gym", "running", "walk", "active", "sedentary", "physical activity"],
    responses: [
      "Exercise is one of the most evidence-backed mood boosters — it releases endorphins, BDNF (brain fertilizer), and reduces cortisol.\n\n**The minimum effective dose:**\n• 150 minutes of moderate exercise per week\n• Or 75 minutes of vigorous exercise\n• Strength training 2× per week\n\nEven a **20-minute walk** can reduce anxiety by 40% within the hour.\n\nWhat's your current activity level like?",
      "Starting is always the hardest part. Here's a beginner-friendly plan:\n\n**Week 1–2**: Walk 20 minutes, 3× a week\n**Week 3–4**: Add 5 minutes or increase frequency\n\nBest exercises for mental health:\n1. Running / brisk walking (rhythmic, meditative)\n2. Yoga (combines movement + breathing)\n3. Strength training (builds confidence)\n4. Swimming (full body, joint-friendly)\n\nWhat type of exercise do you enjoy, or have you tried?",
    ],
    followUp: "Do you have any physical limitations I should know about?",
  },
  {
    keywords: ["headache", "migraine", "pain", "ache", "hurt", "sore"],
    responses: [
      "Physical pain can significantly affect your mental wellbeing too. For headaches:\n\n**Immediate relief:**\n• Drink 1–2 glasses of water (dehydration is a top cause)\n• Apply a cold pack to your forehead or warm compress to neck\n• Dark, quiet room for 15–20 minutes\n• Gentle neck stretches\n\n**Trigger tracking**: Common triggers include: stress, poor sleep, skipped meals, screen time, caffeine changes.\n\nHow often do you experience headaches?",
    ],
    followUp: "On a scale of 1–10, how severe is the pain?",
  },
  {
    keywords: ["heart", "blood pressure", "hypertension", "cholesterol", "cardiovascular"],
    responses: [
      "Cardiovascular health is foundational. Key lifestyle factors:\n\n**Blood pressure management:**\n• DASH diet (fruits, vegetables, whole grains, low sodium)\n• Regular aerobic exercise\n• Reduce alcohol and sodium\n• Stress management (chronic stress raises BP)\n\n**Heart-healthy numbers to know:**\n• BP: Under 120/80 mmHg\n• Resting HR: 60–100 bpm\n• LDL cholesterol: Under 100 mg/dL\n\nWhen did you last have a cardiovascular checkup?",
    ],
    followUp: "Are you currently on any medications for heart health?",
  },
  {
    keywords: ["diabetes", "blood sugar", "glucose", "insulin"],
    responses: [
      "Managing blood sugar is crucial for overall health. Key strategies:\n\n**Dietary:**\n• Eat low-glycemic foods (legumes, vegetables, whole grains)\n• Pair carbs with protein or fat to slow glucose spikes\n• Avoid sugary drinks\n\n**Lifestyle:**\n• Exercise lowers blood sugar for up to 24 hours\n• Sleep deprivation raises blood sugar — prioritize 7–9 hours\n• Stress management (cortisol raises glucose)\n\n**Monitor:** If you have diabetes, regular glucose monitoring is essential.\n\nHave you been formally diagnosed, or are you trying to prevent it?",
    ],
    followUp: "Do you work with a doctor or dietitian for your blood sugar management?",
  },
  {
    keywords: ["breath", "breathing", "lung", "asthma", "shortness of breath", "respiratory"],
    responses: [
      "Breathing exercises are incredibly powerful for both physical and mental health.\n\n**Diaphragmatic breathing (belly breathing):**\n1. Place one hand on your chest, one on your belly\n2. Breathe in through your nose — belly should rise, chest stays still\n3. Exhale slowly through pursed lips\n4. Practice 5–10 minutes daily\n\nThis activates your parasympathetic nervous system, reducing stress and improving lung function.\n\nAre you experiencing any breathing difficulties, or looking to improve your lung capacity?",
    ],
    followUp: "Do you have any respiratory conditions like asthma?",
  },
  {
    keywords: ["meditation", "mindfulness", "zen", "calm", "relax", "peace"],
    responses: [
      "Mindfulness and meditation are evidence-backed for reducing stress, anxiety, and even physical pain.\n\n**Getting started (5 minutes):**\n1. Sit comfortably, close your eyes\n2. Focus on your breath — the sensation at your nostrils\n3. When your mind wanders (it will), gently bring it back\n4. No judgment — noticing the wandering IS the practice\n\n**Apps to try**: Headspace, Calm, Insight Timer (free)\n\nEven 5 minutes daily for 8 weeks shows measurable changes in brain structure.\n\nHave you tried meditation before?",
    ],
    followUp: "What's your biggest challenge when trying to meditate?",
  },
  {
    keywords: ["lonely", "loneliness", "isolated", "alone", "no friends", "social"],
    responses: [
      "Loneliness is one of the most significant health risks — affecting both mental and physical health. You're not alone in feeling alone.\n\n**Building connection:**\n• Start small: a text, a smile at a neighbor, joining one online community\n• Volunteer work (helps others + builds community)\n• Classes or groups around your interests\n• Apps like Meetup for local events\n\nResearch shows that even brief, positive social interactions reduce cortisol.\n\nWhat does your social world look like right now?",
    ],
    followUp: "Is there someone in your life you feel comfortable reaching out to?",
  },
  {
    keywords: ["angry", "anger", "frustrated", "irritable", "rage", "furious"],
    responses: [
      "Anger is a valid emotion — it's a signal that something feels unjust or threatening. The key is channeling it constructively.\n\n**In the moment:**\n• Take 10 deep breaths before responding\n• Physical movement releases the adrenaline (walk, exercise)\n• STOP technique: Stop, Take a breath, Observe your feelings, Proceed mindfully\n\n**Longer term:**\n• Journaling to identify anger triggers\n• CBT techniques to challenge thought patterns\n• Regular exercise as a release valve\n\nWhat's been triggering your anger lately?",
    ],
    followUp: "Is this anger affecting your relationships or daily life?",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "start"],
    responses: [
      "Hello! I'm your AI Health Companion 🌿 I'm here to support your mental and physical wellbeing.\n\nI can help you with:\n• 🧠 Mental health (anxiety, stress, depression, mood)\n• 😴 Sleep optimization\n• 🏃 Exercise and fitness\n• 🥗 Nutrition and diet\n• 🫀 Physical health concerns\n• 🧘 Mindfulness and relaxation\n\nWhat's on your mind today? Feel free to share anything — this is a safe space.",
      "Hi there! Great to see you. I'm your personal health AI assistant.\n\nHow are you feeling today — physically and emotionally? Sometimes just putting it into words is the first step toward feeling better.",
    ],
  },
  {
    keywords: ["thank", "thanks", "helpful", "great", "awesome", "amazing"],
    responses: [
      "You're very welcome! I'm glad I could help. Remember, taking time to care for your health — mental and physical — is one of the most important things you can do.\n\nIs there anything else on your mind?",
      "Happy to be here for you! Small steps forward are still steps forward. Is there another health topic you'd like to explore?",
    ],
  },
  {
    keywords: ["symptom", "symptoms", "sick", "ill", "fever", "nausea", "vomit", "diarrhea", "cold", "flu"],
    responses: [
      "I can offer general health guidance, but I want to be clear — I'm not a replacement for medical advice. For any concerning symptoms, please consult a healthcare provider.\n\n**General wellness for illness:**\n• Rest is your body's repair mode — prioritize sleep\n• Stay hydrated (water, clear broths, electrolytes)\n• Eat light, easily digestible foods\n• Monitor your temperature\n\n⚠️ **Seek immediate care** if you have: difficulty breathing, chest pain, confusion, high fever (above 103°F / 39.4°C), or severe symptoms.\n\nWhat symptoms are you experiencing?",
    ],
    followUp: "How long have you been feeling this way?",
  },
];

const generalResponses = [
  "That's an important health topic. Could you tell me more about what you're experiencing? The more context you share, the better I can help.",
  "I want to make sure I give you the most helpful response. Can you tell me a bit more about what's going on?",
  "Thank you for reaching out. Your health matters. Can you describe what you're going through in more detail?",
  "I'm here to help with your health journey. Could you share more about what you're experiencing or what you'd like support with?",
  "Health is holistic — body and mind are deeply connected. What's been on your mind or body lately that you'd like to explore?",
];

function findBestTopic(userMessage: string): HealthTopic | null {
  const lower = userMessage.toLowerCase();
  let bestTopic: HealthTopic | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestScore > 0 ? bestTopic : null;
}

let lastFollowUp: string | null = null;

export function getHealthAIResponse(userMessage: string): string {
  const topic = findBestTopic(userMessage);

  if (topic) {
    const responsePool = topic.responses;
    const response = responsePool[Math.floor(Math.random() * responsePool.length)];
    lastFollowUp = topic.followUp ?? null;
    return response;
  }

  if (lastFollowUp) {
    const followUp = lastFollowUp;
    lastFollowUp = null;
    const contextResponses = [
      `Thanks for sharing that. ${followUp ? "To dive a bit deeper — " + followUp : "What else would you like to explore about your health?"} `,
      `I appreciate you opening up. ${followUp ? followUp : "What other aspects of your health are you thinking about?"}`,
    ];
    return contextResponses[Math.floor(Math.random() * contextResponses.length)];
  }

  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

export function createMessage(role: "user" | "assistant", content: string): Message {
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
    role,
    content,
    timestamp: new Date(),
  };
}

export const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your AI Health Companion 🌿\n\nI'm here to support your mental and physical wellbeing. You can talk to me about:\n• Stress, anxiety, and mood\n• Sleep and energy\n• Nutrition and fitness\n• Physical symptoms\n• Mindfulness and relaxation\n\nHow are you feeling today?",
  timestamp: new Date(),
};
