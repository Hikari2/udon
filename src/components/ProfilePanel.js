import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import Communications from 'react-native-communications'

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'rgb(224,224,224)'}
        onPress={() => {
          const uid = this.props.user.fbuid ? this.props.user.fbuid : this.props.user.providerData[0].uid
          Communications.web('https://facebook.com/' + uid)
        }}>
        <View style={[styles.container, {width: this.props.width}]}>
          <View style={styles.pictureContainer}>
            <Image source={{uri: this.props.user.photoURL}} style={styles.picture} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>{this.props.user.displayName}</Text>
            <Text style={styles.email} numberOfLines={1}>{this.props.user.email}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

Card.propTypes = {
  width: React.PropTypes.number,
  user: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 7
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picture: {
    borderRadius: 5,
    height: 50,
    width: 50
  },
  textContainer: {
    flex: 5,
    paddingLeft: 5,
    justifyContent:'flex-start',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgb(81,81,81)'
  },
  email: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold'
  }
})
