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
import Stepper from './containers/Stepper'
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import { Link } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'

class App extends React.Component {
  state = {
    left: false,
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

  HomePage = () => {
    return (
      <div>
        <PostCardList posts={this.state.postsData.posts} />
        <Stepper />
      </div>
    )
  }

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open });
  };

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

              <Button color="contrast" href="/">
                <Typography type="title" color="inherit" className={classes.title} noWrap>
                  3inns.cn
                </Typography>
              </Button>
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