import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true 
});

export interface LessonRecommendation {
  title: string;
  description: string;
}

export const getRecommendations = async (errorHistory: string[]): Promise<LessonRecommendation[]> => {
  if (errorHistory.length === 0) {
    return [
      { title: "Alphabet Refresher", description: "Start your day by reviewing the A-Z signs." },
      { title: "Essential Greetings", description: "Practice common phrases to start conversations." }
    ];
  }

  try {
    const prompt = `The user is learning Indian Sign Language. They recently struggled with recognizing or performing these signs: ${errorHistory.join(', ')}. 
    Please suggest exactly 2 specific practice lessons they should focus on. Keep it very short, encouraging.
    You MUST return ONLY a valid JSON array matching this format:
    [{"title": "Lesson Title", "description": "Short description"}]`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });
    
    // Parse JSON safely from output
    const textOutput = ('text' in response.content[0]) ? response.content[0].text : '';
    const jsonMatch = textOutput.match(/\[[^]*\]/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid output format");
  } catch (err) {
    console.warn("AI Recommendation Fallback:", err);
    return [
      { title: "Practice Mode", description: "Keep practicing your recent tricky signs to build muscle memory." },
      { title: "Slow & Steady", description: "Focus on form over speed for complex gestures." }
    ];
  }
};

export const translateText = async (text: string, targetLangCode: string): Promise<string> => {
  if (targetLangCode.startsWith('en')) return text;
  
  const langMap: Record<string, string> = {
    'hi-IN': 'Hindi',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu'
  };
  const targetLanguage = langMap[targetLangCode] || 'Hindi';

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [{ role: "user", content: `Translate this text to ${targetLanguage}. Return ONLY the translated text, nothing else: "${text}"` }],
      temperature: 0.1,
    });
    
    if ('text' in response.content[0]) {
       return response.content[0].text;
    }
    return text;
  } catch (err) {
    console.warn("Translation Fallback Error:", err);
    return text;
  }
};
