import React from "react"
import PropTypes from "prop-types"

export default class WorkContainer extends React.Component {
  constructor (props) {
  	super(props);
    this.toggleBody = this.toggleBody.bind(this);
    this.modTitle = this.modTitle.bind(this);
    this.modBody = this.modBody.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFinished = this.handleFinished.bind(this);
  }

  toggleBody () {
    this.props.toggleBody(this.props.work.id, !this.props.work.openBody);
  }

  modTitle (event) {
    const count = this.props.work.inputCount + 1;
    this.props.modTitle(this.props.work.id, event.target.value, count);
  }

  modBody (event) {
    const count = this.props.work.inputCount + 1;
    this.props.modBody(this.props.work.id, event.target.value, count);
  }

  handleDelete () {
    confirm("削除しますか？") ? this.props.onDelete(this.props.work.id) : null;
  }

  handleFinished (event) {
    this.props.work.title || this.props.work.body ? this.props.toggleFinished(this.props.work.id) : null;
    event.stopPropagation();
  }

  render () {
    const finished = this.props.work.finished_at;
    if (this.props.work.openBody) {
      return (
        <div className="WorkContainer">
          <div className="flex"><i className={finished ? "material-icons checkDone" : "material-icons checkProg"} onClick={this.handleFinished}>check_circle</i><input type="text" onChange={this.modTitle} value={this.props.work.title} placeholder="mode_edit" readOnly={ finished ? true : false } /><i className="material-icons deleteIcon" onClick={this.handleDelete}>delete_sweep</i></div>
          <div className="bar" />
          <div className="flex"><textarea type="text" rows="6" onChange={this.modBody} value={this.props.work.body} placeholder="event_note" readOnly={ finished ? true : false } /></div>
          <div onClick={this.toggleBody} className="closeBar"><i className="material-icons closeBody">expand_less</i></div>
        </div>
      );
    } else {
      return <div onClick={this.toggleBody} className="WorkContainer flex openBar"><i className={finished ? "material-icons checkDone" : "material-icons checkProg" } onClick={this.handleFinished}>check_circle</i><div className="flexContent">{this.props.work.title}</div><i className="material-icons openBody">expand_more</i></div>;
    }
  }
}

WorkContainer.propTypes = {
  work: PropTypes.object,
  modTitle: PropTypes.func,
  modBody: PropTypes.func,
  onDelete: PropTypes.func,
  toggleBody: PropTypes.func,
  toggleFinished: PropTypes.func
};

