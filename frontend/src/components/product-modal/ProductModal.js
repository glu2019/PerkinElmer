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
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SvgIcon from 'react-icons-kit'
import {
  FormGroup,
  FormControl,
  HelpBlock,
  Button,
  Row,
  Col
} from 'react-bootstrap'
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
                <FormGroup validationState={this.props.productId.status}>
                  <FormControl
                    type='number'
                    name='product-id'
                    value={this.props.productId.value}
                    placeholder='ID*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                  <FormControl.Feedback />
                  {_.isEmpty(this.props.productId.message)
                    ? null
                    : <HelpBlock>{this.props.productId.message}</HelpBlock>}
                </FormGroup>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup validationState={this.props.description.status}>
                  <FormControl
                    type='text'
                    name='description'
                    value={this.props.description.value}
                    placeholder='Description*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                  <FormControl.Feedback />
                  {_.isEmpty(this.props.description.message)
                    ? null
                    : <HelpBlock>{this.props.description.message}</HelpBlock>}
                </FormGroup>
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
                    <FormGroup validationState={this.props.date.status}>
                      <FormControl
                        type='text'
                        name='date'
                        value={this.moment('date', true)}
                        placeholder='Date time*'
                        readOnly
                      />
                      <span className='input_border' />
                      <FormControl.Feedback />
                      {_.isEmpty(this.props.date.message)
                        ? null
                        : <HelpBlock>{this.props.date.message}</HelpBlock>}
                    </FormGroup>
                    {this.props.date.value.format('YYYY-MM-DD HH:mm') ==
                      'Invalid date'
                      ? <SvgIcon
                        size={20}
                        icon={calendar}
                        className='calendar-icon-modal'
                        />
                      : null}
                  </DatetimePickerTrigger>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup validationState={this.props.elevation.status}>
                  <FormControl
                    type='text'
                    name='elevation'
                    value={this.props.elevation.value}
                    placeholder='Elevation*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                  <FormControl.Feedback />
                  {_.isEmpty(this.props.elevation.message)
                    ? null
                    : <HelpBlock>{this.props.elevation.message}</HelpBlock>}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup validationState={this.props.longitude.status}>
                  <FormControl
                    type='text'
                    name='longitude'
                    value={this.props.longitude.value}
                    placeholder='Longitude*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                  <FormControl.Feedback />
                  {_.isEmpty(this.props.longitude.message)
                    ? null
                    : <HelpBlock>{this.props.longitude.message}</HelpBlock>}
                </FormGroup>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup validationState={this.props.latitude.status}>
                  <FormControl
                    type='text'
                    name='latitude'
                    value={this.props.latitude.value}
                    placeholder='Latitude*'
                    onChange={this.props.onCreateProductInput}
                  />
                  <span className='input_border' />
                  <FormControl.Feedback />
                  {_.isEmpty(this.props.latitude.message)
                    ? null
                    : <HelpBlock>{this.props.latitude.message}</HelpBlock>}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Button type='submit' bsStyle='primary' className='submit'>
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
