import React, { Component } from 'react'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import Home from './containers/Home'
import UserPage from './containers/UserPage'
import SideMenuDrawer from './containers/SideMenuDrawer'
import * as firebase from 'firebase'
import Drawer from 'react-native-drawer'
import SideMenu from './components/SideMenu'
import TabView from './containers/TabView'

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
            selector={props=>props.isAuthenticated ? 'userSpace' : 'loginPage'}>
            <Scene key='loginPage' component={LoginPage} title='Login Page' />
            <Scene key='userSpace'>
              <Scene key='userPage' component={UserPage} title='User Page' />
              <Scene key='userPage' component={UserPage} title='User Page' />
              <Scene key='tabs' tabs={true} initial={true}>
                <Scene key='home' title='Home' component={TabView}>
                </Scene>
                <Scene key='groups' title='Groups' component={TabView}>
                </Scene>
                <Scene key='search' title='Search' component={TabView}>
                </Scene>
              </Scene>
              <Scene key='drawer' component={SideMenuDrawer} open={false} >
                <Scene key="main" tabs={true}>
                  <Scene
                      key="tab2"
                      title="Tab #2"
                      navigationBarStyle={{ backgroundColor: 'green' }}
                      titleStyle={{ color: 'white' }}
                      component={SideMenu}
                    />
                    <Scene
                        key="tab1"
                        title="Tab #1"
                        navigationBarStyle={{ backgroundColor: 'red' }}
                        titleStyle={{ color: 'white' }}
                        component={SideMenu}
                      />
                </Scene>
              </Scene>
              </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}
