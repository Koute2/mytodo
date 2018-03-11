import React from "react"
import PropTypes from "prop-types"
export default class Menu extends React.Component {
  constructor (props) {
  	super(props);
  	this.handleInput = this.handleInput.bind(this);
  	this.handleClickNew = this.handleClickNew.bind(this);
  }

  handleInput (event) {
  	const newFilter = event.target.value;
  	this.props.onChange(newFilter);
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
    				<input type="text" placeholder="search" value={this.props.filter} onChange={this.handleInput} />
    			</div>
    			<div className="menuNew" onClick={this.handleClickNew}>
    				<i className="material-icons">add</i> New
    			</div>
    			<div className="flexContent" />
    			<div className="menuChangePass">
    				<i className="material-icons">lightbulb_outline</i> Change Password
    			</div>
    			<div className="menuSignOut">
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
