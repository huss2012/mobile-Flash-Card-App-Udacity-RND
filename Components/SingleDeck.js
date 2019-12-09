import React, {Component} from 'react'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import {
  View,
  Text, 
  StyleSheet
} from 'react-native'



class SingleDeck extends Component {
	moveTo = (screen) => {
		this.props.navigation.navigate(screen, { deck: this.props.deck.title })
	}
	render(){
		const {deck} = this.props
		return(
      <View style={styles.mainContainer}>
      <View style={styles.theCard}>
      <Text style={styles.titleOfTheDeck}>{deck.title}</Text>
      <Text style={styles.numberOfCardsSty}>Number of Cards: {deck.cards.length}</Text>
      </View>
      <TextButton onPress={() => this.moveTo('Quiz')}>Take a Quiz on {deck.title} Deck</TextButton>
      <TextButton onPress={() => this.moveTo('AddCard')}>Add Cards in {deck.title} Deck</TextButton>
      </View>
      )
	}
}

const styles = StyleSheet.create({
  mainContainer:{
  	backgroundColor: "#555",
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberOfCardsSty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0ff'  
  },

  titleOfTheDeck: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center'
  },

  theCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "50%",
    width: "90%",
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'gray',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 2
  },
})


const mapStateToProps = (state, ownProps) => {
  return { deck: state[ownProps.navigation.state.params.deck] }
}

export default connect(mapStateToProps)(SingleDeck)