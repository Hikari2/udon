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

const headings = ['Search', 'My posts', 'New post', 'User']

class MainContainer extends Component {

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <NavigationBar headings={headings}/>}
      >
      <ScrollView tabLabel='user'>
        <UserView/>
      </ScrollView>
        <ScrollView tabLabel='search'>
          <SearchPostsView />
        </ScrollView>
        <ScrollView tabLabel='folder-open'>
          <MyPostsView />
        </ScrollView>
        <ScrollView tabLabel='plus'>
          <NewPostView/>
        </ScrollView>
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
