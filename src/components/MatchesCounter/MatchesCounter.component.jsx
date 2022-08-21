export default function MatchesCounter({matched, TotalCards}) {
  return (
    <p>
      Total cards matched: {matched} / {TotalCards}
    </p>
  );
}
