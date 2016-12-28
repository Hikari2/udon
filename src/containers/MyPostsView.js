import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import {searchOwn} from '../actions/post'
import Card from '../components/Card'
import { Actions } from 'react-native-router-flux'

const { width } = Dimensions.get('window')

class MyPostsView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ?
          <ActivityIndicator
            style={{marginTop: 120, padding: 20, transform: [{scale: 1.7}]}}
            size={'large'}
            color={'rgb(247,141,40)'}/> :
          this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return (
      this.props.myPosts.map((post, i) => {
        return <Card data={post}
                key={`post-${i}`}
                width={width}
                onPress={()=> {
                  Actions.editPost({post: post})
                }}/>
      })
    )
  }
}

MyPostsView.propTypes = {
  onLoad: React.PropTypes.func,
  loading: React.PropTypes.bool,
  myPosts: React.PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isSearchingOwn,
    myPosts: state.post.myPosts,
    postCount: state.post.myPosts.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(searchOwn())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsView)
