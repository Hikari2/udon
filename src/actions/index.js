import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken} from 'react-native-fbsdk'

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGGED_OUT = 'LOGGED_OUT'

const firebaseConfig = {
  apiKey: 'AIzaSyBJnKZC6H8KwuZG5gneiMypsH7GkxCcZ5o',
  authDomain: 'udon-653b4.firebaseapp.com',
  databaseURL: 'https://udon-653b4.firebaseio.com',
  storageBucket: 'udon-653b4.appspot.com',
  messagingSenderId: '855868493860'
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = firebase.auth.FacebookAuthProvider

export function checkLogin() {
  return function(dispatch, getState) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(userAuthenticated(user))
      } else {
        console.log('No user!!!!')
      }
    })
  }
}

export function loginFaceBook() {
  return function(dispatch, getState) {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      loginResult => {
        if (loginResult.isCancelled) {
            dispatch(loginFailure('user canceled'))
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken)
              return auth.signInWithCredential(credential)
          })
          .then(credData => {
              dispatch(loginSuccess(credData))
          })
          .catch(err => {
              dispatch(loginFailure(err))
          })
        }
    },
    error => {
      dispatch(loginFailure(error.toString()))
    })
  }
}

export function logout() {
  return function(dispatch, getState) {
    firebase.auth().signOut().then(() => {
        //LoginManager.logOut()
        dispatch(logoutSuccess())
    }, () => {
      console.log('Something went wrong')
    })
  }
}

export function userAuthenticated(user) {
  return {
    type: USER_AUTHENTICATED,
    isAuthenticated: true,
    user
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    user
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    isAuthenticated: false,
    message
  }
}

export function logoutSuccess() {
  return {
    type: LOGGED_OUT
  }
}
