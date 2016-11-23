import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Alert } from 'react-native'

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'

const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob

function postImage(key, name, imagePath) {
  let rnfbURI = RNFetchBlob.wrap(imagePath)
  return Blob
    .build(rnfbURI, { type : 'image/png'})
    .then((blob) => {
      firebase.storage()
        .ref('posts')
        .child(key + '/' + name)
        .put(blob, { contentType : 'image/png' }).then(() => blob.close())
    }, error => {
      Alert.alert('Something went wrong while trying to upload image')
    })
}


function readImage(key, name) {
  return firebase
    .storage()
    .ref('posts')
    .child(key + '/' + name)
    .getDownloadURL().then((url) => {
      return url
    }, error => {
      Alert.alert('Something went wrong while trying to read image')
    })
}

export function publishPost(post) {
  return function(dispatch, getState) {
    dispatch(requestPublish())
    const photos = post.photos.filter((photo) => {return photo.path !== undefined})
    post = {
      uid: getState().auth.user.uid,
      date: new Date().toJSON().slice(0,10),
      ...post,
      photos: photos.length
    }
    const key = firebase.database().ref('post_list').push().key
    const promises = photos.map((photo, index) => {
      return postImage(key, index, photo.path)
    })
    Promise.all(promises).then(() => {
      firebase.database().ref('post_list/' + key).update(post).then(()=>{
        dispatch(publishSuccess())
      })
    }, error => {
      dispatch(publishFailure(error))
      console.log(error)
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
    postList.on('value', (snapshot) => {
      if(!snapshot.val())
        dispatch(searchOwnSuccess([]))
      var items = []
      snapshot.forEach((child) => {
        const key = child.key
        const photos = new Array(child.val().photos)
        photos.fill(1)
        const promises = photos.map((item, index) => {
            return readImage(key, index)
        })

        Promise.all(promises).then((result) => {
          items.push(Object.assign({}, child.val(), {photos: result}, {key: child.key}))
          items.reverse()
          dispatch(searchOwnSuccess(items))
        })
      })
    }, error => {
      console.log(error)
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
  return function(dispatch) {
    dispatch(requestSearch())
    firebase.database().ref('post_list').on('value', (snapshot) => {
      if(!snapshot.val())
        dispatch(searchSuccess([]))
      var items = []
      snapshot.forEach((child) => {
        const key = child.key
        const photos = new Array(child.val().photos)
        photos.fill(1)
        const promises = photos.map((item, index) => {
            return readImage(key, index)
        })
        Promise.all(promises).then((result) => {
          items.push(Object.assign({}, child.val(), {photos: result}, {_key: child.key}))
          items.reverse()
          dispatch(searchSuccess(items))
        })
      })
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
