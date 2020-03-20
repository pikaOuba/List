import React, { useState, useCallback, memo, useEffect } from 'react'


//子组件 input 内容变化的时候 父组件也变化
// 父组件在更新 子组件没有在更新
//解决子组件重复刷新的问题（3个视角 useMemo, memo， callback）

const Parent = () => {
  const [ content,  setContent ] = useState('')

  const [ width, setWidth ] = useState('0px')
  const [ height, setHeight ] = useState('0px')

  const  handleOnChange = useCallback((e) => {
    setContent(e.target.value)
  }, [])

  useEffect(() => {
    setWidth(document.documentElement.clientWidth + 'px')
    setHeight(document.documentElement.clientHeight + 'px')
  }, [])

  useEffect(()=>{
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth + 'px')
      setHeight(document.documentElement.clientHeight + 'px')
    }
    window.addEventListener('resize', handleResize, false)
    return () => window.removeEventListener('resize', handleResize, false)
  })

  return <>
    {content}
    浏览器的宽高: {width}, {height}
    <Child onChange={handleOnChange} />
   
   </>
}

const Child = memo((props) => {
  console.log(props)
  return <input onChange={props.onChange} type='text' style={{border: '1px solid #eee'}}/>
})

export const UseCallback = () => {
  return<>
    <Parent/>
  </>
}
