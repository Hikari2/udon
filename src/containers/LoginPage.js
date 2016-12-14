import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { loginFaceBook, checkLogin } from '../actions/auth'

class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo_fade.jpg')} style={{height: 125, width: 125}} />
        <View style={styles.buttonContainer}>
          <Icon.Button name="facebook" backgroundColor="#3b5998" style={styles.button} onPress={this.props.faceBookLogin}>
            Login with Facebook
          </Icon.Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  button: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius: 0,
  },
  button_text: {
    fontSize: 20,
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(checkLogin())
    },
    faceBookLogin: () => {
      dispatch(loginFaceBook())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
