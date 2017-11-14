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

class CategoryList extends React.Component {
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

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryList);