import React from "react"
import PropTypes from "prop-types"

export class WorkEditBody extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
  		body: this.props.value
  	};
  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
  	this.setState({
  		body: e.target.value
  	});
  }

  render () {
    return (
      <React.Fragment>
      	<input type="text" value={this.state.body} onChange={this.handleChange} />
      </React.Fragment>
    );
  }
}
