import "./TimeLeftToSeeCounter.styles.scss";

export default function TimeLeftToSeeCounter({ time }) {
  return (
    <section className={time === "😈" ? "game__TimeLeftToSee hide" : "game__TimeLeftToSee"}>
      <p>Time left to see the cards: </p>
      <p className="game__TimeLeftToSee--counter">{parseFloat(time)}s</p>
    </section>
  );
}
