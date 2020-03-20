
import React from 'react'
import storeContext from './storeContext'

const Provider = ({ store, children }) => {
  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  )
}

export default Provider