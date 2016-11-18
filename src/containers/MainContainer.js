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
import NavigationBar from '../components/NavigationBar'
import SearchPostsView from './SearchPostsView'
import MyPostsView from './MyPostsView'
import NewPostView from './NewPostView'
import UserView from './UserView'

class MainContainer extends Component {

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <NavigationBar />}
      >
        <ScrollView tabLabel='search'>
          <SearchPostsView />
        </ScrollView>
        <ScrollView tabLabel='folder-open'>
          <MyPostsView />
        </ScrollView>
        <ScrollView tabLabel='plus'>
          <NewPostView/>
        </ScrollView>
        <ScrollView tabLabel='user'>
          <UserView/>
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
)(MainContainer)
