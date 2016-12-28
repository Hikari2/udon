import {
  REGISTER_PET_REQUEST,
  REGISTER_PET_SUCCESS,
  REGISTER_PET_FAILURE,
  SEARCH_PETS_REQUEST,
  SEARCH_PETS_SUCCESS,
  SEARCH_PETS_FAILURE,
  UPDATE_PET_REQUEST,
  UPDATE_PET_SUCCESS,
  UPDATE_PET_FAILURE,
  REMOVE_PET_REQUEST,
  REMOVE_PET_SUCCESS,
  REMOVE_PET_FAILURE
} from '../actions/pet'

const pet = (
  state = {
    isRegistering: false,
    isSearching: false,
    isUpdating: false,
    isRemoving: false,
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

    case UPDATE_PET_REQUEST: {
      return Object.assign({}, state, {
        isUpdating: true
      })
    }
    case UPDATE_PET_SUCCESS: {
      return Object.assign({}, state, {
        isUpdating: false
      })
    }
    case UPDATE_PET_FAILURE: {
      return Object.assign({}, state, {
        isUpdating: false,
        error: action.error
      })
    }

    case REMOVE_PET_REQUEST: {
      return Object.assign({}, state, {
        isRemoving: true
      })
    }
    case REMOVE_PET_SUCCESS: {
      return Object.assign({}, state, {
        isRemoving: false
      })
    }
    case REMOVE_PET_FAILURE: {
      return Object.assign({}, state, {
        isRemoving: false,
        error: action.error
      })
    }

    default:
      return state
  }
}

export default pet
