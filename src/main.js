import React, { Component } from 'react'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import MainContainer from './containers/MainContainer'
import NewPetView from './containers/NewPetView'
import EditPetView from './containers/EditPetView'
import ViewPetView from './containers/ViewPetView'
import NewPostView from './containers/NewPostView'
import EditPostView from './containers/EditPostView'
import ViewPostView from './containers/ViewPostView'

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
            <Scene key='loginPage' component={LoginPage} hideNavBar title=' ' />
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
              <Scene
                key='editPet'
                component={EditPetView}
              />
              <Scene
                key='viewPet'
                component={ViewPetView}
              />
              <Scene
                key='newPost'
                component={NewPostView}
              />
              <Scene
                key='editPost'
                component={EditPostView}
              />
              <Scene
                key='viewPost'
                component={ViewPostView}
              />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}
