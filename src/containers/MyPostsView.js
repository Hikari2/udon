import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import {getMyPosts} from '../actions/post'
import Card from '../components/Card'

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
        {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return (
      this.props.myPosts.map((post, i) => {
        return <Card data={post} key={`post-${i}`}/>
      })
    )
  }
}

MyPostsView.propTypes = {
  loading: React.PropTypes.bool,
  myPosts: React.PropTypes.array,
  getMyPosts: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 5
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
    getMyPosts: () => {
      dispatch(getMyPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsView)
