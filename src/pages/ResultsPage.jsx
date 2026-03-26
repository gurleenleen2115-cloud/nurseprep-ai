import { Link, useLocation } from 'react-router-dom';

function getStoredResult() {
  const raw = localStorage.getItem('nurseprep:lastResult');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const location = useLocation();
  const result = location.state || getStoredResult();

  return (
    <main className="page">
      <section className="card hero">
        <h2>Results</h2>
        {result ? (
          <>
            <p className="result-score">
              You scored <strong>{result.score}</strong> out of <strong>{result.total}</strong>.
            </p>
            <p>
              {result.score === result.total
                ? 'Perfect score! Great work.'
                : 'Keep practicing. Review rationales and try again.'}
            </p>
            <p className="timestamp">
              Last completed: {new Date(result.completedAt).toLocaleString()}
            </p>
          </>
        ) : (
          <p>No quiz results found yet. Start a quiz to see your score.</p>
        )}

        <div className="actions">
          <Link to="/quiz" className="primary-btn link-btn">
            Take Quiz Again
          </Link>
          <Link to="/" className="secondary-link">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
