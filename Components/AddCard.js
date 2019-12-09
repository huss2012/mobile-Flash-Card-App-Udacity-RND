import React, {Component} from 'react'
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'
import { addCard } from "../actions";
import { insertCard } from "../utils/api";
import TextButton from './TextButton'

AddCardButton = ({ onPress }) => {
    return (
        <TextButton onPress={onPress}> Add Card </TextButton>
        )
    }



    class AddCard extends Component {

        state= {
           front: 'Front',
           back: 'Back',
           frontValid:true,
           backValid: true
       }

       submit = () => {

           const {front, back} = this.state

           
           if(front.length > 8 && back.length > 3){
              const cardObject = {
                 front,
                 back
             }
		
		const deckTitle = this.props.navigation.state.params.deck
		insertCard(deckTitle, cardObject)
		this.props.addCard(deckTitle, cardObject)
		this.setState(() => ({
         front: '',
         back:''
     }))
       this.props.navigation.navigate('SingleDeck', { deck: deckTitle })
   }
   else {
      if(front.length <= 8){
         this.setState({ frontValid: false})
     }
     if(back.length <= 3){
         this.setState({ backValid: false})
     }
 }
}


render(){
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Ionicons name="ios-photos" size={70} color={'#fff'} />
        <View style={styles.label}>
            <Text style={{fontSize: 22, color: '#fff', fontWeight:'bold'}}>
             Enter a Card Details
            </Text>
        </View>
    {!this.state.frontValid && <Text style={styles.error}>The Front Card has to be valid!</Text>}
        <View style={styles.input}>
            <TextInput
                value={this.state.front}
                onChangeText={(front) => this.setState({front})}
                onFocus={() => this.setState({ front: '', frontValid: true })}
            />
        </View>
    {!this.state.backValid && <Text style={styles.error}>The Back Card has to be valid!</Text>}
        <View style={styles.input}>    
            <TextInput
                value={this.state.back}
                onChangeText={(back) => this.setState({back})}
                onFocus={() => this.setState({ back: '', backValid: true })}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <AddCardButton onPress={this.submit} />
        </View>
    </KeyboardAvoidingView>

     )
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
},
label: {
    paddingBottom: 30,
},
input: {
    height: 40,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#222',
    borderWidth: 1,
    fontSize: 18,
    width: "90%"
},
error:{
   color: '#f00',
   fontWeight: 'bold',
   textAlign: 'center',
   fontSize: 18
}
});


const mapDispatchToProps = dispatch => ({
  addCard: (deckTitle,card) => dispatch(addCard(deckTitle,card))
})

export default connect(null, mapDispatchToProps)(AddCard)