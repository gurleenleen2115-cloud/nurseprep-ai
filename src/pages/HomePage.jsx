import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="page">
      <section className="card hero">
        <h1>NursePrep AI</h1>
        <p>
          Practice NCLEX-style questions with instant rationales. Build confidence one question at a
          time.
        </p>
        <Link to="/quiz" className="primary-btn link-btn">
          Start Quiz
        </Link>
      </section>
    </main>
  );
}
