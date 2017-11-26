import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom'
import objectId from '../../common/objectId'
import history from '../../common/history'

function PostCard(props) {
  const { classes, post } = props;

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography type="body1" className={classes.subTitle}>
          { objectId.toDatetime(post._id) } 阅读({ post.pv })
          </Typography>
          <Typography type="headline" component="h2">
            <Link className={classes.title} to={'/post/' + post._id}>{ post.title }</Link>
          </Typography>
          <div className={classes.chipGroup}>
            { post.tags && post.tags.map((tag, index) => {
                return tag.length ? <Chip key={index} className={classes.chip} label={tag} /> : null;
            })}
          </div>
          <Typography component="p" className={classes.content}>
            { post.content }
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense onClick={() => { history.push('/post/' + post._id) }}>阅读全文 »</Button>
        </CardActions>
      </Card>
  );
}

const styles = theme => ({
    root: {
      background: theme.palette.background.paper,
      borderRadius: 5,
    },
    title: {
      color: theme.palette.text.primary,
    },
    subTitle: {
      marginBottom: 6,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
    content: {
      color: theme.palette.text.hint
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