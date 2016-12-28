import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    headings: React.PropTypes.array
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 255 + (125 - 255) * progress;
    const green = 255 + (64 - 255) * progress;
    const blue = 255 + (40 - 255) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{this.props.headings[this.props.activeTab]}</Text>
        </View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={25}
                color={this.props.activeTab === i ? 'rgb(255,255,255)' : 'rgb(125,64,5)'}
                ref={(icon) => { this.tabIcons[i] = icon; }}
              />
            </TouchableOpacity>
          })}
        </View>
      </View>
    )
  },
});

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgb(247,141,40)',
    marginBottom: 5
  },
  header: {
    flex: 1,
    height: 50,
    padding: 10
  },
  heading: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
});

export default FacebookTabBar;
