import React from "react"
import PropTypes from "prop-types"
import WorkContainer from "./WorkContainer"
import MobileMenu from "./MobileMenu"

export default class WorksList extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		works: this.props.works
  	};
  	this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter (filter) {
  	if (filter) {
  		const newWorks = this.props.works.filter(work => work.title.includes(filter) || work.body.includes(filter));
  		this.setState({
  			works: newWorks
  		});
  	} else {
  		this.setState({
  			works: this.props.works
  		});
  	}
  }

  render () {
  	return (
     	<React.Fragment>
				<div className="MobileMenu"><MobileMenu onChange={this.changeFilter} /></div>
       	{ this.state.works.map((work, i) => <WorkContainer work={work} key={i} url={this.props.url} token={this.props.token} />) }
  		</React.Fragment>
   );
  }
}
