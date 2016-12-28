import React, { Component } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {update} from '../actions/pet'
import Icon from 'react-native-vector-icons/FontAwesome'
import PetForm from '../components/PetForm'
import ImagePicker  from 'react-native-image-picker'

const { width } = Dimensions.get('window')

class EditPetView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: this.props.data.key,
      photo: this.props.data.photo
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
          this.renderData()
        }
      </ScrollView>
    )
  }

  renderData() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {
            this.state.photo ?
            <TouchableHighlight onPress={() => this.addPhoto()}>
              <Image source={{uri: this.state.photo.url}} style={styles.photoContainer} />
            </TouchableHighlight> :
            <Icon.Button
              name='camera'
              size={50}
              color='black'
              borderRadius={0}
              backgroundColor='white'
              iconStyle={{marginRight: 0}}
              style={styles.photoContainer}
              onPress={() => {this.addPhoto() }} />
          }
        </View>
        <PetForm
          width={width}
          pet={this.props.data}
          onSubmit={(pet) => {
              pet.photo = this.state.photo,
              pet.key = this.state.key
              this.props.onSubmit(pet)
            }} />
      </View>
    )
  }

  addPhoto() {
    ImagePicker.showImagePicker(cameraOptions, (response) => {
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
        let photo = this.state.photo
        if (!photo) {
          photo = {}
        }
        photo = Object.assign({}, photo, {modified: true}, {url: source})
        this.setState({photo})
      }
    })
  }
}

EditPetView.propTypes = {
  loading: React.PropTypes.bool,
  data: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

const cameraOptions = {
  title: '',
  maxWidth: 900,
  maxHeight: 900,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  topContainer: {
    flexDirection: 'row'
  },
  photoContainer: {
    height: width * 0.6,
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(181,181,181)'
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.pet.isUpdating,
    user: state.auth.isAuthenticated ? state.auth.user : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (pet) => {
      dispatch(update(pet))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPetView)
