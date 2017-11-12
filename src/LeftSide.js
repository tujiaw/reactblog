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
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Config from './Config'

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class LeftSide extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, tagsCount } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <List dense={true} subheader={<ListSubheader>文章分类</ListSubheader>}>
            {tagsCount && tagsCount.map((tag, index) => {
              return <ListItem key={index} button><ListItemText primary={tag.name + ' (' + tag.count + ')' } /></ListItem>
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

LeftSide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftSide);