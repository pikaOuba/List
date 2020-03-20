import { useContext } from 'react'
import storeContext from './storeContext'

export default function useDispatch(seletorFn) {
  const store = useContext(storeContext)
  return store.dispatch
}
