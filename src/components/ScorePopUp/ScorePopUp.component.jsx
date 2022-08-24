import NewGameButton from "../NewGameButton/NewGameButton.component";
import "./ScorePopUp.styles.scss";

const score = (t, m) => {
  switch (true) {
    case m / t == 1:
      return "Perfect 🏆";
    case m / t < 1 && m / t >= 0.8:
      return "Very good 💯";
    case m / t < 0.8 && m / t >= 0.6:
      return "Good 👍🏼";
    case m / t < 0.6:
      return "Improvable 📈";
    default:
      break;
  }
};

const closeWrapper = (e) => {
  if (e.target.className === "game__ScorePopUp--wrapper show") {
    e.stopPropagation();
    e.target.className = "game__ScorePopUp--wrapper";
  }
}

export default function ScorePopUp({ turns, matched, newGameStarter }) {
  let scoreWord = score(turns, matched);

  let scoreColor;

  switch (scoreWord) {
    case "Perfect 🏆":
      scoreColor = "#0000BD";
      break;
    case "Very good 💯":
      scoreColor = "#77C747";
      break;
    case "Good 👍🏼":
      scoreColor = "#B7F62C";
      break;
    case "Improvable 📈":
      scoreColor = "#FF7800";
      break;

    default:
      break;
  }

  return (
    <section
      className={
        matched == 6
          ? "game__ScorePopUp--wrapper show"
          : "game__ScorePopUp--wrapper"
      }
      onClick={closeWrapper}
    >
      <section className="game__ScorePopUp">
        <h2>
          Your score is: <span style={{ color: scoreColor }}>{scoreWord}</span>
        </h2>
        <ul>
          <li>Total turns: {turns}</li>
          <li>Total matches: {matched}</li>
        </ul>
        <NewGameButton newGameStarter={newGameStarter} />
      </section>
    </section>
  );
}
