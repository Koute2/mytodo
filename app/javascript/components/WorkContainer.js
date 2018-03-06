import React from "react"
import PropTypes from "prop-types"

export default class WorkContainer extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
      title: this.props.work.title,
      body: this.props.work.body,
  		openBody: false,
      inputCount: 0
  	};
    this.toggleBody = this.toggleBody.bind(this);
    this.modTitle = this.modTitle.bind(this);
    this.modBody = this.modBody.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount () {
    const id = this.props.work.id;
    this.props.work.openBody || this.state.title == "" ? this.props.toggleBody(id, true) : null;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      title: nextProps.work.title,
      body: nextProps.work.body,
      openBody: nextProps.work.openBody
    });
  }

  toggleBody () {
    const id = this.props.work.id;
    this.state.openBody && this.state.title != "" ? this.props.toggleBody(id, false) : this.props.toggleBody(id, true);
  }

  modTitle (event) {
    const id = this.props.work.id;
    const count = this.state.inputCount + 1;
    const newTitle = event.target.value;
    const body = this.state.body;
    this.setState({
      inputCount: count
    });
    this.props.onChange(id, newTitle, body, count);
  }

  modBody (event) {
    const id = this.props.work.id;
    const count = this.state.inputCount + 1;
    const title = this.state.title;
    const newBody = event.target.value;
    this.setState({
      inputCount: count
    });
    this.props.onChange(id, title, newBody, count);
  }

  handleDelete () {
    confirm("削除しますか？") ? this.props.onDelete(this.props.work.id) : null;
  }

  render () {
    if (this.state.openBody) {
      return (
        <div className="WorkContainer">
          <div className="flex"><input type="text" onChange={this.modTitle} value={this.state.title} placeholder="mode_edit" /><i className="material-icons deleteIcon" onClick={this.handleDelete}>delete_sweep</i></div>
          <div className="bar" />
          <div className="flex"><textarea type="text" rows="6" onChange={this.modBody} value={this.state.body} placeholder="event_note" /></div>
          <div onClick={this.toggleBody} className="closeBar animBar"><i className="material-icons closeBody">expand_less</i></div>
        </div>
      );
    } else {
      return <div onClick={this.toggleBody} className="WorkContainer flex animBar"><span className="flexContent">{this.state.title}</span><i className="material-icons openBody">expand_more</i></div>;
    }
  }
}
