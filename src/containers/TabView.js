import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class TabView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon.Button name='home' onPress={Actions.home}>Home</Icon.Button>
        <Icon.Button name='group' onPress={Actions.groups}>Groups</Icon.Button>
        <Icon.Button name='folder-open' onPress={Actions.search}>Folder</Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabView)
