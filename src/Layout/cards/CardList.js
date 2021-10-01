import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function CardList({ cards, deck }) {
  const history = useHistory();
  const { deckId } = useParams();

  const [currentCard, setCurrentCard] = useState(0);
  const [frontFace, setFrontFace] = useState(true);

  const handleLastCard = () => {
    const response = window.confirm(
      "Restart cards? click cancel to return to Home."
    );

    if (response) setCurrentCard(0);
    else history.push("/");
  };

  const handleNextCard = () => {
    if (currentCard + 1 === cards.length) {
      handleLastCard();
      return;
    }

    setCurrentCard(currentCard + 1);
    setFrontFace(() => !frontFace);
  };

  const handleFlip = () => {
    setFrontFace(() => !frontFace);
  };
  if (!cards) return null;

  if (cards.length > 2)
    return (
      <ul className="deck-cards">
        {cards && (
          <li>
            <div className="card" key={cards[currentCard].id}>
              <div className="card-body">
                <h5 className="card-title">
                  Card {currentCard + 1} of {cards.length}
                </h5>
                <p className="card-text">
                  {frontFace
                    ? cards[currentCard].front
                    : cards[currentCard].back}
                </p>
                <button className="btn btn-secondary" onClick={handleFlip}>
                  Flip
                </button>
                {frontFace ? null : (
                  <button className="btn btn-primary" onClick={handleNextCard}>
                    Next Card
                  </button>
                )}
              </div>
            </div>
          </li>
        )}
      </ul>
    );
  else
    return (
      <div>
        <h3>Not enough cards!</h3>
        <p>
          You need at least three cards to study a deck. There are{" "}
          {cards ? cards.length : 0} card(s) in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-3">
          Add Cards
        </Link>
      </div>
    );
}

export default CardList;
