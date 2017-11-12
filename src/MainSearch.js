import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { IconButton, Icon, TextField } from 'material-ui';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

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