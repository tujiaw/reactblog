import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class HotPosts extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, hotPosts } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <List dense={true} subheader={<ListSubheader>热门文章</ListSubheader>}>
            {hotPosts && hotPosts.map((post, index) => {
              return <ListItem key={index} button><ListItemText primary={ post.title } /></ListItem>
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

HotPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotPosts);