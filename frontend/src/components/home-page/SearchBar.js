import React, { Component } from 'react'
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap'
import { onSearchInput } from '../../actions'
import moment from 'moment'
import { DatetimePickerTrigger } from 'rc-datetime-picker'
import 'rc-datetime-picker/dist/picker.css'
import { connect } from 'react-redux'
import { calendar } from 'react-icons-kit/icomoon/calendar'
import { search } from 'react-icons-kit/icomoon/search'
import SvgIcon from 'react-icons-kit'
import { cross } from 'react-icons-kit/entypo/cross'

class SearchBar extends Component {
  moment = (type, isInput) => {
    switch (type) {
      case 'date-from':
        if (
          this.props.dateFrom.value.format('YYYY-MM-DD HH:mm') == 'Invalid date'
        ) {
          if (isInput) {
            return ''
          } else {
            return moment()
          }
        } else {
          if (isInput) {
            return this.props.dateFrom.value.format('YYYY-MM-DD HH:mm')
          } else {
            return this.props.dateFrom.value
          }
        }
      case 'date-to':
        if (
          this.props.dateTo.value.format('YYYY-MM-DD HH:mm') == 'Invalid date'
        ) {
          if (isInput) {
            return ''
          } else {
            return moment()
          }
        } else {
          if (isInput) {
            return this.props.dateTo.value.format('YYYY-MM-DD HH:mm')
          } else {
            return this.props.dateTo.value
          }
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
        <Row id='search-bar' className='form-style-search-bar'>
          <Col
            lg={7}
            md={7}
            sm={7}
            xs={12}
            className='table-single-line-nopadding'
          >
            <Col lg={6} md={6} sm={6} xs={12}>
              <FormGroup>
                <DatetimePickerTrigger
                  shortcuts={shortcuts}
                  moment={this.moment('date-from', false)}
                  onChange={m =>
                    this.props.onSearchInput({
                      target: { name: 'date-from', value: m }
                    })}
                  className='date-picker-custom'
                >
                  <FormControl
                    type='text'
                    name={'date-from'}
                    value={this.moment('date-from', true)}
                    placeholder='Date from'
                    readOnly
                  />
                  <span className='input_border' />
                  {this.props.dateFrom.value.format('YYYY-MM-DD HH:mm') ==
                    'Invalid date'
                    ? <SvgIcon
                      size={20}
                      icon={calendar}
                      className='bar-icon in'
                      />
                    : null}
                </DatetimePickerTrigger>
                {this.props.dateFrom.value.format('YYYY-MM-DD HH:mm') ==
                  'Invalid date'
                  ? null
                  : <SvgIcon
                    size={20}
                    icon={cross}
                    className='bar-icon out'
                    onClick={m =>
                        this.props.onSearchInput({
                          target: { name: 'date-from', value: moment(null) }
                        })}
                    />}
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <FormGroup>
                <DatetimePickerTrigger
                  shortcuts={shortcuts}
                  moment={this.moment('date-to', false)}
                  onChange={m =>
                    this.props.onSearchInput({
                      target: { name: 'date-to', value: m }
                    })}
                  className='date-picker-custom'
                >
                  <FormControl
                    type='text'
                    name={'date-to'}
                    value={this.moment('date-to', true)}
                    placeholder='Date to'
                    readOnly
                  />
                  <span className='input_border' />
                  {this.props.dateTo.value.format('YYYY-MM-DD HH:mm') ==
                    'Invalid date'
                    ? <SvgIcon
                      size={20}
                      icon={calendar}
                      className='bar-icon in'
                      />
                    : null}

                </DatetimePickerTrigger>
                {this.props.dateTo.value.format('YYYY-MM-DD HH:mm') ==
                  'Invalid date'
                  ? null
                  : <SvgIcon
                    size={20}
                    icon={cross}
                    className='bar-icon out'
                    onClick={m =>
                        this.props.onSearchInput({
                          target: { name: 'date-to', value: moment(null) }
                        })}
                    />}
              </FormGroup>
            </Col>
          </Col>
          <Col lg={4} md={4} sm={4} xs={12} className='pull-right'>
            <FormGroup>
              <FormControl
                type='text'
                name='description-search'
                value={this.props.descriptionSearch.value}
                onChange={this.props.onSearchInput}
                placeholder='Search by description or ID'
              />
              <span className='input_border' />
              {_.isEmpty(this.props.descriptionSearch.value)
                ? <SvgIcon size={20} icon={search} className='search-icon' />
                : <SvgIcon
                  size={20}
                  icon={cross}
                  className='bar-icon search'
                  onClick={m =>
                      this.props.onSearchInput({
                        target: { name: 'description-search', value: '' }
                      })}
                  />}
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    dateFrom: state.searchReducer.dateFrom,
    dateTo: state.searchReducer.dateTo,
    descriptionSearch: state.searchReducer.descriptionSearch
  }
}

const mapDispatchToProps = {
  onSearchInput
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
