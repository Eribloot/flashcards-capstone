import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeck() {
  const history = useHistory();
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

      <div>
        <form>
          <div className="form-group">
            <label className="name">Name</label>
            <input type="name" id="name" name="name" placeholder="Deck Name" />
          </div>
          <div className="form-group">
            <label className="description">Description</label>
            <textarea
              type="textarea"
              rows="3"
              id="description"
              name="description"
              placeholder="Brief description of deck"
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
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

export default CreateDeck;
