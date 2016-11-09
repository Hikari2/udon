import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar}  from 'react-native-scrollable-tab-view'
import UserPage from './UserPage'
import HomeNavBar from '../components/HomeNavBar'
import NewPostView from '../containers/NewPostView'
import EditPostView from '../containers/EditPostView'
import BrowsePostView from '../containers/BrowsePostView'

class Home extends Component {

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <HomeNavBar />}
      >
      <ScrollView tabLabel='home'>
        <BrowsePostView />
      </ScrollView>
      <ScrollView tabLabel='folder-open'>
        <EditPostView />
      </ScrollView>
      <ScrollView tabLabel='plus'>
        <NewPostView/>
      </ScrollView>
      </ScrollableTabView>
    )
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
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitPostForm: (post) => {
      dispatch(publishPost(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
