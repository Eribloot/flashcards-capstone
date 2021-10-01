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
          <Route exact path="/" render ={() => <Home />} />
          <Route path="/decks/new" render = {() => <CreateDeck />} />
          <Route exact path="/decks/:deckId" render ={() => <Deck />} />
          <Route path="/decks/:deckId/study" render = {() => <Study />} />
          <Route path="/decks/:deckId/edit" render ={() => <EditDeck />} />
          <Route path="/decks/:deckId/cards/new" render ={() => <AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" render ={() => <EditCard />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
