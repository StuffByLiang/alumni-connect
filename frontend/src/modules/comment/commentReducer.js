import { commentConstants } from './commentConstants.js';

const initialState = {
  uploading: false,
  loading: false,
  commentState: {
    byId: {

    },
  },
  commentDrafts: {
    byPostId: {},
    byCommentId: {},
  },
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

    case commentConstants.COMMENT_INIT:
      return {
        ...state,
        commentState: {
          byId: {
            ...state.commentState.byId,
            [action.comment_id]: {
              reply: false,
              liked: false,
            }
          },
        },
      }

    case commentConstants.COMMENT_CHANGE:
      // if replying to another comment
      if(action.replyTo_comment_id) return {
        ...state,
        commentDrafts: {
          ...state.commentDrafts,
          byCommentId: {
            ...state.commentDrafts.byCommentId,
            [action.replyTo_comment_id]: {
              post_id: action.post_id,
              replyTo_comment_id: action.firstLevelCommentId,
              comment: action.comment,
            }
          }
        }
      }
      else return {
        ...state,
        commentDrafts: {
            ...state.commentDrafts,
          byPostId: {
            ...state.commentDrafts.byPostId,
            [action.post_id]: {
              post_id: action.post_id,
              replyTo_comment_id: null,
              comment: action.comment,
            }
          }
        }
      }

    case commentConstants.TOGGLE_COMMENT_REPLY:
      let commentState = state.commentState.byId[action.comment_id];
      return {
        ...state,
        commentState: {
          byId: {
            ...state.commentState.byId,
            [action.comment_id]: {
              reply: commentState.reply ? false : true,
              liked: false,
            }
          },
        },
      }

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
