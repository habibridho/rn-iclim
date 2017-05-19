import { sendHttpRequest } from '@lib/ajax';

export function register(data) {
  return function(dispatch, getState) {
    dispatch(isRegistering())

    return sendHttpRequest({
      method: 'POST',
      url: 'http://' + getState().setting.baseUrl + '/api/v1/register',
      headers: new Headers({
        'Content-Type' : 'application/json'
      }),
      body: JSON.stringify(data),
      onSuccess: json => {
        dispatch(registerSuccess(json.token))
      },
      onError: err => {
        console.log(err)
        dispatch(registerFailed())
      }
    })
  }
}

export function login(data) {
  return function(dispatch, getState) {
    dispatch(isLoggingIn())

    return sendHttpRequest({
      method: 'POST',
      url: 'http://' + getState().setting.baseUrl + '/api/v1/login',
      headers: new Headers({
        'Content-Type' : 'application/json'
      }),
      body: JSON.stringify(data),
      onSuccess: json => {
        dispatch(loginSuccess(json.token))
      },
      onError: err => {
        console.log(err)
        dispatch(loginFailed())
      }
    })
  }
}

function isRegistering() {
  return {
    type: 'IS_REGISTERING'
  }
}

function registerFailed() {
  return {
    type: 'REGISTER_FAILED'
  }
}

function registerSuccess(token) {
  return {
    type: 'REGISTER_SUCCESS',
    payload: {
      token
    }
  }
}

function isLoggingIn() {
  return {
    type: 'IS_LOGGING_IN'
  }
}

function loginFailed() {
  return {
    type: 'LOGIN_FAILED'
  }
}

function loginSuccess(token) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      token
    }
  }
}