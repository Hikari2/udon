import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob

function makeBlob(source) {
  let rnfbURI = RNFetchBlob.wrap(source)
  return (
    Blob
    .build(rnfbURI, { type : 'image/png'})
    .then((blob) => {
      return blob
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while converting image')
    })
  )
}

function postImage(key, index, blob) {
  return (
    firebase.storage()
      .ref('posts')
      .child(key + '/' + index)
      .put(blob, { contentType : 'image/png' })
      .then((snapshot) => {
        blob.close()
        return snapshot.a.fullPath
      }, error => {
        console.log(error)
        Alert.alert('Something went wrong while trying to upload image')
      })
  )
}

function readImage(path) {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL().then((url) => {
      return {url}
    }, error => {
      console.log(error)
      Alert.alert('Something went wrong while trying to read image')
    })
}

function removeImage(path) {
  return firebase
    .storage()
    .ref(path)
    .delete().then(() => {
      return
    }, error => {
      console.log(error)
    })
}

export const PUBLISH_REQUEST = 'PUBLISH_REQUEST'
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
export const PUBLISH_FAILURE = 'PUBLISH_FAILURE'

export function publish(post) {
  return function(dispatch, getState) {
    dispatch(requestPublish())

    const key = firebase.database().ref('post_list').push().key
    post.photos = post.photos.filter((photo) => {
      return photo.url
    })

    let promises = post.photos.map((photo) => {
      return makeBlob(photo.url)
    })

    Promise.all(promises).then((blobs) => {
      promises = blobs.map((blob, index) => {
        return postImage(key, index, blob)
      })
      Promise.all(promises).then((paths) => {
        post.photos = paths
        const user = {
          displayName: getState().auth.user.displayName,
          email: getState().auth.user.email,
          photoURL: getState().auth.user.photoURL,
          uid: getState().auth.user.uid,
          fbuid: getState().auth.user.providerData[0].uid
        }

        post.user = user
        post.date = new Date().toJSON().slice(0,10)
        firebase.database().ref('post_list/' + key)
        .update(post)
        .then(() => dispatch(publishSuccess()))
      }, error => {
        dispatch(publishFailure(error))
        console.log(error)
        Alert.alert('Something went wrong while trying to publish')
      })

    })
  }
}

export function requestPublish() {
  return {
    type: PUBLISH_REQUEST
  }
}

export function publishSuccess() {
  Actions.pop()
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

export function update(post) {
  return function(dispatch, getState) {
    dispatch(requestUpdate())
    post.photos = post.photos.filter((photo) => {
      return photo.url
    })

    let promises = post.photos.map((photo) => {
      if(photo.modified) {
        return makeBlob(photo.url)
      }
    })

    Promise.all(promises).then((blobs) => {
      promises = post.photos.map((photo, index) => {
        if(photo.modified) {
          return postImage(post.key, index, blobs[index])
        }
      })

      Promise.all(promises).then((paths) => {
        paths.forEach((path, i) => {
          if(path) {
            post.photos[i] = path
          } else {
            post.photos[i] = post.photos[i].path
          }
        })

        const user = {
          displayName: getState().auth.user.displayName,
          email: getState().auth.user.email,
          photoURL: getState().auth.user.photoURL,
          uid: getState().auth.user.uid
        }

        post.user = user
        post.date = new Date().toJSON().slice(0,10)

        firebase.database().ref('post_list/' + post.key).update(post).then(() => {
          dispatch(updateSuccess())
        })
      }, error => {
        dispatch(updateFailure(error))
        console.log(error)
        Alert.alert('Something went wrong while trying to publish')
      })
    })
  }
}

export function requestUpdate() {
  return {
    type: UPDATE_REQUEST
  }
}

export function updateSuccess() {
  Actions.pop()
  Actions.pop()
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

export function searchOwn() {
  return function(dispatch, getState) {
    dispatch(requestSearchOwn())
    const uid = getState().auth.user.uid
    firebase.database().ref('post_list').orderByChild('user/uid').equalTo(uid).on('value', (snapshot) => {
      if (!snapshot.hasChildren()) {
        dispatch(searchOwnSuccess([]))
        return
      }

      let posts = []
      snapshot.forEach((child) => {
        if(!child.val().photos) {
          posts.push(Object.assign({}, child.val(), {photos: []}, {key: child.key}))
          dispatch(searchOwnSuccess(posts))
          return
        }

        const promises = child.val().photos.map((photo) => {
            return readImage(photo)
        })
        Promise.all(promises).then((photos) => {
          photos.forEach((photo, i) => {
            photos[i].path = child.val().photos[i]
          })
          posts.push(Object.assign({}, child.val(), {photos}, {key: child.key}))
          dispatch(searchOwnSuccess(posts))
        })
      })
    }, error => {
      dispatch(searchOwnFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to read own posts')
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
      if (!snapshot.hasChildren()) {
        dispatch(searchSuccess([]))
        return
      }

      let posts = []
      snapshot.forEach((child) => {
        if(filter(child.val(), filterValue)) {
          dispatch(searchSuccess(posts))
          return
        }

        if(!child.val().photos) {
          posts.push(Object.assign({}, child.val(), {photos: []}, {key: child.key}))
          dispatch(searchSuccess(posts))
          return
        }

        const promises = child.val().photos.map((photo) => {
            return readImage(photo)
        })
        Promise.all(promises).then((photos) => {
          photos.forEach((photo, i) => {
            photos[i].path = child.val().photos[i]
          })
          posts.push(Object.assign({}, child.val(), {photos}, {key: child.key}))
          dispatch(searchSuccess(posts))
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

function filter(values, filters) {
  if(filters.county && filters.county !== '' && filters.county !== values.county) {
    return true
  }
  if(filters.category && filters.category !== '' && filters.category !== values.category) {
    return true
  }

  if (filters.keyword) {
    const textA = values.heading.toLowerCase()
    const textB = filters.keyword.toLowerCase()
    if(filters.keyword !== '' && ! textA.includes(textB)){
      return true
    }
  }

  if(filters.petProfile) {
    switch(values.category) {
      case 'Cloth':
        return true
    }
  }

  return false
}

export const REMOVE_REQUEST = 'REMOVE_REQUEST'
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'REMOVE_FAILURE'

export function remove(post) {
  return function(dispatch) {
    dispatch(requestRemove())
    const key = post.key

    let promises = post.photos.map((photo) => {
      return removeImage(photo.path)
    })
    Promise.all(promises).then(() => {
      firebase.database().ref('post_list/' + key)
      .remove()
      .then(() => {
        dispatch(removeSuccess())
      })
    }, error => {
      dispatch(removeFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to remove')
    })
  }
}

export function requestRemove() {
  return {
    type: REMOVE_REQUEST
  }
}

export function removeSuccess() {
  Actions.pop()
  return {
    type: REMOVE_SUCCESS
  }
}

export function removeFailure(message) {
  return {
    type: REMOVE_FAILURE,
    error: message
  }
}
