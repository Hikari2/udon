import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { logout, getFaceBookGraph } from '../actions'

class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
          <Icon.Button
            name='close'
            color='#000000'
            backgroundColor='#ffffff'
            onPress={this.props.onLogoutClick}
          >aa
          </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(getFaceBookGraph())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
