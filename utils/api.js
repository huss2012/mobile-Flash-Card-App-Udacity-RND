import { 
  MOBILEFLASHCARD_STORAGE_KEY, 
  generateUniId 
} from './helpers'

import { AsyncStorage } from "react-native"

export function fetchDeck(title) {
  return getDecks()
    .then((decks) => decks[title]);
}


export function insertCard(title, card) {
  return fetchAllDecks()
    .then((decks) => {
      decks[title].cards.push(card);
      AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify(decks));
    });
}


export const insertDeck = deckTitle => {
	const deckObject = {title:deckTitle, id:generateUniId(), cards:[] }
  return AsyncStorage.mergeItem(MOBILEFLASHCARD_STORAGE_KEY, JSON.stringify({ [deckTitle]:deckObject })
  )
}


export const fetchAllDecks = () => {
  return AsyncStorage.getItem(MOBILEFLASHCARD_STORAGE_KEY)
  .then(results => {
	const decks = JSON.parse(results)
	return decks
  })
}