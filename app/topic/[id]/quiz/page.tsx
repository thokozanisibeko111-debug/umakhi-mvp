'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation?: string;
}

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [topicId]);

  async function fetchQuestions() {
    // get quizzes for this topic
    const { data: quizzes } = await supabase.from('quizzes').select('id').eq('topic_id', topicId).limit(1);
    if (quizzes && quizzes.length > 0) {
      const quizId = quizzes[0].id;
      const { data, error } = await supabase.from('questions').select('*').eq('quiz_id', quizId);
      if (!error && data) {
        setQuestions(data as Question[]);
      }
    }
  }

  function handleAnswer(option: string) {
    setSelected(option);
  }

  function handleSubmit() {
    if (selected) {
      const currentQuestion = questions[current];
      if (selected === currentQuestion.correct_option) {
        setScore((prev) => prev + 1);
      }
      setShowExplanation(true);
    }
  }

  function nextQuestion() {
    setShowExplanation(false);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  }

  if (questions.length === 0) {
    return (
      <main>
        <p>No quiz available for this topic.</p>
      </main>
    );
  }

  if (finished) {
    return (
      <main>
        <h2>Quiz completed</h2>
        <p>
          Your score: {score} / {questions.length}
        </p>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main>
      <h2>Quiz</h2>
      <p>
        Question {current + 1} of {questions.length}
      </p>
      <p>{q.question}</p>
      <div>
        {(['A', 'B', 'C', 'D'] as Array<'A' | 'B' | 'C' | 'D'>).map((option) => {
          const text = q[`option_${option.toLowerCase()}` as keyof Question] as string;
          return (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selected === option}
                  onChange={() => handleAnswer(option)}
                />
                {option}. {text}
              </label>
            </div>
          );
        })}
      </div>
      {!showExplanation && (
        <button onClick={handleSubmit} disabled={!selected}>
          Submit
        </button>
      )}
      {showExplanation && (
        <div>
          {selected === q.correct_option ? (
            <p style={{ color: 'green' }}>Correct!</p>
          ) : (
            <p style={{ color: 'red' }}>
              Incorrect. The correct answer is {q.correct_option}.
            </p>
          )}
          {q.explanation && <p>Explanation: {q.explanation}</p>}
          <button onClick={nextQuestion}>Next question</button>
        </div>
      )}
    </main>
  );
}
