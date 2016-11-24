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
      return {
        path: url,
        key
      }
    }, error => {
      Alert.alert('Something went wrong while trying to read image')
    })
}
function updateImage(key, name, path) {
  let rnfbURI = RNFetchBlob.wrap(path)
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

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

export function updatePost(post) {
  return function(dispatch, getState) {
    dispatch(requestUpdate())
    const photos = post.photos.filter((photo) => {return photo.path !== undefined})
    post = {
      uid: getState().auth.user.uid,
      date: new Date().toJSON().slice(0,10),
      ...post,
      photos: photos.length
    }

    firebase.database().ref('post_list/' + post.key).update(post).then(() => {
      const promises = photos.map((photo, index) => {
        return updateImage(photo.key, index, photo.path)
      })
      Promise.all(promises).then(() => {
        dispatch(updateSuccess())
      })
    }, error => {
      dispatch(updateFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to publish')
    })
  }
}

export function requestUpdate() {
  return {
    type: UPDATE_REQUEST
  }
}

export function updateSuccess() {
  return {
    type: UPDATE_SUCCESS
  }
}

export function updateFailure(message) {
  return {
    type: UPDATE_FAILURE,
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
    firebase.database().ref('post_list').orderByChild('uid').equalTo(uid).on('value', (snapshot) => {
      if(!snapshot.val() || getState().post.isPublishing) {
        dispatch(searchOwnSuccess([]))
      } else {
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
      }
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

export function getPosts(filterValue) {
  return function(dispatch, getState) {
    dispatch(requestSearch())
    firebase.database().ref('post_list').on('value', (snapshot) => {
      if(!snapshot.val() || getState().post.isPublishing) {
        dispatch(searchSuccess([]))
      } else {
        var items = []
        snapshot.forEach((child) => {
          if(filter(child.val(), filterValue)) {
            dispatch(searchSuccess(items))
            return
          } else {
            const key = child.key
            const photos = new Array(child.val().photos)
            photos.fill(1)
            const promises = photos.map((item, index) => {
                return readImage(key, index)
            })
            Promise.all(promises).then((result) => {
              items.push(Object.assign({}, child.val(), {photos: result}, {key: child.key}))
              items.reverse()
              dispatch(searchSuccess(items))
            })
          }
        })
      }
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

function filter(values, filters) {
  if(filters.county !== '' && filters.county !== values.county) {
    return true
  }
  if(filters.category !== '' && filters.category !== values.category) {
    return true
  }
  if(filters.keyword !== '' && !values.heading.includes(filters.keyword)){
    return true
  }

  if(filters.petProfile) {
    switch(values.category) {
      case 'Cloth':
        return true
    }
  }

  return false
}
