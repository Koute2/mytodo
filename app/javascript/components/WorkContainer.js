import React from "react"
import PropTypes from "prop-types"

export default class WorkContainer extends React.Component {
  constructor (props) {
  	super(props);
    this.toggleBody = this.toggleBody.bind(this);
    this.modTitle = this.modTitle.bind(this);
    this.modBody = this.modBody.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    const id = this.props.work.id;
    this.props.work.openBody || this.props.work.title == "" ? this.props.toggleBody(id, true) : null;
  }

  toggleBody () {
    const id = this.props.work.id;
    this.props.work.openBody && this.props.work.title != "" ? this.props.toggleBody(id, false) : this.props.toggleBody(id, true);
  }

  modTitle (event) {
    const count = this.props.work.inputCount ? this.props.work.inputCount + 1 : 1;
    const newTitle = event.target.value;
    this.props.modTitle(this.props.work.id, newTitle, count);
  }

  modBody (event) {
    const count = this.props.work.inputCount ? this.props.work.inputCount + 1 : 1;
    const newBody = event.target.value;
    this.props.modBody(this.props.work.id ,newBody, count);
  }

  handleDelete () {
    confirm("削除しますか？") ? this.props.onDelete(this.props.work.id) : null;
  }

  render () {
    if (this.props.work.openBody) {
      return (
        <div className="WorkContainer">
          <div className="flex"><input type="text" onChange={this.modTitle} value={this.props.work.title} placeholder="mode_edit" /><i className="material-icons deleteIcon" onClick={this.handleDelete}>delete_sweep</i></div>
          <div className="bar" />
          <div className="flex"><textarea type="text" rows="6" onChange={this.modBody} value={this.props.work.body} placeholder="event_note" /></div>
          <div onClick={this.toggleBody} className="closeBar"><i className="material-icons closeBody">expand_less</i></div>
        </div>
      );
    } else {
      return <div onClick={this.toggleBody} className="WorkContainer flex openBar"><div className="flexContent">{this.props.work.title}</div><i className="material-icons openBody">expand_more</i></div>;
    }
  }
}

WorkContainer.propTypes = {
  work: PropTypes.object,
  modTitle: PropTypes.func,
  modBody: PropTypes.func,
  onDelete: PropTypes.func,
  toggleBody: PropTypes.func
};

