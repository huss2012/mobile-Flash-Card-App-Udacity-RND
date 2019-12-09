import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'


const ZeroCard = () => (
	<View style={styles.container}>
  <Text style={styles.styOfZeroCard}>This Deck has no cards in it, So Please go back and add cards then take a quiz.</Text>
  </View>
  )


const ViewDifferentSide = (props) => (
  <TouchableOpacity onPress={props.toggle} style={styles.buttonSty}>
  <View>
  {
    props.current === 'front'
    ? <Text style={{color: '#fff'}}>Show The Back Side</Text>
    : <Text style={{color: '#fff'}}>Show The Front Side</Text>
  }
  </View>
  </TouchableOpacity>
  )



const Result = (props) => (
 <View style={styles.cardSty}>
 <Text style={styles.resultTextSty}>THE QUIZ IS FINSHED!</Text>
 <Text style={styles.resultTextSty}>Number of Cards in that Deck are: {props.totalCards}</Text>
 <Text style={styles.resultTextSty}>The Correct Answers are: {props.correct}</Text>
 <Text style={styles.resultTextSty}>The Percentage: {(props.correct/props.totalCards)*100}%</Text>
 </View>
 )

 class Quiz extends Component {

   state = {
    currentCard: 0,
    correctAnsweres: 0, 
    complete: false,
    view: 'front'
  }



  changeView = () => {
   const {view} = this.state
   view === 'front' ? this.setState({view: 'back'}) : this.setState({view: 'front'})
 }


 	correct = () => {
 		this.setState({
      correctAnsweres: this.state.correctAnsweres+1,
      currentCard: this.state.currentCard + 1
    })
 
 		if (this.state.currentCard === (this.props.cards.length-1))
 		{
 			this.setState({
 				complete: true,
 			})
 		}
 	}


 	false = () => {
 		this.setState({
      currentCard: this.state.currentCard + 1
    })

   if (this.state.currentCard === (this.props.cards.length-1))
   {
    this.setState({
     complete: true
   })
  }
}


 	restartQuiz = () => {
 		this.setState({
      currentCard: 0,
      correctAnsweres: 0,
      view: 'front',
      complete: false
    })

 		clearLocalNotification()
    .then(setLocalNotification) 
  }

  render(){
    if(this.props.cards.length === 0){
     return <ZeroCard/>
   }
   return (
    <View style={styles.mainContainer}>
    {this.state.complete === false?
     <View>
     <Text style={styles.totalCardsSty}>Card number: {this.state.currentCard+1} / {this.props.cards.length}.</Text>
     <View style={styles.cardSty}>
     {this.state.view === 'front' ?
     <Text style={styles.cardTextSty}>{this.props.cards[this.state.currentCard].front}</Text>:
     <Text style={styles.cardTextSty}>{this.props.cards[this.state.currentCard].back}</Text>
   }
   <ViewDifferentSide
   toggle={this.changeView}
   current={this.state.view}
   />
   </View>
   <TextButton onPress={this.correct}> Correct </TextButton>
   <TextButton onPress={this.false}> false </TextButton>
   </View>:
   <View>
   <Result
   totalCards= {this.props.cards.length}
   correct= {this.state.correctAnsweres}
   />
   <TextButton onPress={this.restartQuiz}>Restart the Quiz</TextButton>
   <TextButton onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>Back to Deck View</TextButton>
   </View>
 }
 </View>

 )
 }

}

const styles = StyleSheet.create({
  mainContainer:{
  	backgroundColor: '#555',
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
 totalCardsSty:{
   color: '#fff', 
   fontWeight: 'bold',
   fontSize: 14,
   justifyContent: 'center',
   alignSelf: 'center'
 },

 styOfZeroCard:{
  padding: 10,
  paddingTop: 20,
  marginTop: 20,
  color: '#fff', 
  fontWeight: 'bold',
  fontSize: 18,
 flexDirection: 'row'
},

cardTextSty: {
  fontSize: 20,
  color: '#555',
  marginBottom: 5,
},
buttonSty:{
 backgroundColor: '#2f5',
 color: '#fff',
 fontWeight: 'bold',
 fontSize: 14,
 marginTop: 40,
 borderRadius: 20,
 padding: 20
},

resultTextSty:{
 fontSize: 16,
 paddingTop: 5,
 color: '#555'
},

cardSty: {
  backgroundColor: '#fff',
  height:"50%",
  alignSelf:'center',
  width: "90%",
  minWidth: "90%",
  marginTop: 20,
  marginBottom: 10,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  shadowOffset: { width: 5, height: 5 },
  shadowColor: 'gray',
  shadowRadius: 6,
  shadowOpacity: 1,
  elevation: 2
},
})
const mapStateToProps = (state, ownProps) => {
  return { 
    cards: state[ownProps.navigation.state.params.deck].cards 
  }
}

export default connect(mapStateToProps)(Quiz)