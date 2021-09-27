import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import NotFound from "./NotFound";

import Study from "./decks/Study";

import CreateDeck from "./decks/CreateDeck";
import EditDeck from "./decks/EditDeck";
import Deck from "./decks/Deck";

import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
