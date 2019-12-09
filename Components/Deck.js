import React, {Component} from 'react'
import {
  StyleSheet, 
  LayoutAnimation,
  TouchableOpacity, 
  View, 
  Text,
} from 'react-native'



class Deck extends Component {
  
  state = {
    widthOfTheDeck: 100,
    heightOfTheDeck: 100,
  }

 
    _onPress = () => {
    LayoutAnimation.spring();
    this.setState({widthOfTheDeck: this.state.widthOfTheDeck + 15, heightOfTheDeck: this.state.heightOfTheDeck + 15})
    this.props.navigateToSingleDeck(this.props.deck.title)
  }

  render() {
    return (
      <View>
        <View style={[{width: this.state.widthOfTheDeck, height: this.state.heightOfTheDeck}]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.container}>
            <Text style={styles.titleOfCard}>{this.props.deck.title}</Text>
            <Text style={styles.numberOfCardsSty}>Total Number of Cards: {this.props.deck.cards.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
    }
  }


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex:1,
      alignSelf:'center',
      width: "90%",
      marginBottom: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    
    numberOfCardsSty: {
      color: '#259',
      fontSize: 18
    },

    titleOfCard: {
      fontSize: 20,
      color: '#921',
      marginBottom: 5,
    },
  })

  export default Deck