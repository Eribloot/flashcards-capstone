import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("Front side of card");
  const [back, setBack] = useState("Back side of card");

  useEffect(() => {
    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId);
      setDeck(getDeckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      front: front,
      back: back,
      deckId: deckId,
    };
    async function updateCard() {
      await createCard(deckId, card);
    }
    updateCard();

    setFront("front side of card");
    setBack("back side of card");

    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/">{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <CardForm
          front={front}
          back={back}
          handleSubmit={handleSubmit}
          setFront={setFront}
          setBack={setBack}
        />
      </div>
    </>
  );
}

export default AddCard;
