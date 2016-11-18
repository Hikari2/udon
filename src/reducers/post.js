import {
  PUBLISH_REQUEST,
  PUBLISH_SUCCESS,
  PUBLISH_FAILURE,
  SEARCH_OWN_REQUEST,
  SEARCH_OWN_SUCCESS,
  SEARCH_OWN_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/post'

const post = (
  state = {
    isPublishing: false,
    isSearching: false,
    isSearchingOwn: false,
    error: '',
    myPosts: [],
    searchResult: []
  }, action) => {
  switch (action.type) {
    case PUBLISH_REQUEST: {
      return Object.assign({}, state, {
        isPublishing: true
      })
    }
    case PUBLISH_SUCCESS: {
      return Object.assign({}, state, {
        isPublishing: false
      })
    }
    case PUBLISH_FAILURE: {
      return Object.assign({}, state, {
        isPublishing: false,
        error: action.error
      })
    }
    case SEARCH_OWN_REQUEST: {
      return Object.assign({}, state, {
        isSearchingOwn: true
      })
    }
    case SEARCH_OWN_SUCCESS: {
      return Object.assign({}, state, {
        isSearchingOwn: false,
        myPosts: action.posts
      })
    }
    case SEARCH_OWN_FAILURE: {
      return Object.assign({}, state, {
        isSearchingOwn: false,
        error: action.error
      })
    }
    case SEARCH_REQUEST: {
      return Object.assign({}, state, {
        isSearching: true
      })
    }
    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        isSearching: false,
        searchResult: action.posts
      })
    }
    case SEARCH_FAILURE: {
      return Object.assign({}, state, {
        isSearching: false,
        error: action.error
      })
    }
    default:
      return state
  }
}

export default post
