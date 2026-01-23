import TopicClient from './topic-client';
import { topics } from '../../data/grade12';

type TopicPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return topics.map((topic) => ({ id: topic.id }));
}

export default function TopicPage({ params }: TopicPageProps) {
  return <TopicClient topicId={params.id} />;
}
