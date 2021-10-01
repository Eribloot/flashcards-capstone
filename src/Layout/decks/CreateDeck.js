import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({  name: "", description: "" });

  const handleChange=(event)=>{
    setDeck({...deck, [event.target.name]: event.target.value })
}

const handleSubmit = (event) => {
  event.preventDefault();
  async function create()
  {
    const newDeck = await createDeck(deck);

    return newDeck;
  }
  create()
  .then(response => history.push(`/decks/${response.id}`))
}

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <h3>Create Deck</h3>
      <div>
        <form>
          <div className="form-group">
            <label className="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange}
              value={deck.name}
              style={{ width: "100%" }}
            />
          </div>
          <div className="form-group">
            <label className="description">Description</label>
            <textarea
              name="description"
              id="description"
              type="textarea"
              rows="3"
              placeholder="Brief description of deck"
              onChange={handleChange}
              value={deck.description}
              style={{ width: "100%" }}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateDeck;