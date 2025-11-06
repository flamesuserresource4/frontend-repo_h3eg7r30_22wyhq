import Hero from './Hero';
import QuizArrangeScored from './QuizArrangeScored';

export default function HomeContent({ user, onScore }) {
  return (
    <div>
      <Hero />

      <section className="py-8">
        <QuizArrangeScored user={user} onScore={onScore} />
      </section>
    </div>
  );
}
