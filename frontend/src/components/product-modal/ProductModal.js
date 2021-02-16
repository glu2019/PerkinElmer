import React, { Component } from 'react'
import {
  resetProductState,
  onCreateProductFormSubmit,
  onEditProductFormSubmit,
  onCreateProductInput,
  catchProductSuccess,
  catchEditProductSuccess,
  catchProductError,
  onCloseModal,
  fetchProducts
} from '../../actions'
import { isEmpty } from "lodash"
import SvgIcon from 'react-icons-kit'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal'
import { DatetimePickerTrigger } from 'rc-datetime-picker'
import 'rc-datetime-picker/dist/picker.css'
import './product-modal.css'
import moment from 'moment'
import { calendar } from 'react-icons-kit/icomoon/calendar'

class ProductModal extends Component {
  constructor (props) {
    super(props)
  }

  onSubmit = e => {
    e.preventDefault()
    let promise = null
    if (this.props.id) {
      promise = this.props.onEditProductFormSubmit()
    } else {
      promise = this.props.onCreateProductFormSubmit()
    }

    if (promise instanceof Promise) {
      promise
        .then(res => {
          if (this.props.id) {
            this.props.fetchProducts()
            this.props.catchEditProductSuccess(res)
          } else {
            this.props.fetchProducts()
            this.props.catchProductSuccess(res)
          }
        })
        .catch(err => {
          this.props.catchProductError(err)
        })
    }
  }
  moment = (type, isInput) => {
    if (this.props.date.value.format('YYYY-MM-DD HH:mm') == 'Invalid date') {
      if (isInput) {
        return ''
      } else {
        return moment()
      }
    } else {
      if (isInput) {
        return this.props.date.value.format('YYYY-MM-DD HH:mm')
      } else {
        return this.props.date.value
      }
    }
  }
  render () {
    const shortcuts = {
      'Last Year': moment().subtract(1, 'years'),
      'Next Year': moment().add(1, 'years'),
      Clear: moment(null)
    }
    return (
      <div>
        <Modal
          open={this.props.openModal}
          onClose={this.props.onCloseModal}
          classNames={{ modal: 'form-style-create' }}
          center
        >
          <h2>{this.props.id ? 'Edit ' +  this.props.description.value : 'Create New'}</h2>
          <form onSubmit={this.onSubmit}>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Form.Group validationState={this.props.productId.status}>
                  <Form.Control
                    type='number'
                    name='product-id'
                    value={this.props.productId.value}
                    placeholder='ID*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                </Form.Group>
                {isEmpty(this.props.productId.message)
                    ? null
                    : <small className="danger">{this.props.productId.message}</small>}
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Form.Group validationState={this.props.description.status}>
                  <Form.Control
                    type='text'
                    name='description'
                    value={this.props.description.value}
                    placeholder='Description*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                </Form.Group>
                {isEmpty(this.props.description.message)
                    ? null
                    : <small className="danger">{this.props.description.message}</small>}
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div id='date-picker-container'>
                  <DatetimePickerTrigger
                    shortcuts={shortcuts}
                    moment={this.moment('date', false)}
                    onChange={m =>
                      this.props.onCreateProductInput({
                        target: { name: 'date', value: m }
                      })}
                    className='date-picker-custom'
                  >
                    <Form.Group validationState={this.props.date.status}>
                      <Form.Control
                        type='text'
                        name='date'
                        value={this.moment('date', true)}
                        placeholder='Date time*'
                      />
                      <span className='input_border' />
                    </Form.Group>
                    {isEmpty(this.props.date.message)
                        ? null
                        : <small className='danger'>{this.props.date.message}</small>}
                     <SvgIcon
                        size={20}
                        icon={calendar}
                        className='calendar-icon-modal'
                        />
                  </DatetimePickerTrigger>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Form.Group validationState={this.props.elevation.status}>
                  <Form.Control
                    type='text'
                    name='elevation'
                    value={this.props.elevation.value}
                    placeholder='Elevation*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                </Form.Group>
                {isEmpty(this.props.elevation.message)
                    ? null
                    : <small className="danger">{this.props.elevation.message}</small>}
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Form.Group validationState={this.props.longitude.status}>
                  <Form.Control
                    type='text'
                    name='longitude'
                    value={this.props.longitude.value}
                    placeholder='Longitude*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                </Form.Group>
                {isEmpty(this.props.longitude.message)
                    ? null
                    : <small className="danger">{this.props.longitude.message}</small>}
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Form.Group validationState={this.props.latitude.status}>
                  <Form.Control
                    type='text'
                    name='latitude'
                    value={this.props.latitude.value}
                    placeholder='Latitude*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                </Form.Group>
                {isEmpty(this.props.latitude.message)
                    ? null
                    : <small className="danger">{this.props.latitude.message}</small>}
              </Col>
            </Row>
            <Row>
              <Button type='submit' className='submit'>
                {this.props.id ? 'Update' : 'Create'}
              </Button>
            </Row>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.createProductReducer.id,
    productId: state.createProductReducer.productId,
    description: state.createProductReducer.description,
    elevation: state.createProductReducer.elevation,
    longitude: state.createProductReducer.longitude,
    latitude: state.createProductReducer.latitude,
    date: state.createProductReducer.date,
    openModal: state.createProductReducer.openModal
  }
}
const mapDispatchToProps = {
  resetProductState,
  onCreateProductFormSubmit,
  onEditProductFormSubmit,
  onCreateProductInput,
  catchProductSuccess,
  catchEditProductSuccess,
  catchProductError,
  onCloseModal,
  fetchProducts
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductModal)
)
