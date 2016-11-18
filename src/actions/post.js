import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
import { Alert } from 'react-native'

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'

export function publishPost(post) {
  return function(dispatch, getState) {
    dispatch(requestPublish())
    post.uid = getState().auth.user.uid
    post.date = new Date().toJSON().slice(0,10)
    firebase.database().ref('post_list').push(post)
    .then((data) => {
      dispatch(publishSuccess())
    }, error => {
      dispatch(publishFailure(error))
      Alert.alert('Something went wrong while trying to publish')
    })
  }
}

export function requestPublish() {
  return {
    type: PUBLISH_REQUEST
  }
}

export function publishSuccess() {
  return {
    type: PUBLISH_SUCCESS
  }
}

export function publishFailure(message) {
  return {
    type: PUBLISH_FAILURE,
    error: message
  }
}

export const SEARCH_OWN_REQUEST = 'SEARCH_OWN_REQUEST'
export const SEARCH_OWN_SUCCESS = 'SEARCH_OWN_SUCCESS'
export const SEARCH_OWN_FAILURE = 'SEARCH_OWN_FAILURE'

export function getMyPosts() {
  return function(dispatch, getState) {
    dispatch(requestSearchOwn())
    const uid = getState().auth.user.uid
    const postList = firebase.database().ref('post_list').orderByChild('uid').equalTo(uid)
    postList.on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        items.push(Object.assign({}, child.val(), {_key: child.key}))
      })
      items.reverse()
      dispatch(searchOwnSuccess(items))
    }, error => {
      dispatch(searchOwnFailure(error))
    })
  }
}

export function requestSearchOwn() {
  return {
    type: SEARCH_OWN_REQUEST
  }
}

export function searchOwnSuccess(posts) {
  return {
    type: SEARCH_OWN_SUCCESS,
    posts
  }
}

export function searchOwnFailure(message) {
  return {
    type: SEARCH_OWN_FAILURE,
    error: message
  }
}

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const ALL_POSTS_FOUND = 'ALL_POSTS_FOUND'

export function getAllPosts() {
  return function(dispatch, getState) {
    dispatch(requestSearch())
      firebase.database().ref('post_list').on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        items.push(Object.assign({}, child.val(), {_key: child.key}))
      })
      dispatch(searchSuccess(items))
    }, error => {
      console.log(error)
      dispatch(searchFailure(error))
    })
  }
}

export function requestSearch() {
  return {
    type: SEARCH_REQUEST
  }
}

export function searchSuccess(posts) {
  return {
    type: SEARCH_SUCCESS,
    posts
  }
}

export function searchFailure(message) {
  return {
    type: SEARCH_FAILURE,
    error: message
  }
}
