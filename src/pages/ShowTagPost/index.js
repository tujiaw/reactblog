import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Divider } from 'material-ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'

import fetch from '../../common/fetch'
import Loading from '../../components/Loading'
import history from '../../common/history'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 20,
    background: theme.palette.background.paper,
    overflow: 'auto',
  },
  listSection: {
    background: 'inherit',
  },
  divider: {
    marginLeft: 10,
    marginRight: 10,
  }
});

class ShowTagPost extends React.Component {
  handleClick = (id) => {
    history.push('/post/' + id);
  }

  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
      { data.archives 
        ? <List dense={true} className={classes.root} subheader={<ListSubheader>{data.tagname}</ListSubheader>}>
          {data.archives.map((archive, i) => (
            <div key={'archives' + i} className={classes.listSection}>
              <Divider className={classes.divider}/>
              <ListSubheader>{archive.yearMonth}</ListSubheader>
              {archive.titles && archive.titles.map((title, j) => (
                <ListItem button key={'archives' + i + 'title' + j} 
                  onClick={this.handleClick.bind(this, title._id)}
                >
                  <ListItemText primary={title.title} />
                </ListItem>
              ))}
            </div>
          ))}
        </List>
        : <Loading />
      }
      </div>
    );
  }
}

ShowTagPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
      data: state.tagPostsData
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ShowTagPost);
