import QuizClient from './quiz-client';
import { topics } from '../../../data/grade12';

type QuizPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return topics.map((topic) => ({ id: topic.id }));
}

export default function QuizPage({ params }: QuizPageProps) {
  return <QuizClient topicId={params.id} />;
}
