import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/card/card.component";

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

    setTurns(0);
  };

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {
    if (!choiceOne && !card.matched) {
      setChoiceOne(card);
    } else if (!choiceOne && card.matched ) {
      return;
    } else if((choiceOne && !choiceTwo) && card === choiceOne) {
      return
    } else if (!choiceTwo && card.id === choiceOne.id) {
      setChoiceOne(null);
      setChoiceTwo(null);
    } else if (!choiceTwo && !card.matched) {
      setChoiceTwo(card);
    }
  };

  const plusTurn = () => {
    setTurns((turns) => turns + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    cardShuffler();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.content === choiceTwo.content &&
        choiceOne.id != choiceTwo.id
      ) {
        alert("Match");
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
        alert("No Match");
        plusTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <main className="game">
      <section className="game__cards">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              choiceHandler={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          );
        })}
      </section>
      <section className="game__turnCounter">
        <p>{turns}</p>
      </section>
      <section className="game__restarter">
        <button onClick={cardShuffler}>New game</button>
      </section>
    </main>
  );
}

export default App;
