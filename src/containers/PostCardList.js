import React from 'react'
import { withStyles } from 'material-ui/styles'
import PostCard from './PostCard'
import List, { ListItem } from 'material-ui/List'
import Loading from '../components/Loading'

function PostCardList(props) {
    const { classes, posts } = props;
    return (
        <div className={classes.root}>
            <List className={classes.list}>                
                { posts 
                ? posts.map((post, index) => {
                        return <ListItem key={index}><PostCard post={post}/></ListItem>
                    })
                :  <Loading />
                }
            </List>
        </div>
    )
}

const styles = theme => ({
    root: {
    },
    list: {
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
    }
});

export default withStyles(styles)(PostCardList);