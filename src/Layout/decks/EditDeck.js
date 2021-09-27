import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const history = useHistory();
  const deckObj = { name: "", description: "" };
  const [deck, setDeck] = useState(deckObj);
  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(getDeckFromAPI);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDeck = {
      ...deck,
      name,
      description,
    };
    updateDeck(currentDeck).then((response) => {
      setDeck(response);
      history.push(`/decks/${deckId}`);
    });
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
              <a href={`decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Deck</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name-change"
              value={deck.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="textarea"
              className="form-control"
              id="description-change"
              rows="3"
              value={deck.description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditDeck;
