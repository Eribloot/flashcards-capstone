import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);

        setCard(deckInfo.cards.find((card) => card.id + "" === cardId));
        setFront(deckInfo.cards.find((card) => card.id + "" === cardId).front);
        setBack(deckInfo.cards.find((card) => card.id + "" === cardId).back);
      } catch (error) {
        console.log(error);
      }
    }

    loadInfo();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedCard = {
      ...card,
      front,
      back,
    };
    updateCard(editedCard).then((response) => {
      setCard(response);
      history.push(`/decks/${deckId}`);
    });
  };

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Page
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Card</h2>
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

export default EditCard;
