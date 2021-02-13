import * as types from '../consts/ATypes'

const INITIAL_STATE = {
  isLoading: false,
  isHidden: true,
  error: '',
  products: [],
  originProducts: [],
  message: '',
  status: null,
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case types.IS_HIDDEN:
      return {
        ...state,
        isHidden: action.isHidden
      }
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case types.FETCH_ORIGIN_PRODUCTS:
      return {
        ...state,
        originProducts: action.originProducts
      }
    case types.SERVER_RESPONSE:
      return {
        ...state,
        ...action.payload
      }
    case types.SERVER_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
export default productReducer
