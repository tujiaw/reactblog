import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Router, Route, Switch } from 'react-router-dom'
import history from './common/history'
import NotFound from './containers/404'
import ShowPost from './containers/ShowPost'
import { AppBar, Toolbar, Typography, 
  IconButton, Grid, Hidden, Drawer
} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import TagList from './containers/TagList'
import HotPostList from './containers/HotPostList'
import SearchBarCard from './containers/SearchBarCard';
import PostCardList from './containers/PostCardList'
import fetch from './common/fetch'
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import LeftSideBar from './components/LeftSideBar'
import Pagination from './components/Pagination'
import ShowTagPost from './containers/ShowTagPost'
import ShowSearchPost from './containers/ShowSearchPost'
import NotifyBar from './components/NotifyBar'
import Back2top from './components/Back2top'
import Footer from './containers/Footer'

class App extends React.Component {
  state = {
    left: false,
    notifyBarOpen: false,
    notifyBarText: '',
    postsData: {},
  };

  listener = () => {
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.listener, false)
    fetch.getPosts().then((data) => {
      console.log(data)
      this.setState({ postsData: data })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.listener, false)
  }

  gotoPage = (page) => {
    fetch.getPosts(page).then((data) => {
      console.log(data)
      this.setState({ postsData: data })
      history.push('/?page=' + page);
    })
  }

  HomePage = () => {
    return (
      <div>
        <PostCardList posts={this.state.postsData.posts} />
        <Pagination data={this.state.postsData} gotoPage={this.gotoPage}/>
      </div>
    )
  }

  ContentRouter = () => {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={this.HomePage} />
          <Route path="/post/:id" component={ShowPost} />
          <Route path="/tags/:tagname" component={ShowTagPost} />
          <Route path="/search/:keyword" component={ShowSearchPost} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }

  notifyBarRequestClose = () => {
    this.setState({ notifyBarOpen: false })
  }

  handleSearch = (keyword) => {
    console.log('app.js keyword:' + keyword)
    if (keyword.length === 0) {
      history.push('/')
    } else if (keyword.length === 1) {
      this.setState({ notifyBarOpen: true, notifyBarText: '请至少输入两个字符！！！' })
    } else if (keyword.length > 1) {
      history.push('/search/' + encodeURIComponent(keyword))
    } 
  }

  RightSideBar = (props) => {
    const { classes } = this.props;
    return (
      <Grid item xs={4} className={classes.side}>
        <SearchBarCard handleSearch={this.handleSearch} />
        <br />
        <HotPostList hotPosts={this.state.postsData.hotPosts} />
        <br />
        <TagList tagsCount={this.state.postsData.tagsCount} />
      </Grid> 
    )
  }

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open });
  };

  contentSpacing = (props) => {
    if (props.width === 'xs') {
      return 12
    } else if (props.width === 'sm') {
      return 10
    } else {
      return 8
    }
  }

  onHome = () => {
    history.push('/')
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NotifyBar open={this.state.notifyBarOpen} 
          text={this.state.notifyBarText}
          notifyBarRequestClose={this.notifyBarRequestClose}
        />
        <Back2top />
        <Drawer open={this.state.left} onRequestClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <LeftSideBar />
          </div>
        </Drawer>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.toggleDrawer('left', true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.title} noWrap>
                3inns.cn
              </Typography>
              <IconButton color="contrast" aria-label="主页"onClick={this.onHome}>
                <i className="material-icons">home</i>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid container justify='center'>
            <Grid item xs={10}>
              <main className={classes.content}>
                <Grid container justify='center'>
                  <Grid item xs={this.contentSpacing(this.props)}>
                    { this.ContentRouter() }
                  </Grid>
                  <Hidden smDown>
                    { this.RightSideBar(this.props) }
                  </Hidden>
                </Grid>
              </main>
            </Grid>
          </Grid>
        { Object.keys(this.state.postsData).length && <Footer />}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  title: {
    display: 'flex',
    flex: 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    // backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 60px)',
    marginTop: 60,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 60px)',
      marginTop: 60,
    },
  },
  side: {
    minWidth: 260,
    maxWidth: 260,
    marginTop: 20,
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }), withWidth())(App);