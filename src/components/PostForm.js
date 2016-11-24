import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native'
import t from 'tcomb-form-native'
import countyList from '../constants/county'
import {productCategory} from '../constants/category'
import { Actions } from 'react-native-router-flux'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    const user = props.user
    this.state = {
      value: {
        name: user.displayName,
        email: user.email,
        type: 'Selling',
        county: 'Stockholm',
        category: 'Other',
        ...props.post
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 19, fontWeight: '100'}}>Personal information</Text>
        </View>
        <Form
          ref='userForm'
          type={UserForm}
          options={options}
          value={this.state.value}
          onChange={(value) => {
            this.setState({value})
          }}
        />
        <View style={styles.header}>
          <Text style={{fontSize: 19, fontWeight: '100'}}>Posting content</Text>
        </View>
        <Form
          ref='postForm'
          type={PostingForm}
          options={options}
          value={this.state.value}
          onChange={(value) => {
            this.setState({value})
          }}
        />
        <View style={styles.header}>
          <Text style={{fontSize: 19, fontWeight: '100'}}>Product detail</Text>
        </View>
        {
          this.props.pets.length > 0 ?
          <View style={styles.subtitle}>
            <Text style={{fontSize: 12, fontWeight: '100'}}>{'You can use one of your pet profile'}</Text>
          </View> :
          <View/>
        }
        <View style={styles.petProfiles}>
          <ScrollView horizontal>
          {
            this.props.pets.map((pet, i) => {
              return <View style={styles.photoWrapper} key={`pet-${i}`}>{this.petProfile(i, pet.photo)}</View>
            })
          }
          </ScrollView>
        </View>
        <Form
          ref='productForm'
          type={getFormType(this.state.value.category)}
          options={options}
          value={this.state.value}
          onChange={(value) => {
            this.setState({value})
          }}
        />
        {this.props.children}
        <TouchableHighlight
          style={styles.button}
          onPress={()=>{
            const user = this.refs.userForm.getValue()
            const post = this.refs.postForm.getValue()
            const product = this.refs.productForm.getValue()
            if(user && post && product) {
              const newPost = {
                ...user,
                ...post,
                ...product,
                petProfile: this.state.value.petProfile ? this.state.value.petProfile : {}

              }
              this.props.post ? newPost.key = this.props.post.key : ''
              this.props.onSubmit(newPost)
              if(this.props.post) {
                Actions.pop()
              }
            }
          }}
          underlayColor='rgb(0, 191, 255)'>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  petProfile(index, path) {
    return (
      <TouchableHighlight onPress={() => {
        const pet = this.props.pets[index]

        this.setState({
          value: Object.assign({}, this.state.value, {
            back: pet.back,
            chest: pet.chest,
            neck: pet.neck,
            weight: pet.weight,
            petProfile: {
              name: pet.name,
              photo: pet.photo
            }
          })
        })
      }}
      >
        <Image source={{uri: path}} style={{height: 100, width: 100}} />
      </TouchableHighlight>
    )
  }
}

PostForm.propTypes = {
  user: React.PropTypes.object,
  post: React.PropTypes.object,
  pets: React.PropTypes.array,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.object
}

const Form = t.form.Form

const formStyle = JSON.parse(JSON.stringify(t.form.Form.stylesheet))

formStyle.controlLabel = {
  normal: {
    color: 'rgb(144, 73, 5)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(144, 73, 5)',
    fontWeight: 'bold'
  }
}

formStyle.textbox = {
  normal: {
    fontSize: 18,
    fontWeight: '100'
  },
  error: {
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1
  }
}

const UserForm = t.struct({
  name: t.String,
  email: t.String
})

const Type = t.enums({Selling: 'Selling', Buying: 'Buying'})
const County = t.enums.of(countyList, 'County')
const Category = t.enums.of(productCategory, 'Category')

const PostingForm = t.struct({
  category: Category,
  heading: t.String,
  description: t.String,
  county: County,
  price: t.Number
})

const Other = t.struct({

})

const Toys = t.struct({

})

const Cloth = t.struct({
  neck: t.Number,
  back: t.Number,
  chest: t.Number
})

const Collar = t.struct({
  weight: t.Number,
  neck: t.Number
})

const Harness = t.struct({
  weight: t.Number,
  neck: t.Number,
  chest: t.Number
})

const options = {
  stylesheet: formStyle,
  fields: {
    name: {

    },
    email: {
      editable: false
    },
    type: {

    },
    heading: {
      autoCapitalize: 'sentences'
    },
    description: {
      numberOfLines: 5,
      textAlignVertical: 'top',
      autoCapitalize: 'sentences',
      multiline: true
    },
    county: {

    },
    price: {

    },
    weight: {
      placeholder: 'kg'
    },
    neck: {
      placeholder: 'cm'
    },
    back: {
      placeholder: 'cm'
    },
    chest: {
      placeholder: 'cm'
    }
  }
}

function getFormType(category) {
  switch(category) {
    case 'Toys':
      return Toys
    case 'Harness':
      return Harness
    case 'Collar':
      return Collar
    case 'Cloth':
      return Cloth
    default:
      return Other
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
  header: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 15,
    backgroundColor: 'rgb(250, 180, 114)'
  },
  subtitle: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    elevation: 4,
    padding: 5,
    backgroundColor: 'rgb(135, 206, 235)',
    borderColor: '#D3D3D3',
    borderRadius: 0,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  petProfiles: {
    marginBottom: 20
  },
  photoWrapper: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 5
  }
})
