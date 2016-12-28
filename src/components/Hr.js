import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

export default class Hr extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={
          [styles.container,
            {
              width: this.props.width,
              height: this.props.height,
              backgroundColor: this.props.color
            }
          ]}
      />
    )
  }
}

Hr.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12
  }
})
