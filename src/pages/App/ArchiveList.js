import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import history from '../../common/history'

const styles = theme => ({
  root: {
    // background: theme.palette.background.default,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ArchiveList extends React.Component {
  handleClick = (tagname) => {
    history.push('/tags/' + encodeURIComponent(tagname))
  };

  render() {
    const { classes, archives } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <List dense={true} subheader={<ListSubheader>文章存档</ListSubheader>}>
            {archives && archives.map((item, index) => {
              return <ListItem key={index} onClick={this.handleClick.bind(this, item.yearMonth)} button>
                <ListItemText primary={item.yearMonth.substr(0, 4) + '年' + item.yearMonth.substr(5) + '日'  + ' (' + item.count + ')' } />
              </ListItem>
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

ArchiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArchiveList);