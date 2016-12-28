import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { remove } from '../actions/pet'
import Icon from 'react-native-vector-icons/FontAwesome'
import Hr from '../components/Hr'
import Option from '../components/Option'

const { width } = Dimensions.get('window')

class ViewPetView extends Component {
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
        <View style={styles.topContainer}>
          {
            this.props.data.photo ?
            <Image
              source={{uri: this.props.data.photo.url}}
              style={styles.picture} /> :
              <Icon.Button
                name='paw'
                size={50}
                color='black'
                borderRadius={0}
                backgroundColor='white'
                iconStyle={{marginRight: 0}}
                style={styles.picture}
                />
          }
          <View style={styles.basicInfo}>
            <Text style={styles.label}>
              {'Name '}
              <Text style={styles.name} numberOfLines={1}>
                {this.props.data.name}
              </Text>
            </Text>
            <Text style={styles.description} numberOfLines={5}>
              {this.props.data.description}
            </Text>
          </View>
        </View>
        <Hr
          color='rgb(217,217,217)'
          width={width * 0.8}
          height={1}
        />
        <View style={styles.measurements}>
          <View style={styles.row}>
            <Text style={styles.label}>{'Weight'}</Text>
            <Text style={styles.measurement}>
              {this.props.data.weight + ' cm'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'Neck'}</Text>
            <Text style={styles.measurement}>
              {this.props.data.neck + ' cm'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'Back'}</Text>
            <Text style={styles.measurement}>
              {this.props.data.back + ' cm'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'Chest'}</Text>
            <Text style={styles.measurement}>
              {this.props.data.chest + ' cm'}
            </Text>
          </View>
        </View>
        <Hr
          color='rgb(217,217,217)'
          width={width * 0.8}
          height={1}
        />
        {
          this.props.user.uid === this.props.data.uid && !this.props.lock ?
            this.renderOptions() : <View />
        }
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
          background={'rgb(170, 204, 93)'}
          onPress={() => Actions.editPet({data: this.props.data})}
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
        onPress: () => this.props.onRemove(this.props.data)},
      ]
    )
  }
}

ViewPetView.propTypes = {
  loading: React.PropTypes.bool,
  lock: React.PropTypes.bool,
  user: React.PropTypes.object,
  data: React.PropTypes.object,
  onRemove: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  topContainer: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15
  },
  picture: {
    width: 125,
    height: 125,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  basicInfo: {
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5
  },
  measurements: {
    width: width * 0.8,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500'
  },
  name: {
    fontSize: 14,
    fontWeight: '400'
  },
  description: {
    fontSize: 14,
    fontWeight: '200'
  },
  measurement: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400'
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.pet.isRemoving,
    user: state.auth.isAuthenticated ? state.auth.user : {},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemove: (pet) => {
      dispatch(remove(pet))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPetView)
