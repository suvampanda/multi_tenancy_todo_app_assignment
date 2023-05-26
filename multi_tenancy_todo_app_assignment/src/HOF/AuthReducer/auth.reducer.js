import actionTypes from "./auth.actionTypes";

const intstate = {
  loading: false,
  error: false,
  userRegister: false,
  isUserAlreadyRegister: false,
  userLogin:false,
  AccNotFound:false,
  loginToken:"",
  wrongPass:false,
  profileData: {}

};

const reducer = (state = intstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REGISTER_REQUEST:
      
      return {
        ...state,
        loading: true,
        userRegister: false,
        isUserAlreadyRegister: false,
      };

    case actionTypes.REGISTER_SUCCESS:
      
      return {
        ...state,
        loading: false,
        userRegister: true,
        isUserAlreadyRegister: false,
      };

    case actionTypes.REGISTER_ALREADY:
      
      return {
        ...state,
        loading: false,
        isUserAlreadyRegister: true,
       
      };

    // case actionTypes.RESET_STATES:
    //   return { ...state, isUserAlreadyRegister: false };

    case actionTypes.REGISTER_FAILURE:
     
      return {
        ...state,
        loading: false,
        error: true,
        isUserAlreadyRegister: false,
        userRegister: false,
      };

      //login state reducer;
      case actionTypes.LOGIN_REQ:return {...state,loading:true, userLogin:false, AccNotFound:false,wrongPass:false}

      case actionTypes.LOGIN_SUCCESS:return {...state,loading:false, userLogin:true,AccFound:true, loginToken:payload}

      case actionTypes.WRONG_PASSWORD:return {...state, loading:false, wrongPass:true}

      case actionTypes.NO_ACC_FOUND:
      
      return {...state, loading:false ,AccNotFound:true,loginToken:"" }

      case actionTypes.LOGIN_ERROR:return {...state, loading:false , userLogin:false ,AccFound:false ,error:true,loginToken:""}

      //logout reducer;

      case actionTypes.LOGOUT:
      localStorage.removeItem("login_token")
      localStorage.removeItem("user_email")
      localStorage.removeItem("role")  
      return {...state, userToken:"",userLogin:false }
      
      case actionTypes.FETCH_PROFILE_SUCCESS:
        return {
          ...state,
          profileData: action.payload,
          error: false,
        };
      case actionTypes.FETCH_PROFILE_FAILURE:
        return {
          ...state,
          profileData: null,
          error: action.payload,
        };

    default:
      return state;
  }
};

export { reducer };
