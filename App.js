import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Decks from './Components/Decks'
import AddDeck from './Components/AddDeck'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import decks from './reducers'
import Constants from 'expo-constants'
import AddCard from './Components/AddCard'
import SingleDeck from './Components/SingleDeck'
import Quiz from './Components/Quiz'


AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}


const Tabs = createAppContainer(createBottomTabNavigator({
   Decks: {
     screen: Decks,
     navigationOptions: {
       tabBarLabel: 'Decks',
       tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />
     },
   },
   AddDeck: {
     screen: AddDeck,
     navigationOptions: {
       tabBarLabel: 'Add Deck',
       tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
     },
   },
 }, {
   navigationOptions: {
     header: null
   },
   tabBarOptions: {
     activeTintColor: Platform.OS === 'ios' ? '#000' : '#fff',
     style: {
       height: 56,
       backgroundColor: Platform.OS === 'ios' ? '#fff' : '#000',
       shadowColor: 'rgba(0, 0, 0, 0.24)',
       shadowOffset: {
         width: 0,
         height: 3
       },
       shadowRadius: 6,
       shadowOpacity: 1
     }
   }
 }))

const navigationOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: '#555',
  }
}

const MainNavigator = createAppContainer(createStackNavigator({
    home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions
    },
    SingleDeck: {
      screen: SingleDeck,
      navigationOptions
    },
    Quiz: {
      screen: Quiz,
      navigationOptions
    }
}))

export default class App extends React.Component{
  render(){
    return (
      <Provider store={createStore(decks, {}, applyMiddleware(ReduxThunk))}>
        <View style={{flex:1}}>
            <AppStatusBar backgroundColor={'#555'} barStyle='light-content'/>
            <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
