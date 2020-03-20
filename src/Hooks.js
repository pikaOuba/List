import React, { useEffect } from 'react'
import { useSelector, useDispatch } from './react-redux'
import { addCount, decrementCount, testText } from './store/counter'

function HookApp() {
  const count = useSelector(state => state.counter.count)
  const text = useSelector(state => state.counter.text)
  const dispatch = useDispatch()

  function increment() {
    dispatch(addCount())
  }

  function decrement() {
    dispatch(decrementCount())
  }

  function test() {
    dispatch(testText())  
  }

  useEffect(() => {
    test()
    console.log(text)//看下state。counter。text的值
  })

  return (
    <div className="App">
      <p>当前count: {count}</p>
      <button onClick={increment}>增加1</button>
      <button onClick={decrement}>减少1</button>
      <button >不改变store的state</button>
    </div>
  )
}

export default HookApp;
