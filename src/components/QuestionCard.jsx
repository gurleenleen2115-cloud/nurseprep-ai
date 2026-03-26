export default function QuestionCard({
  question,
  selectedChoice,
  onSelectChoice,
  onSubmit,
  showFeedback
}) {
  return (
    <section className="card">
      <p className="question-text">{question.question}</p>
      <div className="choices-grid">
        {question.choices.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => onSelectChoice(choice)}
            className={`choice-btn ${selectedChoice === choice ? 'selected' : ''}`}
            disabled={showFeedback}
          >
            {choice}
          </button>
        ))}
      </div>

      {!showFeedback && (
        <button type="button" className="primary-btn" onClick={onSubmit} disabled={!selectedChoice}>
          Submit Answer
        </button>
      )}
    </section>
  );
}
