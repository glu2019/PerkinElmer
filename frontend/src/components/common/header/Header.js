import React, { Component } from 'react'
import './header.css'
import SvgIcon from 'react-icons-kit'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import { ic_business_center } from 'react-icons-kit/md/ic_business_center'
import { withRouter } from 'react-router-dom'
import logo from './perkin-elmer-logo.png'
import { plus } from 'react-icons-kit/entypo/plus'
import { resetProductState } from '../../../actions/productsAction'
import { connect } from 'react-redux'

class Header extends Component {
  render () {
    return (
      <div id='header'>
        <Navigation
            activeItemId="/"
            onSelect={({itemId}) => {
              if(itemId=='add'){
                this.props.resetProductState(null)
                return
              }
              this.props.history.push('/')
            }}
            items={[
              {
                title: '',
                itemId: '/',
                elemBefore: () => (<img id='company-logo' src={logo} />),
              },
              {
                title: 'Product',
                itemId: '/product',
                elemBefore: () => <SvgIcon size={20} icon={ic_business_center} />,
              },
              {
                title: 'New product',
                itemId: 'add',
                elemBefore: () => <SvgIcon size={20} icon={plus} />,
              },
            ]}
          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = {
  resetProductState
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
)
