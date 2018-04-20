import React from "react"
import PropTypes from "prop-types"
import WorkContainer from "./WorkContainer"
import MobileMenu from "./MobileMenu"
import Menu from "./Menu"


class Container extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		works: this.props.works,
  		done: this.props.done,
  		filter: "",
  		openMenu: false,
  		displayProgress: true
  	};
  	this.changeFilter = this.changeFilter.bind(this);
    this.newChild = this.newChild.bind(this);
    this.modChildTitle = this.modChildTitle.bind(this);
    this.modChildBody = this.modChildBody.bind(this);
    this.waitLastInput = this.waitLastInput.bind(this);
    this.submitChild = this.submitChild.bind(this);
  	this.deleteChild = this.deleteChild.bind(this);
  	this.toggleBody = this.toggleBody.bind(this);
  	this.toggleMenu = this.toggleMenu.bind(this);
  	this.toggleProgress = this.toggleProgress.bind(this);
  }

  componentDidMount () {
  	let newWorks = this.state.works;
  	let newDone = this.state.done;
  	newWorks.map(work => {
  		work.inputCount = 0;
  		work.title ? null : work.openBody = true;
  	});
  	newDone.map(work => {
  		work.inputCount = 0;
  		work.title ? null : work.openBody = true;
  	});
  	this.setState({
  		works: newWorks,
  		done: newDone
  	});
  }

  toggleBody (id, toggle) {
  	let newWorks = this.state.works;
  	newWorks.findIndex(work => work.id === id ? work.openBody = toggle : null);
  	this.setState({works: newWorks});
  }

  changeFilter (newFilter) {
  	this.setState({filter: newFilter});
  }

  modChildTitle (id, title, count) {
    let newWorks = this.state.works;
    newWorks.findIndex(work => {
      if (work.id === id) {
        work.title = title;
        work.inputCount = count;
      }
    });
    this.setState({works: newWorks});
    setTimeout(this.waitLastInput, 3000, id, count);
  }

  modChildBody (id, body, count) {
    let newWorks = this.state.works;
    newWorks.findIndex(work => {
      if (work.id === id) {
        work.body = body;
        work.inputCount = count;
      }
    });
    this.setState({works: newWorks});
    setTimeout(this.waitLastInput, 3000, id, count);
  }

  waitLastInput (id, count) {
  	const work = this.state.works.find(work => work.id === id);
  	work.inputCount === count ? this.submitChild(id) : null;
  }

  async submitChild (id) {
  	const url = this.props.url + '/' + id + '.json';
    const token = this.props.token;
    const work = this.state.works.find(work => work.id === id);
    try {
    	let response = await fetch(url, {
	      headers: {
	        'X-CSRF-Token': token,
	        'Content-Type': 'application/json; charset=utf-8'
	      },
	      method: 'PATCH',
	      credentials: 'same-origin',
	      body: JSON.stringify({
	        title: work.title,
	        body: work.body
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
    if (this.state.works[0].title || this.state.works[0].body) {
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
          jsonResponse.inputCount = 0;
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
  }

  toggleMenu () {
  	this.state.openMenu ? this.setState({openMenu: false}) : this.setState({openMenu: true});
  }

  toggleProgress () {
  	this.state.displayProgress ? this.setState({displayProgress: false}) : this.setState({displayProgress: true});
  }

  render () {
  	const displayed = this.state.displayProgress ? this.state.works : this.state.done;
  	const works = this.state.filter ? displayed.filter(work => work.title.includes(this.state.filter) || work.body.includes(this.state.filter)) : displayed;

    return (
      <React.Fragment>
        <Menu onChange={this.changeFilter} openMenu={this.state.openMenu} toggleMenu={this.toggleMenu} onClickNew={this.newChild} displayProgress={this.state.displayProgress} toggleProgress={this.toggleProgress} editUser={this.props.edit_user} signOut={this.props.sign_out} token={this.props.token} />
        <div className="WorkList">
          <MobileMenu onChange={this.changeFilter} onClick={this.toggleMenu} />
          <div className="WorkListBody">
           { works.map((work, i) => <WorkContainer work={work} key={i} modTitle={this.modChildTitle} modBody={this.modChildBody} onDelete={this.deleteChild} toggleBody={this.toggleBody} />) }
          </div>
          <a className="addButton material-icons" onClick={this.newChild}>add_circle</a>
        </div>
      </React.Fragment>
    );
  }
}

Container.propTypes = {
  works: PropTypes.arrayOf(PropTypes.object),
  done: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string,
  edit_user: PropTypes.string,
  sign_out: PropTypes.string,
  token: PropTypes.string
}

export default Container
