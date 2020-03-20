import React, { useRef, useEffect, useState } from 'react'

//useRef 一般有两个作用
export const UseRef = () => {
  const btnRef = useRef(null)
  const countRef = useRef(null)
 const [count, setCount] = useState(0)
  
//  利用useRef 获取Dom 节点 操作事件
  useEffect(()=>{
    const handleClick = () => {
      setCount(count + 1 )
    }
    btnRef.current.addEventListener('click', handleClick, false)
    return ()=> {
      btnRef.current.removeEventListener('click', handleClick, false)
    }
  }, [count])

  //利用useRef， 避免不要必要的调用 
  //当 传入的参数为空数组的时候
  useEffect(()=>{
    countRef.current = count //可以看成是组件内的变量
  }, [count])

  useEffect(()=> {
    const timer = setInterval(()=> {
      console.log('99999', count, countRef.current)
      setCount(countRef.current + 1)
    }, 1000)
    return ()=>  clearInterval(timer)
    // return <>{count}</>
  }, [])


  return <>
    <div>count: {count}</div>
    <button ref={btnRef} >点击加1</button>
  </>
}