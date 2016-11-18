import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { logout } from '../actions/auth'
import { getMyPets } from '../actions/pet'


class UserView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.pictureWrapper}>
            <Image source={{uri: this.props.profilePic}} style={styles.profilePic} />
          </View>
          <Text style={styles.displayName}>{this.props.displayName}</Text>
        </View>
        {this.renderMyPets()}
        <View style={styles.optionsContainer}>
          <ScrollView>
            <Icon.Button
              name='plus'
              backgroundColor='#f4a460'
              underlayColor='#db9356'
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={Actions.newPet}>
              <Text size={16} style={styles.optionText} >
                New pet profile
              </Text>
            </Icon.Button>
          </ScrollView>
          <ScrollView>
            <Icon.Button
              name='close'
              backgroundColor='#DCDCDC'
              underlayColor='#B6B6B4'
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={this.props.onLogoutClick}>
              <Text size={16} style={styles.optionText} >
                Logout
              </Text>
            </Icon.Button>
          </ScrollView>
        </View>
      </View>
    )
  }

  renderMyPets() {
    return (
      this.props.myPets.map((pet, i) => {
        return(
          <View style={styles.petContainer} key={`pet-${i}`}>
            <View style={styles.pictureContainer}>
              {pet.photo ? <Image source={{uri: pet.photo.path}} style={styles.picture}/> : <Text style={styles.picture}>No Image</Text>}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{'Name: ' + pet.values.name}</Text>
              <Text style={styles.text}>{'Age: ' + pet.values.age}</Text>
              <Text style={styles.text}>{'Weight: ' + pet.values.weight + ' kg'}</Text>
              <Text style={styles.text}>{'Class: ' + pet.size}</Text>
            </View>
          </View>
        )
    }))
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: '#FFFFFF'
  },
  profileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    paddingLeft: 30,
    backgroundColor: '#D3D3D3'
  },
  pictureWrapper: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5
  },
  profilePic: {
    height: 50,
    width: 50
  },
  displayName: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#FFFFFF'
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  optionButton: {
    borderWidth: 0.1,
    borderRadius: 0,
    padding: 20,
    borderColor: '#2C3539'
  },
  optionIcon: {
    color: '#2B3856'
  },
  optionText: {
    color: '#2B3856',
    fontSize: 16,
    fontFamily: 'Helvetica'
  },
  petContainer: {
    width: 320,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2',
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#2B3856',
    fontSize: 16,
    fontFamily: 'Helvetica'
  },
  picture: {
    width: 100,
    height: 100
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.auth.isAuthenticated ? state.auth.user.displayName : 'John Doe',
    profilePic: state.auth.isAuthenticated ? state.auth.user.photoURL : ' ',
    myPets: state.pet.myPets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(getMyPets())
    },
    onLogoutClick: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
