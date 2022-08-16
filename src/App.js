import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/card/card.component";

let CARDS = [
  { content: "🔥", title: "El fueguito", matched: "false" },
  { content: "👍🏼", title: "El todobien", matched: "false" },
  { content: "💯", title: "El melo", matched: "false" },
  { content: "💰", title: "El bichote", matched: "false" },
  { content: "⏳", title: "El time", matched: "false" },
  { content: "😈", title: "El prendido", matched: "false" },
];

//Add property to check they are not clicking the same card

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
    if (!choiceOne) {
      setChoiceOne(card.content);
    } else if (!choiceTwo) {
      setChoiceTwo(card.content);
    }
  };

  // NEXT STEP: ASSIGN CHOICE FULL CARD, CHECK ID

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
      if (choiceOne === choiceTwo) {
        alert("Match");
        setCards((oldCards) => {
          return oldCards.map((c) => {
            if(c.content === choiceOne) {
              return {...c, matched: true}
            } else {
              return c
            }
          });
        });
        plusTurn();
      } else {
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
            <Card key={card.id} card={card} choiceHandler={handleChoice} 
           flipped={choiceOne === card.content || choiceTwo === card.content || card.matched === true} />
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
