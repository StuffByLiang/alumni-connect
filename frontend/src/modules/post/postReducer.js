import { postConstants } from './postConstants.js';

const initialState = {
  uploading: false,
  loading: false,
  posts: {
    byId: {}
  }
};

export function post(state = initialState, action) {
  // console.log("user", state, action);
  switch (action.type) {
    case postConstants.UPLOAD_POST_REQUEST:
      return {
        ...state,
        uploading: true,
      }
    case postConstants.UPLOAD_POST_SUCCESS:
      return {
        ...state,
        uploading: false,
        data: action.data,
      }
    case postConstants.UPLOAD_POST_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.error,
      }

    case postConstants.GET_POSTS_REQUEST:
      return {
        ...state,
        query: action.query,
        loading: true,
        posts: {
          byId: {}
        }
      }
    case postConstants.GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: {
          byId: action.posts
        },
      }
    case postConstants.GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
