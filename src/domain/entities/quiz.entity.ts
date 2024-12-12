export interface quizChapter {
  id: string;
  title: string;
  description: string;
  locked: boolean;
  icon_url: string;
  completed: boolean;
}
export interface answers {
  id: string;
  answer: string;
}

export interface quiz {
  id: string;
  question: string;
  answers: answers[];
  correctAnswerIndex: number;
}
