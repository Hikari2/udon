import React, { Component } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {updatePost} from '../actions/post'
import Icon from 'react-native-vector-icons/FontAwesome'
import PostForm from '../components/PostForm'
import ImagePicker  from 'react-native-image-picker'

class EditPostView extends Component {
  constructor(props) {
    super(props)
    //console.log(JSON.stringify(props.post, null, 2))
    this.state = {
      photos: props.post.photos
    }
  }

  render() {
    return this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderForm()
  }

  renderForm() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <PostForm user={this.props.user} pets={this.props.pets} post={this.props.post} onSubmit={(post) => {
            post.photos = this.state.photos
            this.props.onSubmit(post)
          }}>
            <View style={styles.photoContainer}>
              <ScrollView horizontal>
              {
                this.state.photos.map((image, i) => {
                  return <View style={styles.photoWrapper} key={`photo-${i}`}>{this.savedPhoto(i, image)}</View>
                })
              }
              </ScrollView>
            </View>
          </PostForm>
        </View>
      </ScrollView>
    )
  }

  savedPhoto(index, image) {
    return (
      <TouchableHighlight onPress={() => this.addPhoto(index)}>
        <Image source={{uri: image.path}} style={{height: 100, width: 100}} />
      </TouchableHighlight>
    )
  }

  newPhoto(index) {
    return(
      <Icon.Button
        name='camera'
        size={30}
        color='black'
        backgroundColor='white'
        style={{borderRadius: 0}}
        iconStyle={{padding: 25, marginRight: 0}}
        onPress={() => this.addPhoto(index)} />
    )
  }

  addPhoto(index) {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        Alert.alert('Whops! something went wrong')
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source
        if(Platform.OS === 'android') {
          source = response.uri
        } else {
          source = response.uri.replace('file://', '')
        }
        const photos = this.state.photos
        photos[index].path = source
        this.setState({photos})
      }
    })
  }
}

EditPostView.propTypes = {
  post: React.PropTypes.object,
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
  pets: React.PropTypes.array,
  onSubmit: React.PropTypes.func
}

const options = {
  title: '',
  maxWidth: 450,
  maxHeight: 450,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  photoContainer: {

  },
  photoWrapper: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 5
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    post: ownProps.post,
    loading: state.post.isPublishing,
    user: state.auth.isAuthenticated ? state.auth.user.providerData[0] : {},
    pets: state.pet.myPets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (post) => {
      dispatch(updatePost(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostView)
