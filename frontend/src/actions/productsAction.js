import * as types from '../consts/ATypes'
import * as consts from '../consts/AppConsts'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export const onCloseModal = () => (dispatch, getState) => {
  return dispatch({
    type: types.RESET_CREATE_PRODUCT_STATE
  })
}

export const fetchProducts = () => (dispatch, getState) => {
  dispatch({ type: types.IS_LOADING, payload: true })
  let getUrl = consts.FETCH_PRODUCTS_URL
  return axios
    .get(getUrl)
    .then(res => {
      dispatch({ type: types.IS_LOADING, payload: false })
      if (!_.isEmpty(res.data)) {
        dispatch([
          { type: types.FETCH_PRODUCTS, products: res.data.results },
          {
            type: types.FETCH_ORIGIN_PRODUCTS,
            originProducts: res.data.results
          }
        ])
      }
    })
    .catch(err => {
      dispatch({ type: types.IS_LOADING, payload: false })
    })
}

export const resetProductState = id => (dispatch, getState) => {
  dispatch([
    {
      type: types.IS_HIDDEN,
      isHidden: true
    }
  ])
  let payload = _.cloneDeep(getState().createProductReducer)
  payload.openModal = true
  if (id) {
    let products = _.cloneDeep(getState().productReducer)
    let product = products.products.find(x => x.id == id)
    payload.id = id
    payload.productId.value = product.product_id
    payload.description.value = product.description
    payload.date.value = moment(product.date_time)
    payload.elevation.value = product.elevation
    payload.longitude.value = product.lng
    payload.latitude.value = product.lat
    return dispatch({
      type: types.EDIT_PRODUCT,
      payload
    })
  }
  return dispatch({
    type: types.EDIT_PRODUCT,
    payload
  })
}

export const onCreateProductInput = e => (dispatch, getState) => {
  let payload = _.cloneDeep(getState().createProductReducer)
  switch (e.target.name) {
    case 'product-id':
      if (!e.target.value.toString().trim().length) {
        payload.productId.status = 'error'
        payload.productId.message = 'The ID is required.'
      } else {
        payload.productId.status = 'success'
        payload.productId.message = ''
      }
      payload.productId.value = e.target.value
      break
    case 'description':
      if (!e.target.value.toString().trim().length) {
        payload.description.status = 'error'
        payload.description.message = 'The description is required.'
      } else {
        payload.description.status = 'success'
        payload.description.message = ''
      }
      payload.description.value = e.target.value
      break
    case 'date':
      if (e.target.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
        payload.date.status = 'error'
        payload.date.message = 'The date is required.'
      } else {
        payload.date.status = 'success'
        payload.date.message = ''
      }
      payload.date.value = e.target.value
      break
    case 'elevation':
      if (!e.target.value.toString().trim().length) {
        payload.elevation.status = 'error'
        payload.elevation.message = 'The elevation is required.'
      } else {
        payload.elevation.status = 'success'
        payload.elevation.message = ''
      }
      payload.elevation.value = e.target.value
      break
    case 'longitude':
      if (!e.target.value.toString().trim().length) {
        payload.longitude.status = 'error'
        payload.longitude.message = 'The longitude is required.'
      } else {
        payload.longitude.status = 'success'
        payload.longitude.message = ''
      }
      payload.longitude.value = e.target.value
      break
    case 'latitude':
      if (!e.target.value.toString().trim().length) {
        payload.latitude.status = 'error'
        payload.latitude.message = 'The latitude is required.'
      } else {
        payload.latitude.status = 'success'
        payload.latitude.message = ''
      }
      payload.latitude.value = e.target.value
      break
  }
  return dispatch({
    type: types.ON_CREATE_PRODUCT_FORM_INPUT,
    payload
  })
}

export const onCreateProductFormSubmit = e => (dispatch, getState) => {
  dispatch([
    {
      type: types.IS_HIDDEN,
      isHidden: true
    }
  ])
  let payload = _.cloneDeep(getState().createProductReducer)

  if (_.isEmpty(payload.productId.value.toString().trim())) {
    payload.productId.status = 'error'
    payload.productId.message = 'The ID is required.'
  }
  if (_.isEmpty(payload.description.value.toString().trim())) {
    payload.description.status = 'error'
    payload.description.message = 'The description is required.'
  }
  if (payload.date.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
    payload.date.status = 'error'
    payload.date.message = 'The date is required.'
  }
  if (_.isEmpty(payload.elevation.value.toString().trim())) {
    payload.elevation.status = 'error'
    payload.elevation.message = 'The elevation is required.'
  }
  if (_.isEmpty(payload.longitude.value.toString().trim())) {
    payload.longitude.status = 'error'
    payload.longitude.message = 'The longitude is required.'
  }
  if (_.isEmpty(payload.latitude.value.toString().trim())) {
    payload.latitude.status = 'error'
    payload.latitude.message = 'The latitude is required.'
  }
  console.log('444',payload.productId.status != 'error',
  payload.description.status != 'error',
  payload.date.status != 'error',
  payload.elevation.status != 'error' ,
  payload.longitude.status != 'error',
  payload.latitude.status != 'error')
  if (
    payload.productId.status != 'error' &&
    payload.description.status != 'error' &&
    payload.date.status != 'error' &&
    payload.elevation.status != 'error' &&
    payload.longitude.status != 'error' &&
    payload.latitude.status != 'error'
  ) {
    let productId = payload.productId.value
    let description = payload.description.value
    let date = payload.date.value.format('YYYY-MM-DD HH:mm')
    let elevation = payload.elevation.value
    let longitude = payload.longitude.value
    let latitude = payload.latitude.value
    payload.openModal = false
    let getUrl = consts.API_PRODUCT_URL
    let postData = {
      product_id: productId,
      description,
      date_time: date,
      elevation,
      lng: longitude,
      lat: latitude
    }
    dispatch([
      {
        type: types.IS_LOADING,
        payload: true
      }
    ])
    return axios.post(getUrl, postData)
  } else {
    dispatch({ type: types.IS_LOADING, payload: true })

    dispatch({
      type: types.ON_CREATE_PRODUCT_FORM_SUBMIT,
      payload
    })
    return dispatch({ type: types.IS_LOADING, payload: false })
  }
}

export const onEditProductFormSubmit = e => (dispatch, getState) => {
  dispatch([
    {
      type: types.IS_HIDDEN,
      isHidden: true
    }
  ])
  let payload = _.cloneDeep(getState().createProductReducer)

  if (_.isEmpty(payload.productId.value.toString().trim())) {
    payload.productId.status = 'error'
    payload.productId.message = 'The ID is required.'
  }
  if (_.isEmpty(payload.description.value.toString().trim())) {
    payload.description.status = 'error'
    payload.description.message = 'The description is required.'
  }
  if (payload.date.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
    payload.date.status = 'error'
    payload.date.message = 'The date is required.'
  }
  if (_.isEmpty(payload.elevation.value.toString().trim())) {
    payload.elevation.status = 'error'
    payload.elevation.message = 'The elevation is required.'
  }
  if (_.isEmpty(payload.longitude.value.toString().trim())) {
    payload.longitude.status = 'error'
    payload.longitude.message = 'The longitude is required.'
  }
  if (_.isEmpty(payload.latitude.value.toString().trim())) {
    payload.latitude.status = 'error'
    payload.latitude.message = 'The latitude is required.'
  }
  
  if (
    payload.productId.status != 'error' &&
    payload.description.status != 'error' &&
    payload.date.status != 'error' &&
    payload.elevation.status != 'error' &&
    payload.longitude.status != 'error' &&
    payload.latitude.status != 'error'
  ) {
    let productId = payload.productId.value
    let description = payload.description.value
    let date = payload.date.value.format('YYYY-MM-DD HH:mm')
    let elevation = payload.elevation.value
    let longitude = payload.longitude.value
    let latitude = payload.latitude.value
    payload.openModal = false
    let getUrl = consts.API_PRODUCT_URL + payload.id + '/'
    let postData = {
      product_id: productId,
      description,
      date_time: date,
      elevation,
      lng: longitude,
      lat: latitude
    }
    dispatch([
      {
        type: types.IS_LOADING,
        payload: true
      }
    ])
    return axios.put(getUrl, postData)
  } else {
    dispatch({ type: types.IS_LOADING, payload: true })

    dispatch({
      type: types.ON_CREATE_PRODUCT_FORM_SUBMIT,
      payload
    })
    return dispatch({ type: types.IS_LOADING, payload: false })
  }
}

export const onDeleteProduct = id => (dispatch, getState) => {
  dispatch({ type: types.IS_LOADING, payload: true })
  let getUrl = consts.API_DELETE_PRODUCT_URL + id + '/'
  return axios.delete(getUrl)
}

export const catchProductSuccess = res => (dispatch, getState) => {
  dispatch({ type: types.IS_LOADING, payload: false })
  let payload = _.cloneDeep(getState().productReducer)
  payload.status = 'success'
  payload.message =
    'New product #' + res.data.description + ' has been successfully created.'
  return dispatch([
    {
      type: types.SERVER_RESPONSE,
      payload
    },
    {
      type: types.IS_HIDDEN,
      isHidden: false
    },
    {
      type: types.RESET_CREATE_PRODUCT_STATE
    }
  ])
}

export const catchEditProductSuccess = res => (dispatch, getState) => {
  dispatch({ type: types.IS_LOADING, payload: false })
  let payload = _.cloneDeep(getState().productReducer)
  payload.status = 'success'
  payload.message =
    'New product #' + res.data.description + ' has been successfully updated.'
  payload.openModal = false
  return dispatch([
    {
      type: types.SERVER_RESPONSE,
      payload
    },
    {
      type: types.IS_HIDDEN,
      isHidden: false
    },
    {
      type: types.RESET_CREATE_PRODUCT_STATE
    }
  ])
}

export const catchDeleteProductSuccess = product_id => (dispatch, getState) => {
  dispatch({ type: types.IS_LOADING, payload: false })
  let payload = _.cloneDeep(getState().productReducer)
  payload.status = 'success'
  payload.message =
    'The product #' + product_id + ' has been successfully deleted.'
  return dispatch([
    {
      type: types.SERVER_RESPONSE,
      payload
    },
    {
      type: types.IS_HIDDEN,
      isHidden: false
    },
    {
      type: types.RESET_CREATE_PRODUCT_STATE
    }
  ])
}

export const catchProductError = err => (dispatch, getState) => {
  dispatch({
    type: types.IS_LOADING,
    payload: false
  })
  let payload = _.cloneDeep(getState().productReducer)
  if (!_.isEmpty(err.response)) {
    payload.status = 'danger'
    payload.message = consts.SERVER_ERROR_500
    payload.openModal = false
    return dispatch([
      {
        type: types.SERVER_RESPONSE,
        payload
      },
      {
        type: types.IS_HIDDEN,
        isHidden: false
      },
      {
        type: types.RESET_CREATE_PRODUCT_STATE
      }
    ])
  }
}
