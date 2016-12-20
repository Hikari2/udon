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

function postImage(key, name, imagePath) {
  let rnfbURI = RNFetchBlob.wrap(imagePath)
  return Blob
    .build(rnfbURI, { type : 'image/png'})
    .then((blob) => {
      firebase.storage()
        .ref('pets')
        .child(key + '/' + name)
        .put(blob, { contentType : 'image/png' }).then(() => blob.close())
    }, error => {
      Alert.alert('Something went wrong while trying to upload pet image')
    })
}

function readImage(key, name) {
  return firebase
    .storage()
    .ref('pets')
    .child(key + '/' + name)
    .getDownloadURL().then((url) => {
      return url
    }, error => {
      console.log(error)
      //Alert.alert('Something went wrong while trying to read pet image')
    })
}

export function registerPet(pet) {
  return function(dispatch, getState) {
    dispatch(requestRegister())
    const photo = pet.photo
    pet = {
      uid: getState().auth.user.uid,
      name: pet.name,
      weight: pet.weight,
      neck: pet.neck,
      back: pet.back,
      chest: pet.chest,
    }

    const key = firebase.database().ref('pet_list').push().key
    postImage(key, 0, photo.path)
      .then(() => {
        firebase.database().ref('pet_list/' + key).set(pet)
          .then(() => {
            dispatch(registerSuccess())
            Actions.mainContainer()
          })
      }, error => {
        dispatch(registerFailure(error))
        Alert.alert('Something went wrong while trying to register your pet')
      })
  }
}

export function requestRegister() {
  return {
    type: REGISTER_PET_REQUEST
  }
}

export function registerSuccess() {
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
    const postList = firebase.database().ref('pet_list').orderByChild('uid').equalTo(uid)
    postList.on('value', (snap) => {
      if(!snap.val()) {
        dispatch(searchPetsSuccess([]))
      } else {
        var items = []
        snap.forEach((child) => {
          const key = child.key
          readImage(key, 0).then((photo)=> {
            items.push(Object.assign({}, child.val(), {photo}, {key: child.key}))
            items.reverse()
            dispatch(searchPetsSuccess(items))
          })
        })
      }
    }, error => {
      dispatch(searchPetsFailure(error))
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

export function updatePet(pet) {
  return function(dispatch, getState) {
    dispatch(requestUpdate())
    console.log(pet)
    const photo = pet.photo
    const key = pet.key
    pet = {
      uid: getState().auth.user.uid,
      name: pet.name,
      weight: pet.weight,
      neck: pet.neck,
      back: pet.back,
      chest: pet.chest,
    }

    let promises = []
    if(!photo.path.includes('http')) {
      promises.push(postImage(key, 0, photo.path))
    }
    promises.push(firebase.database().ref('pet_list/' + key).update(pet))

    Promise.all(promises).then(() => {
      dispatch(updateSuccess())
      Actions.mainContainer()
    }, error => {
      dispatch(updateFailure(error))
      Alert.alert('Something went wrong while trying to update your pet')
    })
  }
}

export function requestUpdate() {
  return {
    type: UPDATE_PET_REQUEST
  }
}

export function updateSuccess() {
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
