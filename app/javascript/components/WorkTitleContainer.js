import React from "react"
import PropTypes from "prop-types"
import { WorkTitle } from "./WorkTitle"
import { WorkEditTitle } from "./WorkEditTitle"

export class WorkTitleContainer extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		clickCount: 0,
      title: this.props.title
  	};
  	this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
  	if (this.state.clickCount == 0) {
  		this.setState({
  			clickCount: 1
  		});
  		this.props.onClick();
  	} else if (this.state.clickCount == 1) {
  		this.setState({
  			clickCount: 2
  		});
  	}
  }

  render () {
    const display = (this.state.clickCount == 2 ? true : false );
    return (
      <div onClick={this.handleClick}>
        ReactComponentテスト {this.state.title} <br />
      	{ display ? <WorkEditTitle value={this.state.title} /> : <WorkTitle title={this.state.title} /> }
      </div>
    );
  }
}
