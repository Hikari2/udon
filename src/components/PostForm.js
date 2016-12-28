import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import t from 'tcomb-form-native'
import countyList from '../constants/county'
import {productCategory} from '../constants/category'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker  from 'react-native-image-picker'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    let photos
    if (props.post.photos) {
      photos = new Array(3 - props.post.photos.length)
      photos.fill({})
    }
    this.state = {
      pets: props.pets,
      petIndex: -1,
      photos: props.post.photos ? props.post.photos.concat(photos) : [{}, {}, {}],
      contact: {
        county: 'Stockholm',
        phone: props.post.phone ? props.post.phone : '',
        postal: props.post.postal ? props.post.postal : ''
      },
      post: {
        category: 'Other',
        heading: props.post.heading ? props.post.heading : '',
        description: props.post.description ? props.post.description : '',
        price: props.post.price ? props.post.price : '',
        sendable: 'No'
      }
    }
  }

  render() {
    return (
      <View style={[styles.container, {width: this.props.width * 0.95}]}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Contact Information</Text>
        </View>
        <Form
          ref='contact'
          type={Contact}
          options={options}
          value={this.state.contact}
          onChange={(contact) => {
            this.setState({contact})
          }}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Your advert</Text>
        </View>
        <Form
          ref='post'
          type={Post}
          options={options}
          value={this.state.post}
          onChange={(post) => {
            this.setState({post})
          }}
        />
        {
          this.props.pets ?
            <View>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Add previous user</Text>
              </View>
              <View style={styles.pets}>
                <ScrollView horizontal>
                {
                  this.props.pets.map((pet, i) => {
                    let borderColor = 'rgb(181,181,181)'
                    if (i === this.state.petIndex) {
                      borderColor = 'rgb(109, 214, 224)'
                    }

                    if(pet.photo) {
                      return (
                        <TouchableHighlight
                          key={`pet-${i}`}
                          style={styles.photoWrapper}
                          underlayColor={'rgb(228,228,228)'}
                          onPress={() => this.selectPet(i)}>
                            <Image source={{uri: pet.photo.url}} style={[styles.photoContainer, {borderColor}]} />
                        </TouchableHighlight>
                      )
                    } else {
                      return (
                        <TouchableHighlight
                          key={`pet-${i}`}
                          style={[styles.photoWrapper, {borderColor}]}
                          underlayColor={'rgb(228,228,228)'}
                          onPress={() => this.selectPet(i)}>
                          <View style={[styles.photoContainer, {borderColor}]}>
                            <Icon
                              name={'paw'}
                              size={35}
                              underlayColor='grey'
                              />
                            <Text>{pet.name}</Text>
                          </View>
                        </TouchableHighlight>
                      )
                    }
                  })
                }
                </ScrollView>
              </View>
            </View> : <View/>
        }
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Add pictures</Text>
        </View>
        <View style={styles.photos}>
          <ScrollView horizontal>
          {
            this.state.photos.map((image, i) => {
              if(image.url) {
                return <View style={styles.photoWrapper} key={`photo-${i}`}>{this.savedPhoto(i, image.url)}</View>
              } else {
                return <View style={styles.photoWrapper} key={`photo-${i}`}>{this.newPhoto(i)}</View>
              }
            })
          }
          </ScrollView>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>{
            const contact = this.refs.contact.getValue()
            const post = this.refs.post.getValue()
            const photos = this.state.photos

            if(contact && post) {
              let result
              if(this.state.pets && this.state.petIndex !== -1) {
                let pet = this.state.pets[this.state.petIndex]
                result = Object.assign({}, post, contact, {photos}, {pet})
              }
              result = Object.assign({}, post, contact, {photos})
              this.props.onSubmit(result)
            }
          }}
          underlayColor='rgb(88, 200, 211)'>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableHighlight>
      </View>
    )
  }

  selectPet(index) {
    if (index !== this.state.petIndex) {
      this.setState({petIndex: index})
    } else {
      this.setState({petIndex: -1})
    }
  }

  savedPhoto(index, path) {
    return (
      <TouchableHighlight
        underlayColor={'rgb(228,228,228)'}
        onPress={() => this.addPhoto(index)}>
          <Image source={{uri: path}} style={styles.photoContainer} />
      </TouchableHighlight>
    )
  }

  newPhoto(index) {
    return(
      <TouchableHighlight
        underlayColor={'rgb(228,228,228)'}
        onPress={() => this.addPhoto(index)}>
        <View style={styles.photoContainer}>
          <Icon
            name='camera'
            size={30}
            color='rgb(106,106,106)'
            borderRadius={0}
            backgroundColor='white'
            iconStyle={{marginRight: 0}}/>
        </View>
      </TouchableHighlight>
    )
  }

    addPhoto(index) {
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
          let photos = this.state.photos
          photos[index] = {url: source, modified: true}
          this.setState({photos})
        }
      })
    }
}

PostForm.propTypes = {
  post: React.PropTypes.object,
  pets: React.PropTypes.array,
  user: React.PropTypes.object,
  width: React.PropTypes.number,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.object
}

PostForm.defaultProps = {
  post: {}
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

const County = t.enums.of(countyList, 'County')
const Category = t.enums.of(productCategory, 'Category')
const Sendable = t.enums.of(['No', 'Yes'], 'Sendable')

const Form = t.form.Form
const Contact = t.struct({
  county: County,
  postal: t.maybe(t.Number),
  phone: t.maybe(t.Number),
})
const Post = t.struct({
  category: Category,
  heading: t.String,
  description: t.String,
  price: t.Number,
  sendable: Sendable
})


const stylesheet  = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheet .controlLabel = {
  normal: {
    marginBottom: 5,
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  },
  error: {
    marginBottom: 5,
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  }
}

stylesheet.select = {
  normal: {
    width: 160,
    color: 'rgb(148, 148, 148)',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5
  },
  error: {
    width: 160,
    color: 'rgb(148, 148, 148)',
    borderColor: 'red',
    borderWidth: 0.5
  }
}

stylesheet.textbox = {
  normal: {
    width: 200,
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5,
    marginBottom: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 35
  },
  error: {
    width: 200,
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'red',
    borderWidth: 0.5,
    marginBottom: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 35
  }
}

const stylesheetLarge  = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheetLarge.controlLabel = {
  normal: {
    marginBottom: 5,
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  },
  error: {
    marginBottom: 5,
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  }
}


stylesheetLarge.textbox = {
  normal: {
    width: 300,
    textAlignVertical: 'top',
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5
  },
  error: {
    width: 300,
    textAlignVertical: 'top',
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'red',
    borderWidth: 0.5
  }
}

const options = {
  fields: {
    county: {
      stylesheet,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    phone: {
      stylesheet,
      maxLength: 10,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    postal: {
      stylesheet,
      label: 'ZIP code (optional)',
      maxLength: 5,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    category: {
      stylesheet,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences',
    },
    heading: {
      stylesheet,
      maxLength: 40,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    description: {
      stylesheet: stylesheetLarge,
      multiline: true,
      numberOfLines: 6,
      maxLength: 120,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    price: {
      stylesheet,
      maxLength: 7,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    sendable: {
      stylesheet,
      label: 'Can send',
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  headingContainer: {
    marginTop: 25,
    marginBottom: 15
  },
  heading: {
    fontSize: 21,
    fontWeight: '600',
    color: 'rgb(128,128,128)',
  },
  pets: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  photos: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer: {
    height: 100,
    width: 100,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    elevation: 1,
    padding: 5,
    backgroundColor: 'rgb(109, 214, 224)',
    borderColor: '#D3D3D3',
    borderRadius: 0,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50
  }
})
