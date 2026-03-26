import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { sampleQuestions } from '../data/questions';

export default function QuizPage() {
  const navigate = useNavigate();
  const questions = useMemo(() => sampleQuestions, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedChoice === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    if (!selectedChoice) return;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      const result = {
        score,
        total: questions.length,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('nurseprep:lastResult', JSON.stringify(result));
      navigate('/results', { state: result });
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedChoice('');
    setShowFeedback(false);
  };

  return (
    <main className="page">
      <section className="quiz-header card">
        <h2>Quiz</h2>
        <p>
          Question {currentIndex + 1} of {questions.length}
        </p>
        <p className="score-inline">Current score: {score}</p>
      </section>

      <QuestionCard
        question={currentQuestion}
        selectedChoice={selectedChoice}
        onSelectChoice={setSelectedChoice}
        onSubmit={handleSubmit}
        showFeedback={showFeedback}
      />

      {showFeedback && (
        <section className="card feedback">
          <h3>{isCorrect ? 'Correct ✅' : 'Not quite ❗'}</h3>
          <p>
            <strong>Correct answer:</strong> {currentQuestion.correctAnswer}
          </p>
          <p>
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </p>
          <button type="button" className="primary-btn" onClick={handleNext}>
            {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </section>
      )}

      <Link to="/" className="secondary-link">
        Back to Home
      </Link>
    </main>
  );
}
