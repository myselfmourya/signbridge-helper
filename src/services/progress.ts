export type UserProgressType = {
  overallScore: number;
  totalSigns: number;
  practiceSessions: number;
  achievements: number;
  categories: {
    Alphabets: { current: number; total: number };
    Numbers: { current: number; total: number };
    'Common Words': { current: number; total: number };
    Phrases: { current: number; total: number };
  };
  recentActivities: Array<{ id: number; title: string; date: string; score: number }>;
  masteredLessons: string[];
};

const defaultProgress: UserProgressType = {
  overallScore: 0,
  totalSigns: 63,
  practiceSessions: 0,
  achievements: 0,
  categories: {
    Alphabets: { current: 0, total: 26 },
    Numbers: { current: 0, total: 10 },
    'Common Words': { current: 0, total: 22 },
    Phrases: { current: 0, total: 5 }
  },
  recentActivities: [],
  masteredLessons: []
};

export const getProgress = (): UserProgressType => {
  try {
    const saved = localStorage.getItem('signbridge_progress');
    if (saved) {
       const parsed = JSON.parse(saved);
       // Ensure arrays exist
       if (!parsed.masteredLessons) parsed.masteredLessons = [];
       if (!parsed.recentActivities) parsed.recentActivities = [];
       // Normalize category keys to match Learning Center
       if (parsed.categories?.alphabet) {
           parsed.categories = defaultProgress.categories; // Wipe legacy category names from MyProgress mock
       }
       return parsed;
    }
  } catch(e) {
    console.error(e);
  }
  return defaultProgress;
};

export const saveProgress = (progress: UserProgressType) => {
  localStorage.setItem('signbridge_progress', JSON.stringify(progress));
};

export const markLessonAsMastered = (lessonId: string, category: 'Alphabets' | 'Numbers' | 'Common Words' | 'Phrases', title: string) => {
  const current = getProgress();
  
  if (current.masteredLessons.includes(lessonId)) {
     return current; // already mastered
  }

  // Update mastery
  current.masteredLessons.push(lessonId);
  current.overallScore += 1;
  current.categories[category].current += 1;
  
  // Every 5 lessons mastered = 1 achievement badge roughly
  current.achievements = Math.floor(current.overallScore / 5);

  // Add to recent activity
  current.recentActivities.unshift({
     id: Date.now(),
     title: `Mastered: ${title}`,
     date: 'Just now',
     score: 100
  });

  // Keep only top 10 activities to avoid bloat
  if (current.recentActivities.length > 10) {
      current.recentActivities = current.recentActivities.slice(0, 10);
  }

  saveProgress(current);
  return current;
};

export const addPracticeSession = () => {
   const current = getProgress();
   current.practiceSessions += 1;
   saveProgress(current);
   return current;
};
