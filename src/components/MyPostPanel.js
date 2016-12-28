import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

export default class MyPostPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'#d3d3d3'}
        onPress={this.props.onPress}>
        <View style={[styles.container, {width: this.props.width}]}>
          {
            this.props.data.photos[0] ?
            <Image
              source={{uri: this.props.data.photos[0].url}}
              style={styles.picture} /> :
            <View style={styles.picture} />
          }
          <View style={styles.textContainer}>
            <Text style={styles.heading} numberOfLines={1}>{this.props.data.heading}</Text>
            <Text style={styles.county}>{this.props.data.county}</Text>
            <View style={styles.footer}>
              <Text style={styles.price} numberOfLines={1}>{this.props.data.price + ' :-'}</Text>
              <Text style={styles.date}>{this.props.data.date}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

MyPostPanel.propTypes = {
  width: React.PropTypes.number,
  onPress: React.PropTypes.func,
  data: React.PropTypes.shape({
    heading: React.PropTypes.string,
    date: React.PropTypes.string,
    photos: React.PropTypes.array,
    county: React.PropTypes.string,
    price: React.PropTypes.number
  })
}

const styles = StyleSheet.create({
  container: {
    height: 67,
    flexDirection: 'row',
    padding: 7,
    borderBottomWidth: 0.4,
    borderBottomColor: '#b2b2b2'
  },
  picture: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1.8,
    paddingLeft: 5
  },
  heading: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  county: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400'
  },
  footer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  date: {
    fontSize: 12,
    fontWeight: '400'
  },
  price: {
    color: 'rgb(247,141,40)',
    fontSize: 14,
    fontWeight: '600'
  }
})
