import * as types from '../consts/ATypes'
import moment from 'moment'

const INITIAL_STATE = {
  dateFrom: { value: moment(null), status: null, message: '' },
  dateTo: { value: moment(null), status: null, message: '' },
  descriptionSearch: { value: '', status: null, message: '' }
}

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ON_SEARCH_PRODUCT_FORM_INPUT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
export default searchReducer
