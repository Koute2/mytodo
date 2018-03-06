import React from "react"
import PropTypes from "prop-types"

export default class MobileMenu extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		filter: "",
  		openSearch: false
  	};
  	this.handleInput = this.handleInput.bind(this);
  	this.handleClick = this.handleClick.bind(this);
  	this.handleClear = this.handleClear.bind(this);
  	this.openSearch = this.openSearch.bind(this);
  }

  handleInput (event) {
  	const newFilter = event.target.value;
  	this.setState({filter: newFilter});
  	this.props.onChange(newFilter);
  }

  handleClear () {
  	this.setState({
  		filter: "",
  		openSearch: false
  	});
  	this.props.onChange("");
  }

  handleClick () {
  	this.props.onClick();
  }

  openSearch () {
  	this.setState({openSearch: true});
  }

  render () {
  	if (this.state.openSearch) {
  		return (
	      <React.Fragment>
	      	<input autoFocus type="text" onChange={this.handleInput} value={this.state.filter} placeholder="search" />
	      	<span className="material-icons clearButton" onClick={this.handleClear}>cancel</span>
	      </React.Fragment>
  			);
  	} else {
			return (
	      <React.Fragment>
	      	<span className="material-icons SearchButton" onClick={this.openSearch}>search</span>
	      	<div className="flexContent"></div>
	      	<span className="material-icons MenuButton" onClick={this.handleClick}>menu</span>
	      </React.Fragment>
  		);
  	}

  }
}

MobileMenu.propTypes = {
  value: PropTypes.string
};