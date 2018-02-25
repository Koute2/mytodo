import React from "react"
import PropTypes from "prop-types"
import { WorkContainer } from "./WorkContainer"

export default class WorkLists extends React.Component {
  render () {
    const works = this.props.works
    return (
      <React.Fragment>
        { works.map((work, i) => <WorkContainer work={work} key={i} /> )}
      </React.Fragment>
    );
  }
}

WorkLists.propTypes = {
  works: PropTypes.array
};