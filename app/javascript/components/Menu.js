import React from "react"
import PropTypes from "prop-types"
export default class Menu extends React.Component {
  constructor (props) {
  	super(props);
  	this.handleInput = this.handleInput.bind(this);
  	this.handleClickNew = this.handleClickNew.bind(this);
  	this.closeMenu = this.closeMenu.bind(this);
    this.editUser = this.editUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleInput (event) {
  	const newFilter = event.target.value;
  	this.props.onChange(newFilter);
  }

  handleClickNew () {
  	this.props.onClickNew();
  }

  closeMenu () {
  	this.props.toggleMenu();
  }

  editUser () {
    location.href = this.props.editUser;
  }

  async signOut () {
    if (confirm("Are you sure to sign out?")) {
      const url = this.props.signOut;
      const token = this.props.token;
      try {
        let response = await fetch(url, {
          headers: {
            'X-CSRF-Token': token,
            'Content-Type': 'text/html; charset=utf-8'
          },
          method: 'DELETE',
          credentials: 'same-origin'
        });
        if (response.ok) {
          location.href = "/";
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  render () {
    return (
    	<div className={ this.props.openMenu ? "menuWrapper showMobile" : "menuWrapper" } onClick={this.closeMenu}>
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
    			<div className="menuChangePass" onClick={this.editUser}>
    				<i className="material-icons">account_circle</i> Account
    			</div>
    			<div className="menuSignOut" onClick={this.signOut}>
    				<i className="material-icons">exit_to_app</i> Sign Out
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
	toggleMenu: PropTypes.func,
  editUser: PropTypes.string,
  signOut: PropTypes.string
};
