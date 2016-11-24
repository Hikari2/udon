import React, { Component } from 'react'
import {
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView  from 'react-native-scrollable-tab-view'
import NavigationBar from '../components/NavigationBar'
import SearchPostsView from './SearchPostsView'
import MyPostsView from './MyPostsView'
import NewPostView from './NewPostView'
import UserView from './UserView'
import { getMyPets } from '../actions/pet'

const headings = ['Search', 'My posts', 'New post', 'User']

class MainContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <NavigationBar headings={headings}/>}
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

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(getMyPets())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
