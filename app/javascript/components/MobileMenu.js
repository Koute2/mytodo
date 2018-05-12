import React from "react"
import PropTypes from "prop-types"

export default class MobileMenu extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		openSearch: false
  	};
  	this.handleInput = this.handleInput.bind(this);
  	this.handleClick = this.handleClick.bind(this);
  	this.handleClear = this.handleClear.bind(this);
  	this.openSearch = this.openSearch.bind(this);
  }

  handleInput (event) {
  	this.props.onChange(event.target.value);
  }

  handleClear () {
    // Clear Filter and close input field
  	this.setState({openSearch: false});
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
	      <div className="MobileMenu">
          <div className="flex">
	      	  <input autoFocus type="text" onChange={this.handleInput} value={this.props.filter} placeholder="search" />
	      	  <div className="material-icons clearButton" onClick={this.handleClear}>cancel</div>
          </div>
	      </div>
  			);
  	} else {
			return (
	      <div className="MobileMenu">
          <div className="flex">
  	      	<div className="material-icons SearchButton" onClick={this.openSearch}>search</div>
  	      	<div className="flexContent" onClick={this.openSearch}></div>
  	      	<div className="material-icons MenuButton" onClick={this.handleClick}>menu</div>
          </div>
	      </div>
  		);
  	}
  }
}

MobileMenu.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
};
