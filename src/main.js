import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch, Modal } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import MainContainer from './containers/MainContainer'
import NewPetView from './containers/NewPetView'

let store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class udon extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'
            component={connect(state=>({isAuthenticated:state.auth.isAuthenticated}))(Switch)}
            tabs={true}
            unmountScenes
            selector={props=>props.isAuthenticated ? 'main' : 'loginPage'}>
            <Scene key='loginPage' component={LoginPage} title=' ' />
            <Scene key='main'>
              <Scene
                key='mainContainer'
                hideNavBar
                component={MainContainer}
              />
              <Scene
                key='newPet'
                component={NewPetView}
              />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
