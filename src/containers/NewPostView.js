import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import {publish} from '../actions/post'
import PostForm from '../components/PostForm'

const { width } = Dimensions.get('window')

class NewPostView extends Component {
  constructor(props) {
    super(props)
    this.state = {

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
          user={this.props.user}
          pets={this.props.pets}
          width={width}
          onSubmit={(post) => {
            console.log(post)
            this.props.onSubmit(post)
          }} />
      </View>
    )
  }
}

NewPostView.propTypes = {
  loading: React.PropTypes.bool,
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
    loading: state.post.isPublishing,
    user: state.auth.isAuthenticated ? state.auth.user.providerData[0] : {},
    pets: state.pet.myPets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (post) => {
      dispatch(publish(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostView)
