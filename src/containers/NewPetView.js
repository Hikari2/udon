import React, { Component } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  Image,
  Text,
  ScrollView
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {register} from '../actions/pet'
import Icon from 'react-native-vector-icons/FontAwesome'
import PetForm from '../components/PetForm'
import ImagePicker  from 'react-native-image-picker'

const { width } = Dimensions.get('window')

class NewPetView extends Component {
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
            <TouchableHighlight
              underlayColor={'rgb(228,228,228)'}
              onPress={() => this.addPhoto()}>
              <Image source={{uri: this.state.photo}} style={styles.photoContainer} />
            </TouchableHighlight> :
            <TouchableHighlight
              underlayColor={'rgb(228,228,228)'}
              onPress={() => this.addPhoto()}>
              <View style={styles.photoContainer}>
                <Icon
                  name='camera'
                  size={50}
                  color='rgb(106,106,106)'
                  borderRadius={0}
                  backgroundColor='white'
                  iconStyle={{marginRight: 0}}/>
                  <Text>Add picture</Text>
              </View>
            </TouchableHighlight>
          }
        </View>
        <PetForm
          width={width}
          onSubmit={(pet) => {
              pet.photo = this.state.photo ? this.state.photo : ''
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

        this.setState({photo: source})
      }
    })
  }
}

NewPetView.propTypes = {
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
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
    loading: state.pet.isRegistering,
    user: state.auth.isAuthenticated ? state.auth.user : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (pet) => {
      dispatch(register(pet))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPetView)
