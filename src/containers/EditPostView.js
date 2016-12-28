import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { update } from '../actions/post'
import PostForm from '../components/PostForm'

const { width } = Dimensions.get('window')

class EditPostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: this.props.post.key
    }
  }

  render() {
    return (
      <ScrollView>
        {
          this.props.loading ?
          <ActivityIndicator
            style={{marginTop: 120, padding: 20, transform: [{scale: 1.7}]}}
            size={'large'}
            color={'rgb(247,141,40)'}/> :
          this.renderForms()
        }
      </ScrollView>
    )
  }

  renderForms() {
    return (
      <View style={styles.container}>
        <PostForm
          post={this.props.post}
          user={this.props.user}
          pets={this.props.pets}
          width={width}
          onSubmit={(post) => {
            post.key = this.state.key
            this.props.onSubmit(post)
          }} />
      </View>
    )
  }
}

EditPostView.propTypes = {
  loading: React.PropTypes.bool,
  post: React.PropTypes.object,
  user: React.PropTypes.object,
  pets: React.PropTypes.array,
  onSubmit: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  headingContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgb(128,128,128)',
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isUpdating,
    user: state.auth.isAuthenticated ? state.auth.user.providerData[0] : {},
    pets: state.pet.myPets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (post) => {
      dispatch(update(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostView)
