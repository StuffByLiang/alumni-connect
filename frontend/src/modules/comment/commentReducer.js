import { commentConstants } from './commentConstants.js';

const initialState = {
  uploading: false,
  loading: false,
  comments: [],
  writing: {},
};

export function comment(state = initialState, action) {
  // console.log("user", state, action);
  switch (action.type) {
    case commentConstants.UPLOAD_COMMENT_REQUEST:
      return {
        ...state,
        uploading: true,
      }
    case commentConstants.UPLOAD_COMMENT_SUCCESS:
      return {
        ...state,
        uploading: false,
        data: action.data,
      }
    case commentConstants.UPLOAD_COMMENT_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.error,
      }

    case commentConstants.GET_COMMENTS_REQUEST:
      return {
        ...state,
        query: action.query,
        loading: true,
        comments: [],
      }
    case commentConstants.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.data.comments,
      }
    case commentConstants.GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case commentConstants.COMMENT_CHANGE:
      return {
        ...state,
        writing: {
          ...state.writing,
          [action.post_id]: {
            replyTo_comment_id: action.replyTo_comment_id,
            comment: action.comment,
          }
        }
      }

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
