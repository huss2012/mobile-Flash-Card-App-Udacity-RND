export const GET_DECKS = 'GET_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'


import {fetchAllDecks} from '../utils/api'


export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
} 

export const addDeck = (deck) => {
    return {
    type: ADD_DECK,
    deck
  }
}


export const getAllDecks = () => dispatch => {
  fetchAllDecks().then(decks =>
      dispatch({
          type: GET_DECKS,
          decks  
      })
  ) 
}