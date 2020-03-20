import React, {useEffect } from 'react'
import { useSelector } from '../../react-redux'
import { Route, Redirect } from 'react-router-dom'
// import { parse } from 'search-params'
// const getcode = (props) => {
//   if(props) {
//     const { code } = parse(props.location.search)
//     return code
//   }
 
// }

let AuthorizedRoute = (props) => {
  const { component: Component, ...rest } = props
  // const dispatch = useDispatch()
  const signing = useSelector(state => state.user.signing)




  // const isAuthenticated = me && me.userId 
  const token = localStorage.getItem('TOKEN')
  useEffect(()=>{
    if(token) {
      console.log('isAuthenticatedtoken', me)
    }
  })
  const me = useSelector(state => {
    console.log('useSelector', state)
    return state.user.me
  })
  const isAuthenticated = me && me.userId 
  console.log('获取我的数据', me)
 
  // useEffect(() => {
  //   if (getcode(props)) {
  //     dispatch(signin(getcode(props))).then(() => {
  //       const redirectUrl = localStorage.getItem('redirectUrl')
  //       if (redirectUrl) {
  //         localStorage.removeItem('redirectUrl')
  //         window.location.href = redirectUrl
  //       }
  //     }, (error) => {
  //       console.log('登陆失败')
  //       // this.context.router.history.push(`/error?title=${encodeURIComponent('登陆失败')}&error=${encodeURIComponent(error)}`)
  //     })
  //   }
  // }, [])



  return  <Route {...rest} render={props => {
    if (signing) {
      return null
    }

    // return <Component {...props} />

    if (isAuthenticated) {
      // if (!hasMobile && this.props.location.pathname !== '/bingdingphone') {
      //   return (<Redirect to="/bingdingphone" />)
      // }

      return (
        <Component {...props} />
      )
    }

    localStorage.setItem('redirectUrl', window.location.href)
    return (
      <Redirect to='/login/mobile' />
    )
  }} />
}
export default AuthorizedRoute
