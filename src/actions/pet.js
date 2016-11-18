
import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
import { Alert } from 'react-native'

export const REGISTER_PET_REQUEST = 'REGISTER_PET_REQUEST'
export const REGISTER_PET_SUCCESS = 'REGISTER_PET_SUCCESS'
export const REGISTER_PET_FAILURE = 'REGISTER_PET_FAILURE'

export function registerPet(pet) {
  return function(dispatch, getState) {
    dispatch(requestRegister())
    pet.uid = getState().auth.user.uid
    firebase.database().ref('pet_list').push(pet)
    .then((data) => {
      dispatch(registerSuccess())
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
      var items = []
      snap.forEach((child) => {
        items.push(Object.assign({}, child.val(), {_key: child.key}))
      })
      items.reverse()
      dispatch(searchPetsSuccess(items))
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
