import React from "react"
import PropTypes from "prop-types"
import { WorkTitleContainer } from "./WorkTitleContainer"
import { WorkBodyContainer } from "./WorkBodyContainer"

export class WorkContainer extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		displayBody: false
  	};
    this.displayBody = this.displayBody.bind(this);
  }

  displayBody () {
  	this.setState({
  		displayBody: true
  	});
  }

  render () {
    const display = this.state.displayBody;
    return (
      <React.Fragment>
      	<WorkTitleContainer title={this.props.work.title} onClick={this.displayBody} />
      	{ display ? <WorkBodyContainer body={this.props.work.body} /> : null }
      </React.Fragment>
    );
  }
}
