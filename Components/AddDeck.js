import React, {Component} from 'react'
import {Ionicons} from '@expo/vector-icons'
import { insertDeck } from "../utils/api"
import {generateUniId} from '../utils/helpers'
import { addDeck } from "../actions"
import {connect} from 'react-redux'
import TextButton from './TextButton'
import { 
    StyleSheet, 
    TextInput, 
    KeyboardAvoidingView, 
    View, 
    Text,
} from 'react-native'


AddDeckButton = ({ onPress }) => {
    return (
        <TextButton onPress={onPress}> Add Deck </TextButton>
        )
    }



class AddDeck extends Component {

    state= {
        titleOfADeck: '',
       isValid:true
   }

   submit = () => {
       
       if(this.state.titleOfADeck.length > 3){
          insertDeck(this.state.titleOfADeck)
          const deckObject = {
             [this.state.titleOfADeck]:{
                 id: generateUniId(),
                 title: this.state.titleOfADeck,
                 cards: []
             }
         }
         this.props.addDeck(deckObject)
         this.props.navigation.navigate('AddCard', {deck:this.state.titleOfADeck})
         this.setState(() => ({
            titleOfADeck: ''
         }))
     }
     else{
      this.setState({isValid:false})
    }

    }


    render(){
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <Ionicons name="ios-apps" size={70} color={'#fff'} />
        <View style={styles.text}>
        <Text style={{fontSize: 22, color: '#fff', fontWeight:'bold'}}>
        Enter a Name of Your New Deck
        </Text>
        </View>
        {!this.state.isValid && <Text style={styles.errorSty}>Please Enter A Valid Name of the Deck!!</Text>}
        <View style={styles.inputFeild}>
        <TextInput
        value={this.state.titleOfADeck}
        onChangeText={(titleOfADeck) => this.setState({titleOfADeck})}
        onFocus={() => this.setState({ titleOfADeck: '', isValid: true })}
        />
        </View>
        <View style={{ marginTop: 10 }}>
        <AddDeckButton onPress={this.submit}/>
        </View>
        </KeyboardAvoidingView>

        )
    }

}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
    },

    errorSty:{
        color: '#f00',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    text: {
        paddingBottom: 30,
    },

    inputFeild: {
        height: 40,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#222',
        borderWidth: 1,
        fontSize: 18,
        width: "90%"
    },

});


const mapDispatchToProps = dispatch => ({
addDeck: (deck) => dispatch(addDeck(deck))
})

export default connect(null, mapDispatchToProps)(AddDeck)