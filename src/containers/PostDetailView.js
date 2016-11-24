import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text
} from 'react-native'
import { connect } from 'react-redux'

class PostDetailView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 19, fontWeight: '100'}}>{this.props.post.heading}</Text>
          </View>
          <View style={styles.photoContainer}>
            <ScrollView horizontal>
            {
              this.props.post.photos.map((photo, i) => {
                return (
                  <View style={styles.photoWrapper} key={`pet-${i}`}>
                    <Image source={{uri: photo.path}} style={{height: 150, width: 150}} />
                  </View>
                )
              })
            }
            </ScrollView>
          </View>
          <View style={styles.textContainer}>
            {this.props.post.neck ? <Text style={styles.normalText}>Neck {this.props.post.neck} cm</Text> : <View/>}
            {this.props.post.chest ? <Text style={styles.normalText}>Chest {this.props.post.chest} cm</Text> : <View/>}
            {this.props.post.back ? <Text style={styles.normalText}>Back {this.props.post.back} cm</Text> : <View/>}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.normalText}>{this.props.post.description}</Text>
          </View>
          <View style={styles.header}>
            <Text style={{fontSize: 19, fontWeight: '100'}}>Poster</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.normalText}>{this.props.post.name}</Text>
            <Text style={styles.normalText}>{this.props.post.email}</Text>
            <Text style={styles.normalText}>{this.props.post.county}</Text>
          </View>
          <View style={styles.header}>
            <Text style={{fontSize: 19, fontWeight: '100'}}>Profile used</Text>
          </View>
          {
            this.props.post.petProfile.name ?
              <View style={styles.petProfile}>
                <View style={styles.photoContainer}>
                  <View style={styles.photoWrapper}>
                    <Image source={{uri: this.props.post.petProfile.photo}} style={{height: 150, width: 150}} />
                  </View>
                </View>
                <Text style={{fontSize: 22, fontWeight: '300', marginLeft: 30}}>{this.props.post.petProfile.name}</Text>
              </View> : <View/>
          }
        </View>
      </ScrollView>
    )
  }
}

PostDetailView.propTypes = {
  post: React.PropTypes.object,
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
  pets: React.PropTypes.array,
  onSubmit: React.PropTypes.func
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16,
    fontWeight: '100'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    padding: 25,
    backgroundColor: '#ffffff'
  },
  photoContainer: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  textContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 15,
  },
  petProfile: {
    flexDirection: 'row'
  },
  header: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: 'rgb(250, 180, 114)'
  },
  petProfiles: {
    marginBottom: 20
  },
  photoWrapper: {
    marginRight: 5
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    post: ownProps.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView)
