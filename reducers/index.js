import {
  ADD_CARD, 
  ADD_DECK, 
  GET_DECKS,
} from '../actions';

export default function decks(state = {}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      const updatedDeck = state[action.deck];
      updatedDeck.cards.push(action.card);
      return {
        ...state,
        [action.deck]: updatedDeck
      }
      case GET_DECKS:
      return action.decks
    default:
      return state;
  }
}