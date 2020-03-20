import React from 'react'
// import {getWechatJsConfig, setPageHeight, reportError} from '../stores/common'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    jsConfig: state.common.jsConfig
  }
}

export default () => {
  return (WrappedComponent) => connect(mapStateToProps) (
    function(props) {
      return <>
       <WrappedComponent {...this.props} />
      </>
    }
  )
}
