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
