import React from "react"
import PropTypes from "prop-types"
export default class Menu extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		filter: ""
  	}
  	this.handleClear = this.handleClear.bind(this);
  	this.handleInput = this.handleInput.bind(this);
  	this.handleClickNew = this.handleClickNew.bind(this);
  }

  handleInput (event) {
  	const newFilter = event.target.value;
  	this.setState({filter: newFilter});
  	this.props.onChange(newFilter);
  }

  handleClear () {
  	this.setState({filter: ""})
  	this.props.onChange("");
  }

  handleClickNew () {
  	this.props.onClickNew();
  	this.props.toggleMenu();
  }

  render () {
    return (
    	<div className={ this.props.openMenu ? "menuWrapper showMobile" : "menuWrapper" }>
    		<div className="globalMenu">
    			<div className="title">
    				MyToDo
    			</div>
    			<div className="flex">
    				<input type="text" placeholder="search" value={this.state.filter} onChange={this.handleInput} />
    				{ this.state.filter ? <div className="material-icons clearButton" onClick={this.handleClear}>cancel</div> : null }
    			</div>
    			<div className="menuBar" onClick={this.handleClickNew}>
    				<i className="material-icons">add</i> New
    			</div>
    			<div className="flexContent" />
    			<div className="menuBar">
    				<i className="material-icons">account_circle</i> Sign Out
    			</div>
    		</div>
    	</div>
    );
  }
}

Menu.propTypes = {
	onChange: PropTypes.func,
	onClickNew: PropTypes.func,
	openMenu: PropTypes.bool,
	toggleMenu: PropTypes.func
};
