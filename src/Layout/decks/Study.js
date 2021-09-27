import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardList from "../cards/CardList";

function Study() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  if (deck)
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item-active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>Study: {deck.name}</h1>
        </div>
        <CardList cards={deck.cards} />
      </div>
    );
  else return <p>Loading...</p>;
}

export default Study;
