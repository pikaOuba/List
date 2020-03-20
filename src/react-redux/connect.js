import React, { useContext, useReducer, useEffect, useRef } from "react";
import storeContext from './storeContext'
import shallowEqual from 'shallowequal'

function connect(mapStateToProps, mapDispatchToProps) {
  return function wrapWithConnect(WrapperComponent) {
    return function ConnectFunction(props) {
      const store = useContext(storeContext)
      const lastStateProps = useRef({})
      const lastDispatchProps = useRef({})

      // 执行强制渲染
      const [, forceRender] = useReducer(s => s + 1, 0)

      // 赋值state
      useEffect(() => {
        lastStateProps.current = mapStateToProps(store.getState());
        lastDispatchProps.current = mapDispatchToProps(store.dispatch);
        forceRender();
      }, [store])

      // 订阅store变化
      useEffect(() => {
        function checkForUpdates() {
          const newStateProps = mapStateToProps(store.getState())
          if (!shallowEqual(lastStateProps.current, newStateProps)) {
            console.log('render')
            lastStateProps.current = newStateProps;
            forceRender()
          }
        }
        const describe = store.subscribe(checkForUpdates)
        return describe
      }, [store])
      return (
        <WrapperComponent
          {...props}
          {...lastStateProps.current}
          {...lastDispatchProps.current}
        />
      );
    };
  };
}

export default connect;
