import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {getMyPosts} from '../actions/post'

class MyPostsView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMyPosts()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <ActivityIndicator /> : this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return (
      this.props.myPosts.map((post, i) => {
        return(
          <View style={styles.postContainer} key={`post-${i}`}>
            <View style={styles.pictureContainer}>
              {post.photos ? <Image source={{uri: post.photos[0].path}} style={styles.picture}/> : <Text style={styles.picture}>No Image</Text>}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{post.date}</Text>
              <Text style={styles.text}>{post.values.heading}</Text>
              <Text style={styles.text}>{post.values.county}</Text>
              <Text style={styles.text}>{post.values.type}</Text>
              <Text style={styles.text}>{post.values.price ? post.values.price + ' SEK' : ' '}</Text>
            </View>
          </View>
        )
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 5
  },
  postContainer: {
    width: 320,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2',
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#2B3856',
    fontSize: 16,
    fontFamily: 'Helvetica'
  },
  picture: {
    width: 100,
    height: 100
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isSearchingOwn,
    myPosts: state.post.myPosts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPosts: () => {
      dispatch(getMyPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsView)
