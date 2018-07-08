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
    this.toggleFinished = this.toggleFinished.bind(this);
    this.jsonRequest = this.jsonRequest.bind(this);
  }

  componentDidMount () {
    //  adds some attributes on EACH ToDos for future Editting
  	let newWorks = this.state.works;
  	let newDone = this.state.done;
  	newWorks.map(work => {
  		work.inputCount = 0;
  		work.title ? null : work.openBody = true;
  	});
  	newDone.map(work => {
  		work.inputCount = 0;
  	});
  	this.setState({
  		works: newWorks,
  		done: newDone
  	});
  }

  toggleBody (id, toggle) {
    if (this.state.works.findIndex(work => work.id === id) > -1) {
      // When the ToDo is found on progress ToDo lists
    	let newWorks = this.state.works;
    	newWorks.findIndex(work => work.id === id ? work.openBody = toggle : null);
    	this.setState({works: newWorks});
    } else {
      // When the ToDo is found on finished lists
      let newDone = this.state.done;
      newDone.findIndex(work => work.id === id ? work.openBody = toggle : null);
      this.setState({done: newDone});
    }
  }

  changeFilter (newFilter) {
    // the filter should be handled from other components
  	this.setState({filter: newFilter});
  }

  modChildTitle (id, title, count) {
    // splitted editting block for efficiency
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
    // splitted editting block for efficiency
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
    // after 3 sec passed, this block will trigger and check if any user input
  	const work = this.state.works.find(work => work.id === id);
    work && work.inputCount === count ? this.submitChild(id) : null;
  }

  jsonRequest (token, method, body) {
    return {
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: method,
      credentials: 'same-origin',
      body: body
    }
  }

  async submitChild (id) {
    // submit editted ToDo as a Json, then get response that only contains status code
  	const url = this.props.url + '/' + id + '.json';
    const token = this.props.token;
    const work = this.state.works.find(work => work.id === id) || this.state.done.find(work => work.id === id);
    const body = JSON.stringify({
      title: work.title,
	    body: work.body,
      finished_at: work.finished_at
    });

    try {
    	let response = await fetch(url, this.jsonRequest(token, 'PATCH', body));
      if (response.ok) {
      	console.log('Updated: ', response);
      }
    }
    catch (error) {
    	console.log(error);
    }
  }

  async deleteChild (id) {
    // should get '200'.OK
    const url = this.props.url + '/' + id + '.json';
    const token = this.props.token;
    try {
    	let response = await fetch(url, this.jsonRequest(token, 'DELETE', null));
	    if (response.ok) {
	    	console.log('Deleted: ', response);
        if (this.state.works.findIndex(work => work.id === id) > -1) {
          let newWorks = this.state.works;
          newWorks.splice(newWorks.findIndex(work => work.id === id), 1);
          this.setState({works: newWorks});
        } else {
          let newDone = this.state.done;
          newDone.splice(newDone.findIndex(work => work.id === id), 1);
          this.setState({done: newDone});
        }
	    }
    }
    catch (error) {
    	console.log(error);
    }
  }

  async newChild () {
    // Submit Create request and get ampty ToDo with ID, then insert on the 1st of ToDos
    if (!this.state.works[0] || this.state.works[0].title || this.state.works[0].body) {
      const url = this.props.url + '.json';
      const token = this.props.token;
      try {
        let response = await fetch(url, this.jsonRequest(token, 'POST', null));
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

  toggleFinished (id) {
    // extract the ToDo with given ID then add to another list, submit the state
    let newWorks = this.state.works;
    let newDone = this.state.done;

    if (newWorks.findIndex(work => work.id === id) > -1) {
      let work = newWorks.splice(newWorks.findIndex(work => work.id === id), 1)[0];
      work.inputCount++;
      work.openBody = false;
      work.finished_at = new Date;
      newDone.push(work);
      newDone.sort((a, b) => b.id - a.id);
    } else {
      let work = newDone.splice(newDone.findIndex(work => work.id === id), 1)[0];
      work.inputCount++;
      work.finished_at = null;
      newWorks.push(work);
      newWorks.sort((a, b) => b.id - a.id);
    }


    this.setState({
      works: newWorks,
      done: newDone
    });

    this.submitChild(id);
  }

  toggleMenu () {
    // flip the coin
    this.setState(prevState => {return {openMenu: !prevState.openMenu}});
  }

  toggleProgress () {
    // vice versa
    this.setState(prevState => {return {displayProgress: !prevState.displayProgress}});
  }

  render () {
    // define which list to display
  	const displayed = this.state.displayProgress ? this.state.works : this.state.done;
    // list is filtered without reloading
  	const works = this.state.filter ? displayed.filter(work => work.title.includes(this.state.filter) || work.body.includes(this.state.filter)) : displayed;

    return (
      <React.Fragment>
        <Menu onChange={this.changeFilter} openMenu={this.state.openMenu} toggleMenu={this.toggleMenu} onClickNew={this.newChild} displayProgress={this.state.displayProgress} toggleProgress={this.toggleProgress} editUser={this.props.edit_user} signOut={this.props.sign_out} token={this.props.token} />
        <div className="WorkList">
          <MobileMenu onChange={this.changeFilter} onClick={this.toggleMenu} />
          <div className="WorkListBody">
           { works.map((work, i) => <WorkContainer work={work} key={i} modTitle={this.modChildTitle} modBody={this.modChildBody} onDelete={this.deleteChild} toggleBody={this.toggleBody} toggleFinished={this.toggleFinished} />) }
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
