import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'

export default class PetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        ...props.pet
      }
    }
  }

  render() {
    return (
      <View style={[styles.container, {width: this.props.width * 0.8}]}>
        <Form
          ref='form'
          type={Dog}
          options={options}
          value={this.state.value}
          onChange={(value) => {
            this.setState({value})
          }}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={()=>{
            const val = this.refs.form.getValue()
            if(val) {
              this.props.onSubmit({
                ...val
              })
            }
          }}
          underlayColor='rgb(161, 193, 87)'>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

PetForm.propTypes = {
  pet: React.PropTypes.object,
  width: React.PropTypes.number,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.object
}

const Form = t.form.Form
const Dog = t.struct({
  name: t.String,
  description: t.maybe(t.String),
  weight: t.Number,
  neck: t.Number,
  back: t.Number,
  chest: t.Number
})

const stylesheet  = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheet .controlLabel = {
  normal: {
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  }
}

stylesheet.textbox = {
  normal: {
    width: 100,
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
    width: 100,
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

const stylesheetWide  = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheetWide.controlLabel = {
  normal: {
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  }
}

stylesheetWide.textbox = {
  normal: {
    width: 260,
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
    width: 260,
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
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(148, 148, 148)',
    fontWeight: '100'
  }
}

stylesheetLarge.textbox = {
  normal: {
    width: 260,
    textAlignVertical: 'top',
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5
  },
  error: {
    width: 260,
    textAlignVertical: 'top',
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'red',
    borderWidth: 0.5
  }
}

const options = {
  stylesheet,
  fields: {
    name: {
      stylesheet: stylesheetWide,
      maxLength: 20,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    description: {
      label: 'Comment',
      stylesheet: stylesheetLarge,
      multiline: true,
      numberOfLines: 5,
      maxLength: 120,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    weight: {
      underlineColorAndroid: 'transparent',
      maxLength: 2,
      placeholder: 'kg'
    },
    neck: {
      underlineColorAndroid: 'transparent',
      maxLength: 2,
      placeholder: 'cm'
    },
    back: {
      underlineColorAndroid: 'transparent',
      maxLength: 2,
      placeholder: 'cm'
    },
    chest: {
      underlineColorAndroid: 'transparent',
      maxLength: 2,
      placeholder: 'cm'
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    elevation: 1,
    padding: 5,
    backgroundColor: 'rgb(170, 204, 93)',
    borderColor: '#D3D3D3',
    borderRadius: 0,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50
  }
})
