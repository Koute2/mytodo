import React from "react"
import PropTypes from "prop-types"
import WorkContainer from "./WorkContainer"
import MobileMenu from "./MobileMenu"

export default class WorksList extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		works: this.props.works,
  		filter: ""
  	};
  	this.changeFilter = this.changeFilter.bind(this);
  	this.deleteChild = this.deleteChild.bind(this);
  	this.modChild = this.modChild.bind(this);
  	this.toggleBody = this.toggleBody.bind(this);
  }

  toggleBody (id, toggle) {
  	let newWorks = this.state.works;
  	newWorks.findIndex(work => work.id === id ? work.openBody = toggle : null);
  	this.setState({
  		works: newWorks
  	});
  }

  changeFilter (newFilter) {
  	this.setState({
  		filter: newFilter
  	});
  }

  modChild (id, newTitle, newBody) {
  	let newWorks = this.state.works;
  	newWorks.findIndex(work => {
  		if (work.id === id) {
  			work.title = newTitle;
  			work.body = newBody;
  		}
  	});
  	this.setState({
  		works: newWorks
  	});
  }

  deleteChild (id) {
  	let newWorks = this.state.works;
  	newWorks.splice(newWorks.findIndex(work => work.id === id), 1);
  	this.setState({
  		works: newWorks
  	});
  }

  render () {
  	const works = this.state.filter ? this.state.works.filter(work => work.title.includes(this.state.filter) || work.body.includes(this.state.filter)) : this.state.works;
  	return (
     	<React.Fragment>
				<div className="MobileMenu"><MobileMenu value={this.state.filter} onChange={this.changeFilter} /></div>
       	{ works.map((work, i) => <WorkContainer work={work} key={i} url={this.props.url} token={this.props.token} onChange={this.modChild} onDelete={this.deleteChild} toggleBody={this.toggleBody} />) }
  		</React.Fragment>
   );
  }
}
