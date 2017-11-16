import React from 'react';
import { withStyles } from 'material-ui/styles';
import fetch from '../common/fetch'
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import PostStepper from './PostStepper';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading'
import Back2top from '../components/Back2top'
import objectId from '../common/objectId'

class ShowPost extends React.Component {
    state = {
        postData: {}
    }

    componentWillReceiveProps(nextProps) {
        const { match } = nextProps;
        this.fetchPost(match.params.id);
    }
    
    componentDidMount() {
        const { match } = this.props;
        this.fetchPost(match.params.id);
    }

    fetchPost(id) {
        const { postData } = this.state;
        if (postData.post && postData.post._id === id) {
            return;
        }
        fetch.getPost(id).then((data) => {
            this.setState({ postData: data })
            console.log(data);
        })
    }

    render() {
        const { classes } = this.props;
        const { post, nextPost, prevPost } = this.state.postData;
        return post 
        ? (
            <div className={classes.root}>
                <Back2top />
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="body1" className={classes.title}>
                        { objectId.toDatetime(post._id) } 阅读({ post.pv })
                        </Typography>
                        <Typography type="headline" component="h2">
                        <Link to={'/post/' + post._id}>{ post.title }</Link>
                        </Typography>
                        <div className={classes.chipGroup}>
                        { post.tags && post.tags.map((tag, index) => {
                            return tag.length ? <Chip key={index} className={classes.chip} label={tag} /> : null
                        })}
                        </div>
                        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        <footer className={classes.reference}>
                            <strong>（转载本站文章请注明作者和出处：<a href="http://3inns.cn">三家店 - 3inns.cn</a></strong>
                        </footer>
                    </CardContent>
                <CardActions>
                    <PostStepper history={this.props.history} nextPost={nextPost} prevPost={prevPost} />
                </CardActions>
                </Card>
            </div>
        )
        : <Loading />;
    }
}

const styles = theme => ({
    root: {
        marginTop: 20
    },
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
    },
    reference: {
        marginTop: 15,
        fontSize: 11,
        color: '#cc0000'
    }
  });

ShowPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowPost);