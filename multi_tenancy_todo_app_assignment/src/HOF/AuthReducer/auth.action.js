import axios from "axios";
import actionTypes from "./auth.actionTypes";

const userRegisterReq = () => {
  return { type: actionTypes.REGISTER_REQUEST };
};
const userAlreadyRegister = () => {
  return { type: actionTypes.REGISTER_ALREADY };
};
const userRegisterSuccess = () => {
  return { type: actionTypes.REGISTER_SUCCESS };
};
const userRegisterError = () => {
  return { type: actionTypes.REGISTER_FAILURE };
};
const resetState = () => {
  return { type: actionTypes.RESET_STATES };
};

const Register_FN = ({ firstname, lastname, email, password }) => {
  console.log(firstname, lastname, email, password);
  return async (dispatch) => {
    dispatch(userRegisterReq());

    try {
      let data = await axios.post(
        `https://multitenancy.onrender.com/client/register`,

        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      data = await data.data;
      console.log(data);

      console.log(data, "action");
      dispatch(userRegisterSuccess());
    } catch (error) {
      console.log(error.response.data.error, "error,check if");
      if (error.response.data.error) {
        //console.log((error.response.data.error ,"Tenant already exists. Please logdfdfdfdfdfzgfin")

        dispatch(userAlreadyRegister());
      } else {
        console.log(error.response.data, "else");
        dispatch(userRegisterError());
      }
    }
  };
};

//login action types function ;

const login_req = () => {
  return { type: actionTypes.LOGIN_REQ };
};
const login_success = (payload) => {
  return { type: actionTypes.LOGIN_SUCCESS, payload };
};
const login_failure = () => {
  return { type: actionTypes.LOGIN_ERROR };
};
const login_noAcc_found = () => {
  return { type: actionTypes.NO_ACC_FOUND };
};
const WrongPass = () => {
  return { type: actionTypes.WRONG_PASSWORD };
};

const Login_FN = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(login_req());
      const url = `https://multitenancy.onrender.com/bothlogin/login`;
      let data = await axios.post(url, {
        email,
        password,
      });
      data = await data.data;

      console.log(data, "login data");
      if (data.message) {
        localStorage.setItem("role", data.role);
        dispatch(login_success(data.token));
      }
    } catch (error) {
      if (error.response.data?.wrong) {
        dispatch(WrongPass());

        console.log(error.response.data?.wrong);
      } else if (error.response?.data.error) {
        dispatch(login_noAcc_found());
        console.log(error.response?.data);
      } else {
        console.log(error);
        dispatch(login_failure());
      }
    }
  };
};

export const fetchProfileSuccess = (profileData) => {
  return { type: actionTypes.FETCH_PROFILE_SUCCESS, payload: profileData };
};

export const fetchProfileFailure = (error) => {
  return { type: actionTypes.FETCH_PROFILE_FAILURE, payload: error };
};

export const fetchProfile = () => {
  return (dispatch) => {
    // Make API call to fetch profile data
    return fetch("https://multitenancy.onrender.com/user/getuserdetail", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: localStorage.getItem("user_email"),
        Authorization: localStorage.getItem("login_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.other, "datafsdafdsf");
        dispatch(fetchProfileSuccess(data?.other));
      })
      .catch((error) => dispatch(fetchProfileFailure(error)));
  };
};

const logout_FN = () => {
  return { type: actionTypes.LOGOUT };
};

export { Register_FN, Login_FN, logout_FN };
