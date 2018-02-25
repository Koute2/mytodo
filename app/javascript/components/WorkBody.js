import React from "react"
import PropTypes from "prop-types"

export class WorkBody extends React.Component {
  render () {
    return (
      <React.Fragment>
      	{this.props.body}
      </React.Fragment>
    );
  }
}
