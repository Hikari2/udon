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
import Home from './containers/Home'
import UserPage from './containers/UserPage'
import SideMenuDrawer from './components/SideMenuDrawer'
import * as firebase from 'firebase'
import Drawer from 'react-native-drawer'

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
            selector={props=>props.isAuthenticated ? 'drawer' : 'loginPage'}>
            <Scene key='loginPage' component={LoginPage} title=' ' />
            <Scene key='drawer' component={SideMenuDrawer} open={false} initial>
                <Scene key='modal' component={Modal}>
                  <Scene
                    key='home'
                    title='Home'
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={{ color: '#000000' }}
                    component={Home}
                  />
                  <Scene
                    key='groups'
                    title='Groups'
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={{ color: '#000000' }}
                    component={UserPage}
                  />
              </Scene>
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
