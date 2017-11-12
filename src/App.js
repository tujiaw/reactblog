import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import LeftSide from './LeftSide'
import MainSearch from './MainSearch'
import PostList from './PostList'
import fetch from './fetch'
import Grid from 'material-ui/Grid'
import Stepper from './Stepper'

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
    marginTop: 26,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 44px)',
      marginTop: 44,
    },
  },
  side: {
    minWidth: 260,
    maxWidth: 260,
    marginTop: 20,
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    sideOpen: false,
    postsData: {},
  };

  componentDidMount() {
    fetch.getPosts().then((data) => {
      console.log(data)
      this.setState({ postsData: data })
    })
  }

  handleDrawerToggle = () => {
    this.setState({ sideOpen: !this.state.sideOpen });
  };

  render() {
    const { classes, theme } = this.props;

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
              <MainSearch />
            </Toolbar>
          </AppBar>
          <Grid container justify='center'>
            <Grid item xs={10}>
              <main className={classes.content}>
                <Grid container justify='center'>
                  <Grid item xs={8}>
                    <PostList posts={this.state.postsData.posts} />
                    <Stepper />
                  </Grid>
                  <Grid item xs={4} className={classes.side}>
                    <LeftSide tagsCount={this.state.postsData.tagsCount} />
                  </Grid>
                </Grid>
              </main>
            </Grid>
          </Grid>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);