import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

export const REGISTER_PET_REQUEST = 'REGISTER_PET_REQUEST'
export const REGISTER_PET_SUCCESS = 'REGISTER_PET_SUCCESS'
export const REGISTER_PET_FAILURE = 'REGISTER_PET_FAILURE'

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
    })
  )
}

function postImage(key, blob) {
  return (
    firebase.storage()
      .ref('pets')
      .child(key)
      .put(blob, { contentType : 'image/png' })
      .then((snapshot) => {
        blob.close()
        return snapshot.a.fullPath
      }, error => {
        console.log(error)
      })
  )
}

function readImage(path) {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL().then((url) => {
      return url
    }, error => {
      console.log(error)
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

export function register(pet) {
  return function(dispatch, getState) {
    dispatch(requestRegister())
    const key = firebase.database().ref('pet_list').push().key
    if (pet.photo) {
      makeBlob(pet.photo).then((blob) => {
        postImage(key, blob).then((path) => {
          pet.photo = {path}
          pet.uid = getState().auth.user.uid
          firebase.database().ref('pet_list/' + key)
          .update(pet)
          .then(() => {
            dispatch(registerSuccess())
          }, error => {
            dispatch(registerFailure(error))
            console.log(error)
            Alert.alert('Something went wrong while trying to register')
          })
        })
      })
    } else {
      pet.uid = getState().auth.user.uid
      firebase.database().ref('pet_list/' + key)
      .update(pet)
      .then(() => {
        dispatch(registerSuccess())
      }, error => {
        dispatch(registerFailure(error))
        console.log(error)
        Alert.alert('Something went wrong while trying to register')
      })
    }
  }
}

export function requestRegister() {
  return {
    type: REGISTER_PET_REQUEST
  }
}

export function registerSuccess() {
  Actions.pop()
  return {
    type: REGISTER_PET_SUCCESS
  }
}

export function registerFailure(message) {
  return {
    type: REGISTER_PET_FAILURE,
    error: message
  }
}

export const SEARCH_PETS_REQUEST = 'SEARCH_PETS_REQUEST'
export const SEARCH_PETS_SUCCESS = 'SEARCH_PETS_SUCCESS'
export const SEARCH_PETS_FAILURE = 'SEARCH_PETS_FAILURE'

export function getMyPets() {
  return function(dispatch, getState) {
    dispatch(requestSearchPets())
    const uid = getState().auth.user.uid
    firebase.database().ref('pet_list').orderByChild('uid').equalTo(uid).on('value', (snapshot) => {
      if (!snapshot.hasChildren()) {
        dispatch(searchPetsSuccess([]))
        return
      }

      let pets = []
      snapshot.forEach((child) => {
        if(!child.val().photo) {
          pets.push(Object.assign({}, child.val(), {key: child.key}))
          dispatch(searchPetsSuccess(pets))
          return
        }

        readImage(child.val().photo.path).then((url) => {
          pets.push(Object.assign({}, child.val(), {photo: {path: child.val().photo.path, url}}, {key: child.key}))
          dispatch(searchPetsSuccess(pets))
        })

      })
    }, error => {
      dispatch(searchPetsFailure(error))
      console.log(error)
      Alert.alert('Something went wrong while trying to read own pets')
    })
  }
}

export function requestSearchPets() {
  return {
    type: SEARCH_PETS_REQUEST
  }
}

export function searchPetsSuccess(pets) {
  return {
    type: SEARCH_PETS_SUCCESS,
    myPets: pets
  }
}

export function searchPetsFailure(message) {
  return {
    type: SEARCH_PETS_FAILURE,
    error: message
  }
}

export const UPDATE_PET_REQUEST = 'UPDATE_PET_REQUEST'
export const UPDATE_PET_SUCCESS = 'UPDATE_PET_SUCCESS'
export const UPDATE_PET_FAILURE = 'UPDATE_PET_FAILURE'

export function update(pet) {
  return function(dispatch, getState) {
    dispatch(requestUpdate())
    const key = pet.key
    if (pet.photo.modified) {
      makeBlob(pet.photo.url).then((blob) => {
        postImage(key, blob).then((path) => {
          pet.photo = {path}
          pet.uid = getState().auth.user.uid
          firebase.database().ref('pet_list/' + key)
          .update(pet)
          .then(() => {
            dispatch(updateSuccess())
          }, error => {
            dispatch(updateFailure(error))
            console.log(error)
            Alert.alert('Something went wrong while trying to update')
          })
        })
      })
    } else {
      pet.photo = pet.photo.path ? {path: pet.photo.path} : {}
      pet.uid = getState().auth.user.uid
      firebase.database().ref('pet_list/' + key)
      .update(pet)
      .then(() => {
        dispatch(updateSuccess())
      }, error => {
        dispatch(updateFailure(error))
        console.log(error)
        Alert.alert('Something went wrong while trying to update')
      })
    }
  }
}

export function requestUpdate() {
  return {
    type: UPDATE_PET_REQUEST
  }
}

export function updateSuccess() {
  Actions.pop()
  Actions.pop()
  return {
    type: UPDATE_PET_SUCCESS
  }
}

export function updateFailure(message) {
  return {
    type: UPDATE_PET_FAILURE,
    error: message
  }
}

export const REMOVE_PET_REQUEST = 'REMOVE_PET_REQUEST'
export const REMOVE_PET_SUCCESS = 'REMOVE_PET_SUCCESS'
export const REMOVE_PET_FAILURE = 'REMOVE_PET_FAILURE'

export function remove(pet) {
  return function(dispatch) {
    dispatch(requestRemove())
    const key = pet.key
    if (pet.photo) {
      removeImage(pet.photo.path).then(() => {
        firebase.database().ref('pet_list/' + key)
        .remove()
        .then(() => {
          dispatch(removeSuccess())
        }, error => {
          dispatch(removeFailure(error))
          console.log(error)
          Alert.alert('Something went wrong while trying to remove')
        })
      })
    } else {
      firebase.database().ref('pet_list/' + key)
      .remove()
      .then(() => {
        dispatch(removeSuccess())
      }, error => {
        dispatch(removeFailure(error))
        console.log(error)
        Alert.alert('Something went wrong while trying to remove')
      })
    }
  }
}

export function requestRemove() {
  return {
    type: REMOVE_PET_REQUEST
  }
}

export function removeSuccess() {
  Actions.pop()
  return {
    type: REMOVE_PET_SUCCESS
  }
}

export function removeFailure(message) {
  return {
    type: REMOVE_PET_FAILURE,
    error: message
  }
}
