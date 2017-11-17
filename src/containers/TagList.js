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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class TagList extends React.Component {
  handleClick = (tagname) => {
    history.push('/tags/' + encodeURIComponent(tagname))
  };

  render() {
    const { classes, tagsCount } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <List dense={true} subheader={<ListSubheader>文章分类</ListSubheader>}>
            {tagsCount && tagsCount.map((tag, index) => {
              return <ListItem key={index} onClick={this.handleClick.bind(this, tag.name)} button>
                <ListItemText primary={tag.name + ' (' + tag.count + ')' } />
              </ListItem>
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

TagList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagList);