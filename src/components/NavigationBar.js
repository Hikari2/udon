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
    const red = 122 + (219 - 122) * progress;
    const green = 82 + (147 - 82) * progress;
    const blue = 48 + (86 - 48) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return(
      <View>
        <View style={styles.optionBar}>
        </View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={30}
                color={this.props.activeTab === i ? 'rgb(122,82,48)' : 'rgb(219,147,86)'}
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
  optionBar: {
    height: 50,
    backgroundColor: '#7a5230'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
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
