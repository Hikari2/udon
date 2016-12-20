import React, { Component } from 'react'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch, Modal } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import MainContainer from './containers/MainContainer'
import NewPetView from './containers/NewPetView'
import EditPetView from './containers/EditPetView'
import EditPostView from './containers/EditPostView'
import PostDetailView from './containers/PostDetailView'

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
                key='editPost'
                component={EditPostView}
              />
              <Scene
                key='postDetail'
                component={PostDetailView}
              />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}
