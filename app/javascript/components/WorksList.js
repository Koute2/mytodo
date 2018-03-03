import React from "react"
import PropTypes from "prop-types"
import WorkContainer from "./WorkContainer"
import MobileMenu from "./MobileMenu"

export default class WorksList extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		filter: ""
  	};
  }

  render () {
  	console.log(this.state.filter)
  	const works = this.props.works.filter(work => work.title.includes(this.state.filter));
  	console.log(works);
  	return (
     	<React.Fragment>
				<div className="MobileMenu"><MobileMenu value={this.state.filter} /></div>
       	{ works.map((work, i) => <WorkContainer work={work} key={i} url={this.props.url} token={this.props.token} />) }
  		</React.Fragment>
   );
  }
}
