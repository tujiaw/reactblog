import React from 'react'
import { withStyles } from 'material-ui/styles'
import PostCard from './PostCard'
import List, { ListItem, ListItemText } from 'material-ui/List'

function PostList(props) {
    const { classes, posts } = props;
    return (
        <div className={classes.root}>
            <List className={classes.list}>                
                { posts && posts.map((post, index) => {
                    return <ListItem key={index}><PostCard post={post}/></ListItem>
                })}
            </List>
        </div>
    )
}

const styles = theme => ({
    root: {

    },
    list: {
    }
});

export default withStyles(styles)(PostList);