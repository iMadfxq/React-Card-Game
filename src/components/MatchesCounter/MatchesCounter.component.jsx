import './MatchesCounter.styles.scss'

export default function MatchesCounter({matched, TotalCards}) {
  return (
    <p className="game__MatchesCounter">
      Total cards matched: {matched} / {TotalCards}
    </p>
  );
}
