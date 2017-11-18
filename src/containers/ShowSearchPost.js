import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Divider } from 'material-ui'
import fetch from '../common/fetch'
import Loading from '../components/Loading'
import history from '../common/history'

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

class ShowSearchPost extends React.Component {
  state = {
    tagname: '',
    data: {}
  }

  componentWillReceiveProps(nextProps) {
      const { match } = nextProps;
      console.log('1111111111111111');
      console.log(match);
      this.fetchPost(match.params.keyword);
  }

  componentDidMount() {
      const { match } = this.props;
      console.log('222222222222222')
      console.log(match)
      this.fetchPost(match.params.keyword);
  }

  fetchPost(tagname) {
      if (this.state.tagname === tagname) {
          return
      }
      this.setState({ tagname: tagname })
      fetch.getSearch(tagname).then((data) => {
          this.setState({ data: data })
          console.log(data)
      })
  }

  handleClick = (id) => {
    history.push('/post/' + id);
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
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

ShowSearchPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowSearchPost);