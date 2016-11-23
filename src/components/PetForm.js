import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import t from 'tcomb-form-native'
import {getSize} from '../constants/dog'
import { Actions } from 'react-native-router-flux'

export default class PetForm extends Component {
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
          <Text style={{fontSize: 19, fontWeight: '100'}}>Pet information</Text>
        </View>
        <Form
          ref='form'
          type={Dog}
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
            const val = this.refs.form.getValue()
            if(val) {
              this.props.onSubmit({
                ...val,
                size: getSize(val.weight),
                photo: this.state.photo
              })
              Actions.pop()
            }
          }}
          underlayColor='rgb(0, 191, 255)'>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

PetForm.propTypes = {
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

const Dog = t.struct({
  name: t.String,
  age: t.Number,
  weight: t.Number
})

const options = {
  stylesheet: formStyle,
  fields: {
    name: {
      autoCapitalize: 'sentences'
    },
    age: {

    }
    ,
    weight: {

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
