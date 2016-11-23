import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions/post'
import Card from '../components/Card'
import countyList from '../constants/county'
import t from 'tcomb-form-native'


class SearchPostsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
      }
    }
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return (
      this.props.searchResult.map((post, i) => {
        return <Card data={post} key={`post-${i}`}/>
      })
    )
  }
}

SearchPostsView.propTypes = {
  loading: React.PropTypes.bool,
  searchResult: React.PropTypes.array,
  getPosts: React.PropTypes.func
}

const Form = t.form.Form
const Type = t.enums.of('Selling Buying')
const County = t.enums.of(countyList, 'County')

var Car = t.enums.of('Audi Chrysler Ford Renault Peugeot')

const struct = t.struct({
  keyword: t.maybe(t.String),
  type: Type,
  county: County
})



const options = {
  auto: 'none',
  template: filterOptions,
  fields: {
    keyword: {
      placeholder: 'keyword...'
    },
    type: {
      nullOption: {value: '', text: 'type'}
    },
    county: {
      nullOption: {value: '', text: 'county'}
    }
  }
}

function filterOptions(locals) {
  return(
    <View style={filterStyles.container}>
      <View style={filterStyles.firstRow}>
        <View style={filterStyles.textField}>
          {locals.inputs.keyword}
        </View>
      </View>
      <View style={filterStyles.secondRow}>
        <View style={filterStyles.textField}>
          {locals.inputs.type}
        </View>
        <View style={filterStyles.textField}>
          {locals.inputs.county}
        </View>
      </View>
    </View>
  )
}

const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'yellow'
  },
  firstRow: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderWidth: 2,
    borderColor: 'red'
  },
  secondRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    borderWidth: 2,
    borderColor: 'green'
  },
  textField: {
    flexWrap:'wrap'
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  postContainer: {
    width: 320,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2',
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#2B3856',
    fontSize: 16,
    fontFamily: 'Helvetica'
  },
  picture: {
    width: 100,
    height: 100
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.post.isSearching,
    searchResult: state.post.searchResult,
    postCount: state.post.searchResult.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getAllPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPostsView)
