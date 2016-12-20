import React, { Component } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {updatePet} from '../actions/pet'
import Icon from 'react-native-vector-icons/FontAwesome'
import PetForm from '../components/PetForm'
import ImagePicker  from 'react-native-image-picker'

class EditPetView extends Component {
  constructor(props) {
    super(props)
    const bool = props.data.photo !== ''
    this.state = {
      camera: bool,
      photo: {path: props.data.photo}
    }
  }
  render() {
    return this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderForm()
  }

  renderForm() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <PetForm
            pet={this.props.data}
            user={this.props.user}
            onSubmit={(pet) => {
              pet.photo = this.state.photo
              this.props.onSubmit(pet)
            }}>
            <View style={styles.photoContainer}>
            {
              this.state.photo.path ?
                <View style={styles.photoWrapper}>{this.savedPhoto(this.state.photo.path)}</View> :
                <View style={styles.photoWrapper}>{this.newPhoto()}</View>
            }
            </View>
          </PetForm>
        </View>
      </ScrollView>
    )
  }

  savedPhoto(path) {
    return (
      <TouchableHighlight onPress={() => this.addPhoto()}>
        <Image source={{uri: path}} style={{height: 100, width: 100}} />
      </TouchableHighlight>
    )
  }

  newPhoto() {
    return(
      <Icon.Button
        name='camera'
        size={30}
        color='black'
        backgroundColor='white'
        style={{borderRadius: 0}}
        iconStyle={{padding: 25, marginRight: 0}}
        onPress={() => this.addPhoto()} />
    )
  }

  addPhoto() {
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
        const photo = this.state.photo
        photo.path = source
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

const options = {
  title: '',
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
    flex: 1,
    alignItems: 'center'
  },
  photoWrapper: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 5
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.pet.isRegistering,
    user: state.auth.isAuthenticated ? state.auth.user.providerData[0] : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (pet) => {
      dispatch(updatePet(pet))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPetView)
