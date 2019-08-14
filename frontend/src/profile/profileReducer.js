import { profileConstants } from './profileConstants.js';

const initialState = {
  saving: false,
  saved: false,
  changes: {
    image: {
    }
  },
  currentUserData: null,
};

export function profile(state = initialState, action) {
  // console.log("user", state, action);
  switch (action.type) {
    case profileConstants.PROFILE_CHANGE:
      if(action.value === null) {
        let newState = state;
        delete newState.changes[action.category];
        return newState;
      }
      if(action.value !== "")
        return {
          ...state,
          changes: {
            ...state.changes,
            [action.category]: action.value
          },
          saved: false
        };
      else
        return state

    case profileConstants.PROFILE_IMAGE_CHANGE:
      return {
        ...state,
        changes: {
          ...state.changes,
          image: {
            file: action.file,
            data: action.image
          }
        }
      }

    case profileConstants.PROFILE_SAVE_REQUEST:
      return {
        ...state,
        saving: true,
        saved: false
      };
    case profileConstants.PROFILE_SAVE_SUCCESS:
      return {
        ...state,
        changes: {

        },
        saved: true,
        saving: false
      };
    case profileConstants.PROFILE_SAVE_FAILURE:
      return {
        ...state,
        saved: false,
        saving: false,
      };
    case profileConstants.GET_PROFILE_REQUEST:
      return state;
    case profileConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        currentUserData: action.data.user
      };
    case profileConstants.GET_PROFILE_FAILURE:
      return state;

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
