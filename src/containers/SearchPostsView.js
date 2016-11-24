import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { getPosts } from '../actions/post'
import Card from '../components/Card'
import countyList from '../constants/county'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'
import {productCategory} from '../constants/category'

const def = {
  keyword: '',
  county: 'Stockholm',
  category: 'Cloth'
}

class SearchPostsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        ...def
      }
    }
  }

  componentDidMount() {
    this.props.getPosts(def)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Form
            ref='keywordForm'
            type={KeywordForm}
            options={options}
            value={this.state.value}
            onChange={(value) => {
              this.props.getPosts(value)
              this.setState({value})
            }}
          />
          <Form
            ref='filterForm'
            type={FilterForm}
            options={options}
            value={this.state.value}
            onChange={(value) => {
              this.props.getPosts(value)
              this.setState({value})
            }}
          />
        </View>
        <View style={styles.petProfileContainer}>

        </View>
        {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(247,141,40)'}/> : this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return(
      this.props.searchResult.map((post, i) => {
        return <Card data={post}
                key={`post-${i}`}
                onPress={()=> {
                  Actions.postDetail({post: post})
                }}/>
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
const formStyle = JSON.parse(JSON.stringify(t.form.Form.stylesheet))

formStyle.fieldset = {
  flexDirection: 'row'
}
formStyle.formGroup.normal.flex = 1
formStyle.formGroup.error.flex = 1

formStyle.controlLabel = {
  normal: {
    color: 'rgb(144, 73, 5)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(144, 73, 5)',
    fontWeight: 'bold'
  }
}

formStyle.textbox = {
  normal: {
    fontSize: 18,
    fontWeight: '100'
  },
  error: {
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1
  }
}

const County = t.enums.of(countyList, 'County')
const Category = t.enums.of(productCategory, 'Category')

const KeywordForm = t.struct({
  keyword: t.maybe(t.String)
})

const FilterForm = t.struct({
  county: t.maybe(County),
  category:t.maybe(Category)
})

const options = {
  stylesheet: formStyle,
  auto: 'none',
  fields: {
    keyword: {
      placeholder: 'search...'
    },
    county: {

    },
    category: {

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  filterContainer: {
    width: 320,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: 5
  },
  postContainer: {
    width: 320,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
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
    getPosts: (filters) => {
      dispatch(getPosts(filters))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPostsView)
