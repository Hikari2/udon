import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { getPosts } from '../actions/post'
import PostPanel from '../components/PostPanel'
import countyList from '../constants/county'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'
import {productCategory} from '../constants/category'
import Add from '../components/Add'

const {width} = Dimensions.get('window')

class SearchPostsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {

      }
    }
  }

  componentDidMount() {
    this.props.getPosts({
      keyword: '',
      county: '',
      category: ''
    })
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
        <Add width={width - 20} key={'add'}/>
        {this.props.loading ?
          <ActivityIndicator
            style={{marginTop: 40, padding: 20, transform: [{scale: 1.7}]}}
            size={'large'}
            color={'rgb(247,141,40)'}/> :
          this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    let posts = this.props.searchResult.map((post, i) => {
      return <PostPanel
              data={post}
              key={`post-${i}`}
              width={width}
              onPress={()=> {
                Actions.viewPost({post})
              }}/>
          })
    if (posts.length === 0) {
      posts.push(
        <Text style={{marginTop: 30, fontSize: 21, color: 'rgb(148,148,148)'}} key={`post-noResult`}>No result</Text>
      )
    }
    return posts
  }
}

SearchPostsView.propTypes = {
  loading: React.PropTypes.bool,
  searchResult: React.PropTypes.array,
  getPosts: React.PropTypes.func
}

const Form = t.form.Form
const formStyle = JSON.parse(JSON.stringify(t.form.Form.stylesheet))

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
    fontSize: 16,
    fontWeight: '100'
  },
  error: {
    fontSize: 16,
    borderColor: 'red',
    borderWidth: 1
  }
}

formStyle.select = {
  normal: {
    width: 180,
    height: 30,
    color: 'rgb(148, 148, 148)',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5
  },
  error: {
    width: 180,
    height: 30,
    color: 'rgb(148, 148, 148)',
    borderColor: 'red',
    borderWidth: 0.5
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
      placeholder: 'keyword...'
    },
    county: {
      placeholder: 'county',
      nullOption: {value: '', text: 'Entire country'}
    },
    category: {
      placeholder: 'category',
      nullOption: {value: '', text: 'All categories'}
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  filterContainer: {
    width: width * 0.8,
    justifyContent: 'flex-start'
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
    searchResult: state.post.isSearching ? [] : state.post.searchResult,
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
