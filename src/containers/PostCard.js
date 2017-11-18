import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom'
import objectId from '../common/objectId'
import history from '../common/history'

function PostCard(props) {
  const { classes, post } = props;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography type="body1" className={classes.title}>
          { objectId.toDatetime(post._id) } 阅读({ post.pv })
          </Typography>
          <Typography type="headline" component="h2">
            <Link to={'/post/' + post._id}>{ post.title }</Link>
          </Typography>
          <div className={classes.chipGroup}>
            { post.tags && post.tags.map((tag, index) => {
                return tag.length ? <Chip key={index} className={classes.chip} label={tag} /> : null;
            })}
          </div>
          <Typography component="p">
            { post.content }
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense onClick={() => { history.push('/post/' + post._id) }}>阅读全文 »</Button>
        </CardActions>
      </Card>
    </div>
  );
}

const styles = theme => ({
    title: {
      marginBottom: 6,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
    chipGroup: {
        display: 'flex',
        marginTop: 6,
        marginBottom: 6,
    },
    chip: {
        height: 25,
        marginRight: 6,
    }
  });

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);