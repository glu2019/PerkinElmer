import React, { Component } from 'react'
import './header.css'
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav'
import SvgIcon from 'react-icons-kit'
import { ic_business_center } from 'react-icons-kit/md/ic_business_center'
import { withRouter } from 'react-router-dom'
import texada from './texada-logo.png'
import { plus } from 'react-icons-kit/entypo/plus'
import { resetProductState } from '../../../actions'
import { connect } from 'react-redux'

let BaseContainer = props => (
  <div
    style={{
      display: 'inline-block',
      paddingTop: 16,
      paddingBottom: 16,
      fontFamily: 'Roboto',
      color: '#fff',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      width: 100,
      ...props.style
    }}
  >
    {props.children}
  </div>
)

class Header extends Component {
  render () {
    return (
      <div id='header'>
        <BaseContainer>
          <SideNav
            hoverBgColor='rgb(210, 209, 207)'
            highlightBgColor='#00acac'
            selected='customers/sales2'
            highlightColor='#FFF'
          >
            <div />
            <Nav
              onNavClick={() => {
                this.props.history.push('/')
              }}
            >
              <NavIcon className='texada'>
                <img id='texada-logo' src={texada} />
              </NavIcon>
              {/* <NavText> Dashboard </NavText> */}
            </Nav>
            <Nav
              onNavClick={() => {
                this.props.history.push('/')
              }}
            >
              <NavIcon className='header-list-icon'>
                <SvgIcon size={20} icon={ic_business_center} />
              </NavIcon>
              <NavText> Products </NavText>
            </Nav>
            <Nav onNavClick={this.props.resetProductState.bind(this, null)}>
              <NavIcon>
                <SvgIcon size={30} icon={plus} className='header-create-icon' />
              </NavIcon>
            </Nav>
          </SideNav>
        </BaseContainer>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
