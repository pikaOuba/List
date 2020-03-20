import React, { useState, memo, useMemo } from 'react'
const Parent = () => {
  const [ count, setCount ] = useState(0)
  const [ clickedTimeCount, setClickedTimeCount] = useState(0)
  const timeOption = useMemo(()=> {//除非依赖项发生变化 不然是不会更新的 适合缓存变量
    return {clickedTimeCount}
  }, [clickedTimeCount])
  const handleClick = () => {
    setCount(count + 1)
  }

  const handleUpdateChild = () => {
    setClickedTimeCount( clickedTimeCount + 1 )
  }

  return <>
    <p>count: {count}</p>
    <button onClick={handleClick}>+1</button>
    <button onClick={handleUpdateChild}>点击我的时候 更新child 组件</button>
    <Child count={timeOption}/>
  </>
}

const Child = memo((props) => {//memo 函数如果加了第二个参数的户啊返回值是false 或者没有返回值的时候 都是会更新
   console.log('ChildProps', props)
  const date = new Date()
  return <>
    当前时间： {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
  </>
}, (prev, next) => {
  console.log(prev, next)
  return prev.count === next.count //当是相等时候不需要更新
})

//一般都是优化用的 
export const Usememo = () => {
  return <>
    <Parent/>
   
  </>
}