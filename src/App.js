import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/card/card.component";
import NewGameButton from "./components/NewGameButton/NewGameButton.component.jsx";
import MatchesCounter from "./components/MatchesCounter/MatchesCounter.component.jsx";
import TurnsCounter from "./components/TurnsCounter/TurnsCounter.component.jsx";
import TimeLeftToSeeCounter from "./components/TimeLeftToSeeCounter/TimeLeftToSeeCounter.component.jsx";

let CARDS = [
  { content: "🔥", title: "El fueguito", matched: false },
  { content: "👍🏼", title: "El todobien", matched: false },
  { content: "💯", title: "El melo", matched: false },
  { content: "💰", title: "El bichote", matched: false },
  { content: "⏳", title: "El time", matched: false },
  { content: "😈", title: "El prendido", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const cardShuffler = () => {
    let shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setMatched(0);
    setTurns(0);
  };

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [matched, setMatched] = useState(0);

  const [timeLeftToSee, setTimeLeftToSee] = useState(3);
  const [showTimeLeft, setShowTimeLeft] = useState(true);

  const [gameJustOpened, setGameJustOpened] = useState(true);

  const handleChoice = (card) => {
    if(!gameJustOpened) {
      if (!choiceOne && !card.matched) {
        setChoiceOne(card);
      } else if (!choiceOne && card.matched) {
        return;
      } else if (choiceOne && !choiceTwo && card === choiceOne) {
        return;
      } else if (!choiceTwo && card.id === choiceOne.id) {
        setChoiceOne(null);
        setChoiceTwo(null);
      } else if (!choiceTwo && !card.matched) {
        setChoiceTwo(card);
      }
    }
  };

  const plusTurn = () => {
    setTurns((turns) => turns + 1);
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
    }, 500);
  };

  const showCounter = () => {
    const timeLeftToSeeInterval = setInterval(() => {
      setTimeLeftToSee((state) => state - 0.5);
    }, 500);
    setTimeout(() => {
      clearInterval(timeLeftToSeeInterval);
      setTimeLeftToSee(3);
    }, 3000);
  };

  useEffect(() => {
    cardShuffler();
    setShowTimeLeft(true);
    setTimeout(() => {
      setGameJustOpened(false);
      setShowTimeLeft(false);
    }, 3000);
    showCounter();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.content === choiceTwo.content &&
        choiceOne.id != choiceTwo.id
      ) {
        setMatched((oldAmount) => oldAmount + 1);
        setCards((oldCards) => {
          return oldCards.map((c) => {
            if (c.content === choiceOne.content) {
              return { ...c, matched: true };
            } else {
              return c;
            }
          });
        });
        plusTurn();
      } //else if (choiceOne.content === choiceTwo.content && choiceOne.id === choiceTwo.id ){
      //return
      //}
      else {
        plusTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  const newGameStarter = () => {
    cardShuffler();
    showCounter();
    setGameJustOpened(true);
    setShowTimeLeft(true);
    setTimeout(() => {
      setShowTimeLeft(false);
      setGameJustOpened(false);
    }, 3000);
  };

  return (
    <main className="game">
      <h1>React Card Game</h1>
      <TurnsCounter turns={turns} />
      <TimeLeftToSeeCounter time={showTimeLeft ? timeLeftToSee : "😈"} />
      <section className="game__cards">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              choiceHandler={handleChoice}
              flipped={
                card === choiceOne ||
                card === choiceTwo ||
                card.matched ||
                gameJustOpened
              }
            />
          );
        })}
      </section>
      <MatchesCounter TotalCards={CARDS.length} matched={matched} />
      <NewGameButton newGameStarter={newGameStarter} />
    </main>
  );
}

export default App;
