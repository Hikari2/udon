import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class DogListView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    )
  }

  renderList() {
    return (
      this.props.myPosts.map((post, i) => {
        return(
          <View style={styles.container} key={`post-${i}`}>
            <Text>{'DOG!'}</Text>
          </View>
        )
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

const mapStateToProps = (state) => {
  //console.log(JSON.stringify(state, null, 2))
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogList: () => {

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostView)
