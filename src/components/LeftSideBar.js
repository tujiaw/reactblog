import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
  root: {
    maxWidth: 360,
    width: 230,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class LeftSideBar extends React.Component {
  state = { open: true };

  handleClick = (url) => {
    window.open(url)
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root} subheader={<ListSubheader>3inns.cn</ListSubheader>}>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn')}>
          <ListItemIcon><i className="material-icons">home</i></ListItemIcon>
          <ListItemText inset primary="主页" />
        </ListItem>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn/about')}>
          <ListItemIcon><i className="material-icons">account_box</i></ListItemIcon>
          <ListItemText inset primary="关于" />
        </ListItem>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn/archives')}>
          <ListItemIcon><i className="material-icons">archive</i></ListItemIcon>
          <ListItemText inset primary="归档" />
        </ListItem>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn/search')}>
          <ListItemIcon><i className="material-icons">search</i></ListItemIcon>
          <ListItemText inset primary="搜索" />
        </ListItem>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn/program')}>
          <ListItemIcon><i className="material-icons">get_app</i></ListItemIcon>
          <ListItemText inset primary="小程序" />
        </ListItem>
        <ListItem button onClick={this.handleClick.bind(this, 'http://3inns.cn/post/59edecd82be91645212c9981')}>
          <ListItemIcon><i className="material-icons">favorite</i></ListItemIcon>
          <ListItemText inset primary="书签" />
        </ListItem>
        <Collapse component="li" in={this.state.open} transitionDuration="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested} onClick={this.handleClick.bind(this, 'http://3inns.cn/mdviewer')}>
              <ListItemText primary="Markdown预览" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={this.handleClick.bind(this, 'http://3inns.cn/upload.html')}>
              <ListItemText  primary="上传图片" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={this.handleClick.bind(this, 'http://3inns.cn/react-wchathot')}>
              <ListItemText  primary="微信文章精选" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

LeftSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftSideBar);