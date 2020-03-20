const GETME = 'user/GETME'
const GETME_SUCCESS = 'user/GETME_SUCCESS'
const GETME_FAILURE = 'user/GETME_FAILURE'

const SIGNIN = 'user/SIGNIN'
const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS'
const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE'

const SET_SIGNING = 'user/SET_SIGNING'

const SIGINMOBILE = 'user/SIGINMOBILE'
const SIGINMOBILE_SUCCESS = 'user/SIGINMOBILE_SUCCESS'
const SIGINMOBILE_FAILURE = 'user/SIGINMOBILE_FAILURE'

export default (state = { signing: true }, action) => {
  switch (action.type) {
    case GETME:
      if (action.isForLogin) {
        return {
          ...state,
          signing: true
        }
      } else {
        return {
          ...state
        }
      }
    case SIGNIN_SUCCESS:
    case GETME_SUCCESS:
    case SET_SIGNING:
      return {
        ...state,
        me: action.payload,
        signing: false
      }
    default:
      return state
  }
}

export const getMe = (isForLogin) => {
  return {
    types: [GETME, GETME_SUCCESS, GETME_FAILURE],
    promise: (apiClient) => apiClient.get('/api/users/me'),
    isForLogin
  }
}

export const signin = (code) => {
  return {
    types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE],
    promise: (apiClient) => apiClient.post('/api/auth/signin/wechat', {code})
  }
}

export const setSigning = (signing) => {
  return {
    type: SET_SIGNING,
    signing
  }
}

//手机号码登录
export const signinMobile = ({verificationCode, mobile}) => {
  return {
    types: [SIGINMOBILE, SIGINMOBILE_SUCCESS, SIGINMOBILE_FAILURE],
    promise: (apiClient) => apiClient.post('/api/auth/signin/mobile', {verificationCode, mobile})
  }
}