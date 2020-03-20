import React, { useState, useRef, useEffect } from 'react'

export const Fetch = () => {
  const [ count, setCount ] = useState(null)
  const btnRef = useRef(null)
  useEffect(() => {
    console.log('2342')
    const handleClick = () => {
      setCount(count + 1)
    }
    btnRef.current.addEventListener('click', handleClick, false)
    return () => {
      btnRef.current.removeEventListener('click', handleClick, false)
    }
  }, [count])
  // const countRef = useRef(null)
  // useEffect(()=>{
  //   countRef.current = count
  // }, [count])

  // useEffect(() => { //不允许条件下的去执行 不能条件后去添加
  //   const timer = setInterval(() => {
  //     console.log(countRef.current)
  //     setCount(countRef.current + 1)
  //   }, 500)
  //   return ()=>{
  //     clearInterval(timer)
  //   }
  //   // fetch('./index.html').then(res => res.text().then(res =>{setResult(res)}))
  // // return <>{count}</>
  // }, []) //有依赖的话 依赖变化多少次就render多少次
  //依赖可以多项
 

  return <>
    <div>count: {count}</div>
    <button ref={btnRef}>+1</button>
  </>
}