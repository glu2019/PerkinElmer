import React, { Component } from 'react'
import LoadingScreen from 'react-loading-screen'
import './loading.css'

class Loading extends Component {
  render () {
    if (this.props.isLoading) {
      return (
        <div className='loading'>
          <LoadingScreen
            loading
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
          >
          <div>
            {/* add content here if needed */}
          </div>
          </LoadingScreen>
        </div>
      )
    }
    return <div />
  }
}

export default Loading
