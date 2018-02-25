import React from "react"
import PropTypes from "prop-types"
import { WorkBody } from "./WorkBody"
import { WorkEditBody } from "./WorkEditBody"

export class WorkBodyContainer extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		clicked: false,
      body: this.props.body
  	};
  	this.onClick = this.onClick.bind(this);
  }

  onClick () {
  	if (this.state.clicked == false) {
  		this.setState({
  			clicked: true
  		});
  	}
  }

  render () {
  	const isClicked = this.state.clicked
    return (
      <div onClick={this.onClick}>
      	{ isClicked ? <WorkEditBody value={this.state.body} /> : <WorkBody body={this.state.body} /> }
      </div>
    );
  }
}