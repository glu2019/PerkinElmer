import React, { Component } from 'react'
import Header from '../common/header/Header'
import {
  fetchProducts,
  resetProductState,
  onDeleteProduct,
  catchDeleteProductSuccess,
  catchProductError
} from '../../actions'
import './home-page.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ProductModal from '../product-modal/ProductModal'
import Loading from '../common/loading/Loading'
import Message from '../common/message/Message'
import moment from 'moment'
import 'rc-datetime-picker/dist/picker.css'
import SearchBar from './SearchBar'
import SvgIcon from 'react-icons-kit'
import { cross } from 'react-icons-kit/entypo/cross'
import { edit } from 'react-icons-kit/entypo/edit'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filesToBeSent: []
    }
  }
  componentDidMount () {
    this.props.fetchProducts()
  }
  onDelete = id => {
    let promise = null
    promise = this.props.onDeleteProduct(id)
    let product = this.props.products.find(x => x.id == id)
    if (promise instanceof Promise) {
      promise
        .then(res => {
          this.props.fetchProducts()
          this.props.catchDeleteProductSuccess(product.description)
        })
        .catch(err => {
          this.props.catchProductError(err)
        })
    }
  }
  render () {
    return (
      <div id='home-page'>
        <Loading isLoading={this.props.isLoading} />
        <Header active={1} />
        <div id='main-page'>
          <div id='content'>
            <h1 id='dashboard-title'>
              Products
            </h1>
            <ProductModal />
            <Message
              status={
                !_.isEmpty(this.props.status)
                  ? this.props.status
                  : this.props.transStatus
              }
              isHidden={this.props.isHidden}
            >
              <p>
                {!_.isEmpty(this.props.message)
                  ? this.props.message
                  : this.props.transMessage}
              </p>
            </Message>
            <div id='table-container'>
              <SearchBar />
              <ReactTable
                data={this.props.products}
                style={{
                  height: 450
                }}
                columns={[
                  {
                    Header: 'ID',
                    width: 50,
                    accessor: 'product_id'
                  },
                  {
                    Header: 'Description',
                    accessor: 'description'
                  },
                  {
                    Header: 'Date',
                    id: 'date_time',
                    accessor: d =>
                      moment(d.date_time).format('YYYY-MM-DD HH:mm')
                  },
                  {
                    Header: 'Longitude',
                    accessor: 'lng'
                  },
                  {
                    Header: 'Latitude',
                    accessor: 'lat'
                  },
                  {
                    Header: 'Elevation',
                    accessor: 'elevation'
                  },
                  {
                    Header: '',
                    accessor: 'id',
                    width: 100,
                    Cell: row => (
                      <div>
                        <SvgIcon
                          size={20}
                          icon={edit}
                          className='product-icon edit-product-icon'
                          onClick={this.props.resetProductState.bind(
                            this,
                            row.value
                          )}
                        />
                        <SvgIcon
                          size={20}
                          icon={cross}
                          className='product-icon delete-product-icon'
                          onClick={this.onDelete.bind(this, row.value)}
                        />
                      </div>
                    )
                  }
                ]}
                defaultSorted={[
                  {
                    id: 'product_id',
                    desc: true
                  }
                ]}
                defaultPageSize={10}
                className='-striped -highlight custom-table-style'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.productReducer.isLoading,
    isHidden: state.productReducer.isHidden,
    error: state.productReducer.error,
    message: state.productReducer.message,
    status: state.productReducer.status,
    products: state.productReducer.products
  }
}
const mapDispatchToProps = {
  fetchProducts,
  resetProductState,
  onDeleteProduct,
  catchDeleteProductSuccess,
  catchProductError
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
)
