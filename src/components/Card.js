import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'#d3d3d3'}
        style={styles.container}
        onPress={this.props.onPress}>
          <View style={styles.container}>
            <View style={styles.pictureContainer}>
              {this.props.data.photos.length > 0 ?
                <Image source={{uri: this.props.data.photos[0].path}} style={styles.picture} /> :
                <Text>No Image</Text>}
            </View>
            <View style={styles.textContainer}>
              <Text style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif'}}>{this.props.data.heading}</Text>
              <Text style={{fontSize: 20, fontWeight: '100', fontFamily: 'sans-serif'}}>{this.props.data.category}</Text>
              <Text style={{fontSize: 16, fontWeight: '100', fontFamily: 'sans-serif'}}>{this.props.data.date}</Text>
              <Text style={{fontSize: 16, fontWeight: '100', fontFamily: 'sans-serif'}}>{this.props.data.county}</Text>
              <Text style={{fontSize: 16, fontWeight: '100', fontFamily: 'sans-serif'}}>{this.props.data.price ?
                this.props.data.price + ' :-' : ' '}</Text>
            </View>
          </View>
        </TouchableHighlight>
    )
  }
}

Card.propTypes = {
  onPress: React.PropTypes.func,
  data: React.PropTypes.shape({
    date: React.PropTypes.string,
    category: React.PropTypes.string,
    photos: React.PropTypes.array,
    uid: React.PropTypes.string,
    county: React.PropTypes.string,
    description: React.PropTypes.string,
    email: React.PropTypes.string,
    heading: React.PropTypes.string,
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    type: React.PropTypes.string
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  picture: {
    flex: 1,
    height: 100,
    width: 150
  }
})
