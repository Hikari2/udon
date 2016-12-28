import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class PetPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'rgb(224,224,224)'}
        onPress={this.props.onPress}>
        <View style={[styles.container, {width: this.props.width}]}>
          <View style={styles.pictureContainer}>
            {
              this.props.data.photo ?
                <Image source={{uri: this.props.data.photo.url}} style={styles.picture} /> :
                <View style={styles.picture}>
                  <Icon
                    name={'paw'}
                    size={35}
                    underlayColor='grey'
                    />
                </View>
            }
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{this.props.data.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

PetPanel.propTypes = {
  width: React.PropTypes.number,
  data: React.PropTypes.object,
  onPress: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    width: 50
  },
  textContainer: {
    flex: 3,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 5
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold'
  },
  email: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold'
  }
})
