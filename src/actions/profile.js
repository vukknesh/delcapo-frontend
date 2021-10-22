import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CLEAR_PROFILES,
  GET_ERRORS,
  GET_PROFILES
} from "./types";
import api from "../utils/config";

export const getCurrentProfile = slug => (dispatch, getState) => {
  dispatch(setProfileLoading);
  axios
    .get(api + `/api/profiles/${slug}/`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};

// myprofile
export const getMyProfile = slug => (dispatch, getState) => {
  dispatch(setProfileLoading);
  axios
    .get(api + `/api/profiles/${slug}/`)
    .then(res =>
      dispatch({
        // type: SET_CURRENT_USER,
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// //get current profile by handle

export const getProfileByHandle = id => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get(api + `/api/profiles/${id}/`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};

// update profile
export const updateProfile = (profileData, id, slug, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/profiles/${id}/update/`, profileData, config)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};

export const updateProfilePics = (
  profileData,

  id,
  token
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/profiles/${id}/update/`, profileData, config)

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const updateProfileGuias = (
  profileData,

  id,
  token
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/profiles/${id}/`, profileData, config)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};
// update profile
export const updateProfileEspecies = (
  especies,
  id,
  slug,
  token
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/profiles/${id}/update/`, especies, config)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};

export const updateProfileGuide = (profileData, id, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/profiles/${id}/`, profileData, config)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};

// Profile Loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Loading

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const clearAllProfiles = () => {
  return {
    type: CLEAR_PROFILES
  };
};

// GET PROFILES
export const getProfiles = () => dispatch => {
  axios
    .get(api + "/api/profiles/")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const updateGuide = (guideData, id, slug, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `/api/guides/${id}/update/`, guideData, config)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};
