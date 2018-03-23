import React from "react"
import PropTypes from "prop-types"
import WorkContainer from "./WorkContainer"
import MobileMenu from "./MobileMenu"
import Menu from "./Menu"

export default class WorkList extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		works: this.props.works,
  		filter: "",
  		openMenu: false
  	};
  	this.changeFilter = this.changeFilter.bind(this);
  	this.deleteChild = this.deleteChild.bind(this);
  	this.modChild = this.modChild.bind(this);
  	this.toggleBody = this.toggleBody.bind(this);
  	this.waitLastInput = this.waitLastInput.bind(this);
  	this.submitChild = this.submitChild.bind(this);
  	this.toggleMenu = this.toggleMenu.bind(this);
  	this.newChild = this.newChild.bind(this);
  }

  toggleBody (id, toggle) {
  	let newWorks = this.state.works;
  	newWorks.findIndex(work => work.id === id ? work.openBody = toggle : null);
  	this.setState({works: newWorks});
  }

  changeFilter (newFilter) {
  	this.setState({filter: newFilter});
  }

  modChild (id, title, body, count) {
  	let newWorks = this.state.works;
  	newWorks.findIndex(work => {
  		if (work.id === id) {
  			work.title = title;
  			work.body = body;
  			work.inputCount = count;
  		}
  	});
  	this.setState({works: newWorks});
  	setTimeout(this.waitLastInput, 3000, id, title, body, count);
  }

  waitLastInput (id, title, body, count) {
  	const work = this.state.works.find(work => work.id === id);
  	work.inputCount === count ? this.submitChild(id, title, body) : null;
  }

  async submitChild (id, title, body) {
  	const url = this.props.url + '/' + id + '.json';
    const token = this.props.token;
    try {
    	let response = await fetch(url, {
	      headers: {
	        'X-CSRF-Token': token,
	        'Content-Type': 'application/json; charset=utf-8'
	      },
	      method: 'PATCH',
	      credentials: 'same-origin',
	      body: JSON.stringify({
	        title: title,
	        body: body
	      })
	    });
      if (response.ok) {
      	console.log('Updated: ', response);
      }
    }
    catch (error) {
    	console.log(error);
    }
  }

  async deleteChild (id) {
  	let newWorks = this.state.works;
  	newWorks.splice(newWorks.findIndex(work => work.id === id), 1);
  	this.setState({
  		works: newWorks
  	});
    const url = this.props.url + '/' + id + '.json';
    const token = this.props.token;
    try {
    	let response = await fetch(url, {
	      headers: {
	        'X-CSRF-Token': token,
	        'Content-Type': 'application/json; charset=utf-8'
	      },
	      method: 'DELETE',
	      credentials: 'same-origin'
	    });
	    if (response.ok) {
	    	console.log('Deleted: ', response);
	    }
    }
    catch (error) {
    	console.log(error);
    }
  }

  async newChild () {
  	const url = this.props.url + '.json';
  	const token = this.props.token;
		try {
			let response = await fetch(url, {
				headers: {
	        'X-CSRF-Token': token,
	        'Content-Type': 'application/json; charset=utf-8'
				},
				method: 'POST',
				credentials: 'same-origin'
			});
			if (response.ok) {
				console.log('Posted: ', response);
				let jsonResponse = await response.json();
				jsonResponse.openBody = true;
				let newWorks = this.state.works;
				newWorks.unshift(jsonResponse);
				this.setState({works: newWorks});
			}
		}
    catch (error) {
			console.log(error);
  	}
  }

  toggleMenu () {
  	this.state.openMenu ? this.setState({openMenu: false}) : this.setState({openMenu: true});
  }

  render () {
  	const works = this.state.filter ? this.state.works.filter(work => work.title.includes(this.state.filter) || work.body.includes(this.state.filter)) : this.state.works;
    return (
      <div className="container">
        <Menu onChange={this.changeFilter} openMenu={this.state.openMenu} toggleMenu={this.toggleMenu} onClickNew={this.newChild} editUser={this.props.edit_user} signOut={this.props.sign_out} token={this.props.token} />
        <div className="WorkList">
          <MobileMenu onChange={this.changeFilter} onClick={this.toggleMenu} />
          <div className="WorkListBody">
           { works.map((work, i) => <WorkContainer work={work} key={i} onChange={this.modChild} onDelete={this.deleteChild} toggleBody={this.toggleBody} />) }
          </div>
          <a className="addButton material-icons" onClick={this.newChild}>add_circle</a>
        </div>
      </div>
    );
  }
}

WorkList.propTypes = {
  works: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string,
  edit_user: PropTypes.string,
  sign_out: PropTypes.string,
  token: PropTypes.string
}

