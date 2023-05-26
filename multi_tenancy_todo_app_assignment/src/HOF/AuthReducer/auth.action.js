// "use client";
// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
//   LOGOUT,
// } from "./auth.actionTypes";

// // Login Action
// export const login = ({ email, password, userType }) => {
//   return async (dispatch) => {
//     try {
//       // Dispatch login request action
//       dispatch({ type: LOGIN_REQUEST });
//       // Make API request to login
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/${userType}/login`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       // Check if login was successful
//       if (!response.error) {
//         const data = await response.json();
//         localStorage.setItem("details", JSON.stringify(data));
//         console.log(data);
//         alert(data.error || data.message);
//         // Dispatch login success action with user data
//         dispatch({ type: LOGIN_SUCCESS, payload: data });
//       } else {
//         // Handle login failure
//         dispatch({ type: LOGIN_FAILURE, error: "Login failed" });
//       }
//     } catch (error) {
//       // Handle error
//       dispatch({ type: LOGIN_FAILURE, error: "An error occurred" });
//     }
//   };
// };

// // Register Action
// export const register = ({ email, password, firstname, lastname }) => {
//   return async (dispatch) => {
//     try {
//       // Dispatch register request action
//       console.log(email, password, firstname, lastname, "data");
//       dispatch({ type: REGISTER_REQUEST });

//       // Make API request to register
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_API}/client/register`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password, firstname, lastname }),
//         }
//       );
//       // Check if registration was successful
//       const data = await response.json();
//       console.log(data, "data in register auth.reducer");
//       alert(data.result || data.error);
//       // Dispatch register success action with user data
//       if (data) {
//         dispatch({ type: REGISTER_SUCCESS, payload: data });
//       }
//       // Handle registration failure
//     } catch (error) {
//       // Handle error
//       dispatch({ type: REGISTER_FAILURE, error: "An error occurred" });
//     }
//   };
// };

// export const logoutUser = () => (dispatch) => {
//   dispatch({ type: LOGOUT });
//   localStorage.removeItem("details");
// };

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
      let data = await axios.post(`https://ill-cyan-cricket-cap.cyclic.app/client/register`, {
        firstname,
        lastname,
        email,
        password,
      });

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
      

      let data = await axios.post(
        `https://ill-cyan-cricket-cap.cyclic.app/bothlogin/login`,
        {
          email,
          password,
        }
      );
      data = await data.data;
     
console.log(data,"data");
      if (data.message) {
       
localStorage.setItem("role",data.role)
        dispatch(login_success(data.token));
      }
    } catch (error) {
      
      if (error.response.data?.wrong) {
       
        dispatch(WrongPass())
        
        console.log(error.response.data?.wrong);
      }
      else if (error.response?.data.error) {
        dispatch(login_noAcc_found());
        console.log(error.response?.data);
      } else {
        console.log(error);
        dispatch(login_failure());}
    }
  };
};

export const fetchProfileSuccess = (profileData) => {
  return { type:actionTypes.FETCH_PROFILE_SUCCESS,payload: profileData}
  };
  
  export const fetchProfileFailure = (error) => {
    return {type:actionTypes.FETCH_PROFILE_FAILURE,payload: error}
  };
  
  export const fetchProfile = () => {
    return (dispatch) => {
      // Make API call to fetch profile data
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => dispatch(fetchProfileSuccess(data)))
        .catch((error) => dispatch(fetchProfileFailure(error)));
    };
  };
  
const logout_FN=()=>{
  return {type:actionTypes.LOGOUT}
}

export { Register_FN, Login_FN,logout_FN };
