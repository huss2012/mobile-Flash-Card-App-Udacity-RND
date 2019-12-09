import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import Deck from './Deck'
import {getAllDecks} from '../actions'
import {connect} from 'react-redux'


class Decks extends Component{

  componentDidMount () {
     getAllDecks()
   }

   navigateToSingleDeck = (deck) => {
     this.props.navigation.navigate('SingleDeck', { deck });
   }

   render() {
    	if(Object.keys(this.props.decks).length === 0){
    		return (
          <View style={styles.welcomeContainer}>
            <Text style={[styles.font, {color: '#173'}]}>Wlecome to the Flash Card App!</Text>
          <Text style={[styles.font, {color: '#000'}]}>Start by adding decks</Text>
          </View>
          )
     }
     else{
      return(
        <FlatList 
        style={styles.container}
        data={Object.values(this.props.decks)}
        renderItem={({ item }) => (
          <Deck 
          deck={item}
          navigateToSingleDeck={this.navigateToSingleDeck} 
          />
          )}
        keyExtractor= {item => item.id}
        />)
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignSelf: 'stretch',
    paddingTop: 60,
    paddingBottom: 60,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {
    fontSize: 27.5,

  }

})

const mapStateToProps = (state) => {
  return { decks: state }
}


export default connect(mapStateToProps)(Decks)
