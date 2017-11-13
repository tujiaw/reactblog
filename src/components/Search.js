import React from 'react';
import { withStyles } from 'material-ui/styles';
import { IconButton } from 'material-ui';
import Input, { InputAdornment } from 'material-ui/Input';

class MainSearch extends React.Component {
    state = {
        showInput: false,
        text: '',
    };

    handleShowInput = () => {
        this.setState({ showInput: true })
    }

    handleChange = text => event => {
        this.setState({
          text: event.target.value,
        });
    };

    handleClearText = () => {
        this.setState({ showInput: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <IconButton onClick={this.handleShowInput} className={classes.searchButton}>
                    <i className="material-icons">search</i>
                </IconButton>
            {
                this.state.showInput 
                ? 
                <Input
                    className={classes.searchInput}
                    value={this.state.text}
                    onChange={this.handleChange('weight')}
                    endAdornment={<InputAdornment position="end">
                        <IconButton onClick={this.handleClearText} className={classes.clearButton}>
                            <i className="material-icons">clear</i>
                        </IconButton>
                    </InputAdornment>}
                />
                :
                null
            }


            </div>
        )
    }
}


const styles = theme => ({
    root: {
        // display: 'flex',
        // justifyContent: 'flexStart',
    },

  });

export default withStyles(styles)(MainSearch);