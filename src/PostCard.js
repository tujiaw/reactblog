import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Config from './Config'

function PostCard(props) {
  const { classes, post } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
          2017-11-04 10:42 阅读({ post.pv })
          </Typography>
          <Typography type="headline" component="h2">
            <a href={Config.HOST_PREFIX + '/post/' + post._id}>{ post.title }</a>
          </Typography>
          <div className={classes.chipGroup}>
            { post.tags && post.tags.map((tag, index) => {
                return <Chip key={index} className={classes.chip} label={tag} />
            })}
          </div>
          <Typography component="p">
            { post.content }
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>阅读全文 »</Button>
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