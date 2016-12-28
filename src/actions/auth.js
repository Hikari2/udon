import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGGED_OUT = 'LOGGED_OUT'

const auth = firebase.auth()
const provider = firebase.auth.FacebookAuthProvider

export function loginFaceBook() {
  return function(dispatch) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_website']).then(
      loginResult => {
        if (loginResult.isCancelled) {
          Alert.alert('user canceled')
          dispatch(loginFailure('user canceled'))
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken)
              return auth.signInWithCredential(credential)
          })
          .then(credData => {
            storeUser(credData, 'facebook')
            dispatch(loginSuccess(credData))
          })
        }
    },
    error => {
      Alert.alert('Something went wrong while trying to login2')
    })
  }
}


function storeUser(user, provider) {
  const userList = firebase.database().ref('user_list/'+ provider + '/' + user.providerData[0].uid)
  const userData = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  }
  userList.set(userData)
  .then(() => {
  }, error => {
    Alert.alert('Something went wrong while trying to store user data')
  })
}

export function logout() {
  return function(dispatch, getState) {
    auth.signOut().then(() => {
        LoginManager.logOut()
        dispatch(logoutSuccess())
    }, () => {
    })
  }
}

export function checkLogin() {
  return function(dispatch, getState) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(userAuthenticated(user))
      } else {

      }
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
