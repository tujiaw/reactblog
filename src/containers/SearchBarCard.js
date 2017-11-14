import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import SearchBar from '../components/SearchBar'

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  cardContent: {
    paddingRight: 0
  }
});

class SearchBarCard extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, SearchBarCard } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

SearchBarCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBarCard);