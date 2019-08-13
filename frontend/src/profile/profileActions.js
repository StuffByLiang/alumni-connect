import { profileService } from './profileService.js';
import { profileConstants } from './profileConstants.js';

export const profileActions = {
    handleChange,
    saveChanges,
    getProfile
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
      let response = await profileService.saveChanges(changes);

      dispatch(success(response));
    } catch (error) {
      dispatch(failure(error))
    }
  };

  function request() { return { type: profileConstants.PROFILE_SAVE_REQUEST }}
  function success(data) { return { type: profileConstants.PROFILE_SAVE_SUCCESS, data }}
  function failure(error) { return { type: profileConstants.PROFILE_SAVE_FAILURE, error }}
};

function getProfile() {
  return async (dispatch) => {
    dispatch(request());

    try {
      let response = await profileService.getProfile();

      dispatch(success(response));
    } catch (error) {
      dispatch(failure(error))
    }
  };

  function request() { return { type: profileConstants.GET_PROFILE_REQUEST }}
  function success(data) { return { type: profileConstants.GET_PROFILE_SUCCESS, data }}
  function failure(error) { return { type: profileConstants.GET_PROFILE_FAILURE, error }}
};
