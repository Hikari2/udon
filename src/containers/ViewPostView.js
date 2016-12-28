import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { remove } from '../actions/post'
import Icon from 'react-native-vector-icons/FontAwesome'
import Hr from '../components/Hr'
import Option from '../components/Option'
import ProfilePanel from '../components/ProfilePanel'
import Carousel from 'react-native-carousel-control'
import PetPanel from '../components/PetPanel'
import Communications from 'react-native-communications'

const { width } = Dimensions.get('window')

class ViewPostView extends Component {
  constructor(props) {
    super(props)
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
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{this.props.post.heading}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.date}>{'Created at ' + this.props.post.date}</Text>
        </View>
        <Hr
          color='rgb(217,217,217)'
          width={width * 0.8}
          height={1}
        />

        <View style={styles.carousel}>
        {
          this.props.post.photos ?
            <Carousel pageWidth={width * 0.78} sneak={50}>
              {
                this.props.post.photos.map((photo, i) => {
                  return (
                    <View style={styles.picture} key={`photo-${i}`}>
                      <Image source={{uri: photo.url}} style={styles.picture} />
                    </View>
                  )
                })
              }
            </Carousel>
            :
            <View />
        }
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{this.props.post.description}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.price}>{this.props.post.price + ':-'}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>County</Text>
            <Text style={styles.county}>{this.props.post.county}</Text>
          </View>
        </View>
        {
          this.props.post.postal ?
          <View style={styles.textContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>{'ZIP code'}</Text>
              <Text style={styles.postal}>{this.props.post.postal}</Text>
            </View>
          </View> : <View />
        }
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Can send</Text>
            <Text style={styles.sendable}>{this.props.post.sendable}</Text>
          </View>
        </View>
        <Hr
          color='rgb(217,217,217)'
          width={width * 0.8}
          height={1}
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Sold by</Text>
          <ProfilePanel
            width={width}
            user={this.props.post.user}
          />
        </View>
        {
          this.props.post.pet ?
            <View style={styles.textContainer}>
              <Text style={styles.label}>Previous user</Text>
              <PetPanel
                data={this.props.post.pet}
                width={width * 0.8}
                onPress={() => Actions.viewPet({data: this.props.post.pet, lock: true})}
              />
            </View> : <View />
        }
        <Hr
          color='rgb(217,217,217)'
          width={width * 0.8}
          height={1}
        />
        {
          this.props.user.uid === this.props.post.user.uid ?
            this.renderOptions() : this.renderContact()
        }
      </View>
    )
  }

  renderContact() {
    return (
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Contact</Text>
        </View>
        <View>
          {
            this.props.post.phone ?
              <TouchableOpacity
                style={styles.phoneContainer}
                underlayColor='rgb(88, 200, 211)'
                onPress={() => Communications.phonecall(this.props.post.phone + '', true)}>
                <Icon
                  name='phone'
                  size={25}
                  style={styles.phoneButton} />
                  <Text style={{fontSize: 16, fontWeight: '400'}}>{this.props.post.phone}</Text>
              </TouchableOpacity> : <View/>
          }
        </View>
        <TouchableOpacity
          style={styles.phoneContainer}
          underlayColor='rgb(88, 200, 211)'
          onPress={() => Communications.email([this.props.post.user.email + ''], null, null, 'Regarding your advert: ' + this.props.post.heading , '')}>
          <Icon
            name='send-o'
            size={25}
            style={styles.phoneButton} />
            <Text style={{fontSize: 16, fontWeight: '400'}}>{'Send email'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderOptions() {
    return (
      <View>
        <Option
          icon='edit'
          size={25}
          text={'Edit'}
          width={width * 0.8}
          height={64}
          background={'rgb(109, 214, 224)'}
          onPress={() => Actions.editPost({post: this.props.post})}
        />
        <Option
          icon='remove'
          size={25}
          text={'Remove'}
          width={width * 0.8}
          height={64}
          background={'rgb(247, 76, 76)'}
          onPress={() => this.renderPrompt() }
        />
      </View>
    )
  }

  renderPrompt() {
    Alert.alert(
      '',
      'Are you sure ?',
      [
        {text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')},
        {text: 'OK',
        onPress: () => this.props.onRemove(this.props.post)},
      ]
    )
  }
}

ViewPostView.propTypes = {
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
  post: React.PropTypes.object,
  onRemove: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  carousel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  headingContainer: {
    width,
    padding: 5,
    paddingLeft: 25
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgb(108,108,108)',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgb(161,161,161)'
  },
  phoneContainer: {
    width: 160,
    height: 35,
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    borderWidth: 0.5
  },
  phoneButton: {
    marginLeft: 15,
    marginRight: 15
  },
  textContainer: {
    width,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  picture: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    fontSize: 13,
    fontWeight: '400'
  },
  description: {
    padding: 12,
    fontSize: 14,
    fontWeight: '400'
  },
  price: {
    color: 'rgb(247,141,40)',
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '400'
  },
  county: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '400'
  },
  sendable: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '400'
  },
  postal: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '400'
  },
  phone: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '400'
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isRemoving,
    user: state.auth.isAuthenticated ? state.auth.user : {},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemove: (post) => {
      dispatch(remove(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPostView)
