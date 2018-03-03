import React from "react"
import PropTypes from "prop-types"

export default class MobileMenu extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		filter: this.props.value
  	};
  	this.handleInput = this.handleInput.bind(this);
  }

  handleInput (event) {
  	this.setState({
  		filter: event.target.value
  	});
  }

  render () {
    return (
      <React.Fragment>
      	<input type="text" onChange={this.handleInput} value={this.state.filter} />
      </React.Fragment>
    );
  }
}

MobileMenu.propTypes = {
  value: PropTypes.string
};