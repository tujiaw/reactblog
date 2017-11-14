import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Router, Route, Switch } from 'react-router-dom'
import history from './common/history'
import NotFound from './containers/404'
import PostPage from './containers/PostPage'
import { AppBar, Toolbar, Typography, IconButton, Grid, Hidden } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import LeftSide from './containers/LeftSide'
import HotPosts from './containers/HotPosts'
import SearchBarCard from './containers/SearchBarCard';
import Search from './components/Search'
import PostList from './containers/PostList'
import fetch from './common/fetch'
import Stepper from './containers/Stepper'
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

class App extends React.Component {
  state = {
    postsData: {},
  };

  componentDidMount() {
    fetch.getPosts().then((data) => {
      console.log(data)
      this.setState({ postsData: data })
    })
  }

  ContentRouter = () => {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={this.HomePage} />
          <Route path="/post/:id" component={PostPage} />
          <Route component={NotFound} />
        </Switch>
    </Router>
    )
  }

  SideBar = (props) => {
    const { classes } = this.props;
    return (
      <Grid item xs={4} className={classes.side}>
        <SearchBarCard />
        <br />
        <HotPosts hotPosts={this.state.postsData.hotPosts} />
        <br />
        <LeftSide tagsCount={this.state.postsData.tagsCount} />
      </Grid> 
    )
  }

  HomePage = () => {
    return (
      <div>
        <PostList posts={this.state.postsData.posts} />
        <Stepper />
      </div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide} 
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.title} noWrap>
                3inns.cn
              </Typography>
              <Search />
            </Toolbar>
          </AppBar>
          <Grid container justify='center'>
            <Grid item xs={10}>
              <main className={classes.content}>
                <Grid container justify='center'>
                  <Grid item xs={this.props.width === 'sm' ? 10 : 8}>
                    { this.ContentRouter() }
                  </Grid>
                  <Hidden smDown>
                    { this.SideBar(this.props) }
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
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 66px)',
      marginTop: 66,
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
  theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }), withWidth())(App);