
import * as types from '../consts/ATypes'
import _ from 'lodash'


export const onSearchInput = e => (dispatch, getState) => {
    let payload = _.cloneDeep(getState().searchReducer)
    let products = _.cloneDeep(getState().productReducer)
    let productsFilter =products.originProducts
    switch (e.target.name) {
      case 'date-from':
        if (e.target.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
          payload.dateFrom.status = 'error'
        } 
         
        payload.dateFrom.value = e.target.value
        break
      case 'date-to':
        if (e.target.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
          payload.dateTo.status = 'error'
        }
         
        payload.dateTo.value = e.target.value
        break
      case 'description-search':
        if (!e.target.value.toString().trim().length) {
          payload.descriptionSearch.status = 'error'
        }
        payload.descriptionSearch.value = e.target.value
        break
    }
    if(payload.dateFrom.value.format('YYYY-MM-DD HH:mm') != 'Invalid date'){
      productsFilter = productsFilter.filter(c => {
        if (
          c.date_time >= payload.dateFrom.value.format('YYYY-MM-DD HH:mm')
        ) {
          return c
        }
      })
    }
    if(payload.dateTo.value.format('YYYY-MM-DD HH:mm') != 'Invalid date'){
      productsFilter = productsFilter.filter(c => {
        if (
          c.date_time <= payload.dateTo.value.format('YYYY-MM-DD HH:mm')
        ) {
          return c
        }
      })
    }
    if(!_.isEmpty(payload.descriptionSearch.value)){
      productsFilter = productsFilter.filter(c => {
        if (
          c.description.includes(e.target.value) ||
          c.product_id == e.target.value
        ) {
          return c
        }
      })
    }
    dispatch({ type: types.FETCH_PRODUCTS, products: productsFilter })
  
    return dispatch({
      type: types.ON_SEARCH_PRODUCT_FORM_INPUT,
      payload
    })
  }