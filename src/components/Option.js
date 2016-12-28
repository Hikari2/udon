import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Option extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'rgb(224,224,224)'}
        onPress={this.props.onPress}>
        <View style={[styles.container, {width: this.props.width, height: this.props.height}]}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, {backgroundColor: this.props.background}]}>
              <Icon
                name={this.props.icon}
                size={this.props.size}
                underlayColor='grey'
                color={'white'}
                style={styles.icon}/>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>{this.props.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

Option.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  size: React.PropTypes.number,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  background: React.PropTypes.string,
  onPress: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {

  },
  textContainer: {
    flex: 3,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 5
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold'
  }
})
