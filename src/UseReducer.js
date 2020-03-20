import React, {useReducer, useContext} from 'react'

//useReducer
//useContext  跨组件 全局参数 偶尔页面间传值 但是action很多时候 最好就是用redux
const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD': 
      return state + 1
    case 'SUB':
      return state - 1
    default :
      return state
  }
}

const Ctx = React.createContext(null)

const Child = () => {
  // const [count, dispatch] = useReducer(reducer, 10)
  const [count, dispatch] = useContext(Ctx)
  const handleAdd = () => {
    dispatch({type: 'ADD'})
  }

  const handleSub = () => {
    dispatch({type: 'SUB'})
  }

  return <>
  child:
  count: {count}
  <button onClick={handleAdd}>+1</button>
  <button onClick={handleSub}>-1</button>
  </>
}

export const UseReducer = () => {
  const[count, dispatch] = useReducer(reducer, 20)
  return (<Ctx.Provider value={[count, dispatch]}>
    <Child/>
  </Ctx.Provider>)
}