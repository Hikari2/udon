import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

const SideMenu = (props, context) => {
  return (
    <View style={styles.container}>
      <Text>Hej!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'lightblue'
  },
  button_text: {
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

export default SideMenu
