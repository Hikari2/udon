import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { logout } from '../actions/auth'
import { getMyPets } from '../actions/pet'
import {searchOwn} from '../actions/post'
import ProfilePanel from '../components/ProfilePanel'
import PetPanel from '../components/PetPanel'
import PostPanel from '../components/PostPanel'
import Hr from '../components/Hr'
import Option from '../components/Option'

const { width } = Dimensions.get('window')

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
        <ProfilePanel
          width={width}
          user={this.props.user}
        />
        <Hr
          color='rgb(217,217,217)'
          width={width - 30}
          height={1}
        />
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
      </View>
    )
  }

  renderData() {
    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My dogs</Text>
        </View>
        {
          this.props.myPets.length >= 1 ?
          this.props.myPets.map((pet, i) => {
            return(
              <PetPanel
                data={pet}
                width={width}
                key={`pet-${i}`}
                onPress={() => {Actions.viewPet({data: pet, user: this.props.user})}} />
              )
          }) :
          <View />
        }
        <Option
          icon='plus'
          size={25}
          text={'Create new dog profile'}
          width={width}
          height={64}
          background={'rgb(170, 204, 93)'}
          onPress={Actions.newPet}
        />
        <Hr
          color='rgb(217,217,217)'
          width={width - 30}
          height={1}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My adverts</Text>
        </View>
        {
          this.props.myPosts.length >= 1 ?
            this.props.myPosts.map((post, i) => {
              return(
                <PostPanel data={post}
                  key={`post-${i}`}
                  width={width}
                  onPress={()=> {
                    Actions.viewPost({post})
                  }}/>
              )
            }) :
          <View />
        }
        <Option
          icon='plus'
          size={25}
          text={'Create new advert'}
          width={width}
          height={64}
          background={'rgb(109, 214, 224)'}
          onPress={Actions.newPost}
        />
        <Hr
          color='rgb(217,217,217)'
          width={width - 30}
          height={1}
        />
        <Option
          icon='close'
          size={25}
          text={'Log out'}
          width={width}
          height={64}
          background={'rgb(183, 182, 181)'}
          onPress={this.props.onLogout}
        />
      </View>
    )
  }
}

UserView.propTypes = {
  onLoad: React.PropTypes.func,
  loading: React.PropTypes.bool,
  myPosts: React.PropTypes.array,
  onLogout: React.PropTypes.func,
  myPets: React.PropTypes.array,
  user: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 12,
    marginRight: 12
  },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgb(161,161,161)',
  },
  optionsContainer: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
    marginLeft: 12,
    marginRight: 12
  },
  optionButton: {
    height: 50,
    width: 50,
    backgroundColor: 'rgb(249, 187, 72)'
  },
  optionText: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 5
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isSearchingOwn || state.pet.isSearching || state.pet.isUpdating,
    user: state.auth.isAuthenticated ? state.auth.user : {},
    myPosts: state.post.isUpdating ? [] : state.post.myPosts,
    postCount: state.post.myPosts ? state.post.myPosts.length : 0,
    myPets: state.pet.isUpdating ? [] : state.pet.myPets,
    petCount: state.pet.myPets ? state.pet.myPets.length : 0,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(getMyPets())
      dispatch(searchOwn())
    },
    onLogout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
