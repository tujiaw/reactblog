import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Router, Route, Switch } from 'react-router-dom'
import history from './common/history'
import NotFound from './containers/404'
import ShowPost from './containers/ShowPost'
import { AppBar, Toolbar, Typography, 
  IconButton, Grid, Hidden, Button, Drawer
} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import CategoryList from './containers/CategoryList'
import HotPostList from './containers/HotPostList'
import SearchBarCard from './containers/SearchBarCard';
import PostCardList from './containers/PostCardList'
import fetch from './common/fetch'
import PostStepper from './containers/PostStepper'
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import { Link } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'

class App extends React.Component {
  state = {
    left: false,
    postsData: {},
  };

  listener = () => {
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.listener, false)
    fetch.getPosts().then((data) => {
      console.log('App:' + JSON.stringify(data.posts[0]))
      this.setState({ postsData: data })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.listener, false)
  }

  HomePage = () => {
    return (
      <div>
        <PostCardList posts={this.state.postsData.posts} />
      </div>
    )
  }

  ContentRouter = () => {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={this.HomePage} />
          <Route path="/post/:id" component={ShowPost} />
          <Route component={NotFound} />
        </Switch>
    </Router>
    )
  }

  RightSideBar = (props) => {
    const { classes } = this.props;
    return (
      <Grid item xs={4} className={classes.side}>
        <SearchBarCard />
        <br />
        <HotPostList hotPosts={this.state.postsData.hotPosts} />
        <br />
        <CategoryList tagsCount={this.state.postsData.tagsCount} />
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
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 40px)',
    marginTop: 40,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 40px)',
      marginTop: 40,
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