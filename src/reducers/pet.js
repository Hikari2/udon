import {
  REGISTER_PET_REQUEST,
  REGISTER_PET_SUCCESS,
  REGISTER_PET_FAILURE,
  SEARCH_PETS_REQUEST,
  SEARCH_PETS_SUCCESS,
  SEARCH_PETS_FAILURE
} from '../actions/pet'

const pet = (
  state = {
    isRegistering: false,
    isSearchingPets: false,
    myPets: [],
    error: ''
  }, action) => {
  switch (action.type) {
    case REGISTER_PET_REQUEST: {
      return Object.assign({}, state, {
        isRegistering: true
      })
    }
    case REGISTER_PET_SUCCESS: {
      return Object.assign({}, state, {
        isRegistering: false
      })
    }
    case REGISTER_PET_FAILURE: {
      return Object.assign({}, state, {
        isRegistering: false,
        error: action.error
      })
    }
    case SEARCH_PETS_REQUEST: {
      return Object.assign({}, state, {
        isSearchingPets: true
      })
    }
    case SEARCH_PETS_SUCCESS: {
      return Object.assign({}, state, {
        myPets: action.myPets,
        isSearchingPets: false
      })
    }
    case SEARCH_PETS_FAILURE: {
      return Object.assign({}, state, {
        isSearchingPets: false,
        error: action.error
      })
    }
    default:
      return state
  }
}

export default pet
