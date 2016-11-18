import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'
import t from 'tcomb-form-native'
import {registerPet} from '../actions/pet'
import countyList from '../constants/county'
import Icon from 'react-native-vector-icons/FontAwesome'
import {getSize} from '../constants/dog'

class NewPetView extends Component {
  constructor(props) {
    super(props)
    const user = props.user
    this.state = {
      camera: false,
      photo: '',
      value: {}
    }
  }

  render() {
    return this.props.loading ? <ActivityIndicator /> : this.renderForm()
  }

  renderForm() {
    return (
      <ScrollView>
        <View style={styles.container}>
            <Form
              ref='form'
              type={Dog}
              options={options}
              value={this.state.value}
              onChange={(value) => {
                this.setState({value})
              }}
            />
            <View style={styles.cameraContainer}>
              {this.state.camera ? this.renderCamera() : this.renderCameraButton()}
              <View style={styles.previewContainer}>
                <Image source={{uri: this.state.photo.path}} style={styles.previewImage} />
              </View>
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={()=>{
                const val = this.refs.form.getValue()
                if(val) {
                  this.props.onSubmit({
                    values: val,
                    size: getSize(val.weight),
                    photo: this.state.photo
                  })
                  Actions.pop()
                }
              }}
              underlayColor='#aa7243'>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }

  renderCameraButton() {
    return (
      <Icon.Button
        name='camera'
        backgroundColor='transparent'
        underlayColor='#aa7243'
        style={styles.cameraButton}
        iconStyle={styles.cameraIcon}
        onPress={() => this.setState({camera: true})} />
    )
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[Push]</Text>
      </Camera>
    )
  }

  takePicture() {
    this.camera.capture()
      .then((photo) => {
        this.setState({photo})
      })
      .catch(err => Alert.alert(err.toString()))
  }
}

const Form = t.form.Form
const Type = t.enums.of(['Selling', 'Buying'], 'Type')
const County = t.enums.of(countyList, 'County')

const Dog = t.struct({
  name: t.String,
  age: t.Number,
  weight: t.Number
})

const textArea = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
textArea.textbox.normal.borderRadius= 0
textArea.textbox.normal.height = 100
textArea.textbox.error.height= 100

const textField = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
textField.textbox.normal.borderRadius= 0
textField.textbox.error.borderRadius= 0
textField.textbox.notEditable.borderRadius= 0

const numberInput = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
numberInput.textbox.normal.width= 150
numberInput.textbox.normal.borderRadius= 0
numberInput.textbox.error.borderRadius= 0
numberInput.textbox.notEditable.borderRadius= 0

const options = {
  fields: {
    name: {
      stylesheet: textField,
      underlineColorAndroid: 'transparent'
    },
    age: {
      stylesheet: numberInput,
      underlineColorAndroid: 'transparent'
    },
    weight: {
      stylesheet: numberInput,
      underlineColorAndroid: 'transparent'
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 40,
    backgroundColor: '#ffffff'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#f4a460',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    height: 200,
    width: 200,
    margin: 25
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 5,
    fontSize: 12,
    alignSelf: 'center'
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4a460'
  },
  cameraIcon: {
    marginRight: 5,
    margin: 5,
    color: '#FFFFFF'
  },
  previewContainer: {
    flexDirection: 'row'
  },
  previewImage: {
    width: 100,
    height: 100,
    marginLeft: 5
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.pet.isRegistering,
    user: state.auth.isAuthenticated ? state.auth.user.providerData[0] : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (post) => {
      dispatch(registerPet(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPetView)
