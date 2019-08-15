import { profileService } from './profileService.js';
import { profileConstants } from './profileConstants.js';

export const profileActions = {
    handleChange,
    saveChanges,
    handleImageChange,
};

function handleChange(category, value) {
  return (dispatch) => dispatch({
    type: profileConstants.PROFILE_CHANGE,
    category: category,
    value: value
  })
};

function saveChanges() {
  return async (dispatch, getState) => {
    const {
      changes
    } = getState().profile;

    dispatch(request());

    try {
      let response = await profileService.saveChanges(changes, changes.image.file);

      dispatch(success(response));
    } catch (error) {
      dispatch(failure(error))
    }
  };

  function request() { return { type: profileConstants.PROFILE_SAVE_REQUEST }}
  function success(data) { return { type: profileConstants.PROFILE_SAVE_SUCCESS, data }}
  function failure(error) { return { type: profileConstants.PROFILE_SAVE_FAILURE, error }}
};

function handleImageChange(file, image) {
  return (dispatch) => dispatch({
    type: profileConstants.PROFILE_IMAGE_CHANGE,
    file: file,
    image: image
  })
};
