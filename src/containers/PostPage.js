import React from 'react';
import { withStyles } from 'material-ui/styles';
import fetch from '../common/fetch'
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import config from '../common/config'
import { Link } from 'react-router-dom'

class PostPage extends React.Component {
    state = {
        postData: {}
    }

    componentDidMount() {
        const { match } = this.props;
        fetch.getPost(match.params.id).then((data) => {
            this.setState({ postData: data })
        })
    }

    render() {
        const { match, classes } = this.props;
        const { post } = this.state.postData;
        console.log('match:' + JSON.stringify(match));
        return post 
        ? (
            <div>
                <Card className={classes.card}>
                <CardContent>
                    <Typography type="body1" className={classes.title}>
                    2017-11-04 10:42 阅读({ post.pv })
                    </Typography>
                    <Typography type="headline" component="h2">
                    <Link to={'/post/' + post._id}>{ post.title }</Link>
                    </Typography>
                    <div className={classes.chipGroup}>
                    { post.tags && post.tags.map((tag, index) => {
                        return <Chip key={index} className={classes.chip} label={tag} />
                    })}
                    </div>
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </CardContent>
                <CardActions>
                    <Button dense>阅读全文 »</Button>
                </CardActions>
                </Card>
            </div>
        )
        : null;
    }
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

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostPage);