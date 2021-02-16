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
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useTable } from 'react-table'
import { connect } from 'react-redux'
import { isEmpty } from "lodash"
import ProductModal from '../product-modal/ProductModal'
import Loading from '../common/loading/Loading'
import Message from '../common/message/Message'
import moment from 'moment'
import SearchBar from './SearchBar'
import SvgIcon from 'react-icons-kit'
import { cross } from 'react-icons-kit/entypo/cross'
import { edit } from 'react-icons-kit/entypo/edit'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <Styles>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </Styles>
  )
}

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
                !isEmpty(this.props.status)
                  ? this.props.status
                  : this.props.transStatus
              }
              isHidden={this.props.isHidden}
            >
              <p>
                {!isEmpty(this.props.message)
                  ? this.props.message
                  : this.props.transMessage}
              </p>
            </Message>
            <div id='table-container'>
              <SearchBar />
              <Table
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
