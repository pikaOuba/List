
const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'
const TESTONE = 'counter/TESTONE'

export default (state = {count: 0}, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log('increment', state)
      return {
        ...state,
        count: state.count + 1
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
    case TESTONE:
      return {
        ...state,
        text: 'hhhh'
      }
    default:
      return {
        ...state
      }
  }
}

export const addCount = () => {
  return {
    type: INCREMENT,
  }
}

export const decrementCount = () => {
  return {
    type: DECREMENT
  }
}

export const testText = () => {
  return {
    type: TESTONE
  }
}