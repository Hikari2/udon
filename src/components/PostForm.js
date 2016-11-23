import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import t from 'tcomb-form-native'
import countyList from '../constants/county'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    const user = props.user
    this.state = {
      user: {
        name: user.displayName,
        email: user.email
      },
      value: {
        type: 'Selling',
        county: 'Stockholm'
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
          value={this.state.user}
          onChange={(value) => {
            this.setState({user: value})
          }}
        />
        <View style={styles.header}>
          <Text style={{fontSize: 19, fontWeight: '100'}}>Posting content</Text>
        </View>
        <Form
          ref='form'
          type={this.state.value.type === 'Selling' ? SellingPost : BuyingPost}
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
            let val = this.refs.form.getValue()
            if(val && user) {
              this.props.onSubmit({
                ...user,
                ...val
              })
            }
          }}
          underlayColor='rgb(0, 191, 255)'>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

PostForm.propTypes = {
  user: React.PropTypes.object,
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

const SellingPost = t.struct({
  type: Type,
  heading: t.String,
  description: t.String,
  county: County,
  price: t.Number
})

const BuyingPost = t.struct({
  type: Type,
  heading: t.String,
  description: t.String,
  county: County
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

    }
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
  }
})
