import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import fetch from '../common/fetch'
import Loading from '../components/Loading'

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
});

class ShowTagPost extends React.Component {
  state = {
    tagname: '',
    data: {}
  }

  componentWillReceiveProps(nextProps) {
      const { match } = nextProps;
      this.fetchPost(match.params.tagname);
  }

  componentDidMount() {
      const { match } = this.props;
      this.fetchPost(match.params.tagname);
  }

  fetchPost(tagname) {
    console.log('1111111111:' + tagname)
      if (this.state.tagname === tagname) {
          return
      }
      this.setState({ tagname: tagname })
      fetch.getTagPost(tagname).then((data) => {
          this.setState({ data: data })
          console.log(data)
      })
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
              <ListSubheader>{archive.yearMonth}</ListSubheader>
              {archive.titles && archive.titles.map((title, j) => (
                <ListItem button key={'archives' + i + 'title' + j}>
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

export default withStyles(styles)(ShowTagPost);