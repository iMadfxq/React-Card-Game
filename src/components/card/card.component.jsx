import "./card.styles.scss";

export default function Card({ card, choiceHandler, flipped }) {
  let handleClick = () => {
    choiceHandler(card);
  };
  return (
    <div
      onClick={handleClick}
      className="game__cards--cover"
    >
      <div className={flipped ? "game__cards--item fliped" : "game__cards--item"}>
        <span>{card.content}</span>
        <p>{card.title}</p>
      </div>
    </div>
  );
}
