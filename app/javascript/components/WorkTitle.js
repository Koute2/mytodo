import React from "react"
import PropTypes from "prop-types"

export class WorkTitle extends React.Component {
  render () {
    return (
      <React.Fragment>
      	{this.props.title}
      </React.Fragment>
    );
  }
}
