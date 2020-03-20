import { WECHAT } from '../config'
export const getAuthUrl = () => {
  const APPID = encodeURI(WECHAT.APPID)
  const REDIRECT_URI = encodeURI(window.location.origin)
  const SCOPE = encodeURI('snsapi_userinfo')
  const STATE = encodeURI('')
  const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`
  return authUrl
}