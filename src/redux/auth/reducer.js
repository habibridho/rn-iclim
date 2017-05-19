const initialState = {
  isRegistering: false,
  isLoggingIn: false,
  token: ''
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'IS_REGISTERING':
      return {
        ...state,
        isRegistering: true
      }
    case 'REGISTER_FAILED':
      return {
        ...state,
        isRegistering: false
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isRegistering: false,
        token: action.payload.token
      }
    case 'IS_LOGGING_IN':
      return {
        ...state,
        isLoggingIn: true
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoggingIn: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        token: action.payload.token
      }
    default:
      return state
  }
}