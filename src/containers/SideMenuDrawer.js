import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import SideMenu from '../components/SideMenu'


class SideMenuDrawer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
        <Drawer
            ref="navigation"
            open={state.open}
            onOpen={()=>Actions.refresh({key:state.key, open: true})}
            onClose={()=>Actions.refresh({key:state.key, open: false})}
            type="displace"
            content={<SideMenu />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
             main: { opacity:Math.max(0.54,1-ratio) }
        })}>
            <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'lightblue'
  },
  button_text: {
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    navigationState: ownProps.navigationState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenuDrawer)
