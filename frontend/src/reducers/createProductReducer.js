import * as types from '../consts/ATypes'
import moment from 'moment'

const INITIAL_STATE = {
  id: null,
  productId: { value: '', status: null, message: '' },
  description: { value: '', status: null, message: '' },
  date: { value: moment(null), status: null, message: '' },
  elevation: { value: '', status: null, message: '' },
  longitude: { value: '', status: null, message: '' },
  latitude: { value: '', status: null, message: '' },
  openModal: false
}

const createProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ON_CREATE_PRODUCT_FORM_INPUT:
      return {
        ...state,
        ...action.payload
      }
    case types.ON_CREATE_PRODUCT_FORM_SUBMIT:
      return {
        ...state,
        ...action.payload
      }
    case types.EDIT_PRODUCT:
      return {
        ...state,
        ...action.payload
      }
    case types.RESET_CREATE_PRODUCT_STATE:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state
  }
}
export default createProductReducer
