import React, { Component } from 'react'
import {
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView  from 'react-native-scrollable-tab-view'
import NavigationBar from '../components/NavigationBar'
import SearchPostsView from './SearchPostsView'
import NewPostView from './NewPostView'
import UserView from './UserView'
import { getMyPets } from '../actions/pet'

const headings = ['Search', 'Account']

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
        <ScrollView tabLabel='user'>
          <UserView/>
        </ScrollView>
      </ScrollableTabView>
    )
  }
}

MainContainer.propTypes = {
  onLoad: React.PropTypes.func
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
