import React from "react"
import PropTypes from "prop-types"

export class WorkEditTitle extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  	  title: this.props.value
  	};
  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
  	this.setState({
  	  title: e.target.value
  	});
  }

  render () {
    return (
      <React.Fragment>
      	<input type="text" value={this.state.title} onChange={this.handleChange} />
      </React.Fragment>
    );
  }
}
