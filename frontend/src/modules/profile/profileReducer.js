import { profileConstants } from './profileConstants.js';

const initialState = {
  saving: false,
  saved: false,
  changes: {
    image: {
    }
  },
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
          image: {
            
          }
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

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
