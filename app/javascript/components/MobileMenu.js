import React from "react"
import PropTypes from "prop-types"

export default class MobileMenu extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		filter: this.props.filter
  	};
  	this.handleInput = this.handleInput.bind(this);
  }

  handleInput (event) {
  	const newFilter = event.target.value;
  	this.props.onChange(newFilter);
  }

  render () {
    return (
      <React.Fragment>
      	<input type="text" onChange={this.handleInput} value={this.state.filter} placeholder="search" />
      </React.Fragment>
    );
  }
}

MobileMenu.propTypes = {
  value: PropTypes.string
};