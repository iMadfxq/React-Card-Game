import "./card.styles.scss";

export default function Card({ card, choiceHandler }) {
  let handleClick = () => {
    choiceHandler(card);
  };
  return (
    <div onClick={handleClick}>
      <span>{card.content}</span>
      <p>{card.title}</p>
    </div>
  );
}
