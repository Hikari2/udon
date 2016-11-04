import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { logout } from '../actions'

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon.Button name='close' backgroundColor='#3b5998' onPress={this.props.onLogoutClick}>
          Logout
        </Icon.Button>
        <Icon.Button name='navicon' backgroundColor='#d3d3d3' onPress={Actions.drawer} />
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logout())
    },

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
