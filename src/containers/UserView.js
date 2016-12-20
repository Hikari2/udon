import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
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
    this.props.getMyPets()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ScrollView horizontal>
            <View style={styles.pictureWrapper}>
              <Image source={{uri: this.props.profilePic}} style={styles.profilePic} />
            </View>
            <View style={styles.profileWrapper}>
              <Text style={styles.profileText}>{this.props.displayName}</Text>
              <Text style={styles.profileText}>{this.props.email}</Text>
            </View>
          </ScrollView>
        </View>
        {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderMyPets()}
        <View style={styles.optionsContainer}>
          <ScrollView>
            <Icon.Button
              name='plus'
              underlayColor='grey'
              backgroundColor='white'
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={Actions.newPet}>
              <Text size={16} style={styles.optionText} >
                {'Create new dog profile'}
              </Text>
            </Icon.Button>
          </ScrollView>
          <ScrollView>
            <Icon.Button
              name='close'
              underlayColor='grey'
              backgroundColor='white'
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={this.props.onLogoutClick}>
              <Text size={16} style={styles.optionText} >
                {'Logout'}
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
          <TouchableHighlight key={`pet-${i}`} onPress={() => {Actions.editPet({data: pet})}}>
            <View style={styles.petContainer}>
              <View style={styles.pictureContainer}>
                {pet.photo ? <Image source={{uri: pet.photo}} style={styles.picture}/> : <Text style={styles.picture}>No Image</Text>}
              </View>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>{'Name: '}
                  <Text style={{fontSize: 14, fontWeight: '400'}}>{pet.name}</Text>
                </Text>
                <View style={styles.measurements}>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>{'Weight: '}
                    <Text style={{fontSize: 14, fontWeight: '400'}}>{pet.weight + ' kg'}</Text>
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>{'Neck: '}
                    <Text style={{fontSize: 14, fontWeight: '400'}}>{pet.neck + ' cm'}</Text>
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>{'Back: '}
                    <Text style={{fontSize: 14, fontWeight: '400'}}>{pet.back + ' cm'}</Text>
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>{'Chest: '}
                    <Text style={{fontSize: 14, fontWeight: '400'}}>{pet.chest + ' cm'}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )
    }))
  }

}

UserView.propTypes = {
  getMyPets: React.PropTypes.func,
  onLogoutClick: React.PropTypes.func,
  myPets: React.PropTypes.array,
  displayName: React.PropTypes.string,
  email: React.PropTypes.string,
  profilePic: React.PropTypes.string,
  loading: React.PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: '#FFFFFF'
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  profileWrapper: {
    padding: 25
  },
  profileText: {
    fontSize: 16,
    fontWeight: '600',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgb(232,232,232)'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  measurements: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
    marginTop: 8,
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

const mapStateToProps = (state) => {
  return {
    loading: state.pet.isSearchingPets,
    displayName: state.auth.isAuthenticated ? state.auth.user.displayName : 'John Doe',
    email: state.auth.isAuthenticated ? state.auth.user.email : ' ',
    profilePic: state.auth.isAuthenticated ? state.auth.user.photoURL : ' ',
    myPets: state.pet.myPets,
    petCount: state.pet.myPets.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPets: () => {
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
