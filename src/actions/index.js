import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'

const firebaseConfig = {
  apiKey: 'AIzaSyBJnKZC6H8KwuZG5gneiMypsH7GkxCcZ5o',
  authDomain: 'udon-653b4.firebaseapp.com',
  databaseURL: 'https://udon-653b4.firebaseio.com',
  storageBucket: 'udon-653b4.appspot.com',
  messagingSenderId: '855868493860'
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

function responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    console.log('Error fetching data: ' + JSON.stringify(error, null, 2));
  } else {
    console.log('Success fetching data: ' + JSON.stringify(result, null, 2));
  }
}

export function getFaceBookGraph() {
  const infoRequest = new GraphRequest(
    '/me?fields=location',
    ///106505586052951?fields=location
    null,
    responseInfoCallback,
  )
  return function(dispatch, getState) {
    new GraphRequestManager().addRequest(infoRequest).start()
  }
}

export function getUserLocation() {

}
