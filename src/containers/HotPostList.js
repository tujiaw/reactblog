import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import history from '../common/history'

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
  listItem: {
    padding: 8,
    margin: 0,
  },
  listItemText: {
    padding: 0,
    margin: 0,
  }
  
});

class HotPostList extends React.Component {
  handleClick = (id) => {
    history.push('/post/' + id);
  };

  render() {
    const { classes, hotPosts } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <List dense={true} subheader={<ListSubheader>热门文章</ListSubheader>}>
            {hotPosts && hotPosts.map((post, index) => {
              return <ListItem key={index} onClick={this.handleClick.bind(this, post._id)} button>
                <ListItemText primary={ post.title } />
              </ListItem>
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

HotPostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotPostList);