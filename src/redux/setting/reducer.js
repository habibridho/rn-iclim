const initialState = {
  baseUrl: ''
}

export default function settingReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_IP':
      return {
        ...state,
        baseUrl: action.payload.baseUrl
      }
    default:
      return state
  }
}