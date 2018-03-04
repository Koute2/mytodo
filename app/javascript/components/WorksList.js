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
  	const newWorks = this.state.works.map((work, i) => {
  		if (work.id === id) {
  			work.openBody = toggle;
  			return work;
  		} else {
  			return work;
  		}
  	});
  	this.setState({
  		works: newWorks
  	});
  	console.log(newWorks);
  }

  changeFilter (newFilter) {
  	this.setState({
  		filter: newFilter
  	});
  }

  modChild (id, newTitle, newBody) {
  	const newWorks = this.state.works.map((work, i) => {
  		if (work.id === id) {
  			work.title = newTitle;
  			work.body = newBody;
  			return work;
  		} else {
  			return work;
  		}
  	})
  	this.setState({
  		works: newWorks
  	});
  }

  deleteChild (id) {
  	const newWorks = this.state.works.filter(work => work.id !== id);
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
