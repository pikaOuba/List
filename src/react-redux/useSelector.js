import { useContext, useReducer, useEffect, useRef } from 'react'
import storeContext from './storeContext'
import shallowEqual from 'shallowequal'

export default function useSelector(selectorFn) {
  const store = useContext(storeContext)

  const lastStateProps = useRef()
  const lastSelectorFn = useRef()

  // 执行强制渲染
  const [, forceRender] = useReducer(s => s + 1, 0)

  // 赋值state
  useEffect(() => {
    lastSelectorFn.current = selectorFn
    lastStateProps.current = selectorFn(store.getState())
  })

  // 订阅store变化
  useEffect(() => {
    function checkForUpdates() {
      const newStateProps = lastSelectorFn.current(store.getState());
      if (!shallowEqual(lastStateProps.current, newStateProps)) {
        lastStateProps.current = newStateProps
        forceRender()
      }
    }
    const describe = store.subscribe(checkForUpdates)
    forceRender()
    return describe
  }, [store])

  return lastStateProps.current
}
