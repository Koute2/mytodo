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
    this.waitLastInput = this.waitLastInput.bind(this);
    this.submitState = this.submitState.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount () {
    this.props.work.openBody || this.state.title == "" ? this.setState({openBody: true}) : null;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      title: nextProps.work.title,
      body: nextProps.work.body,
      inputCount: 0
    });
    nextProps.work.openBody || nextProps.work.title == "" ? this.setState({openBody: true}) : this.setState({openBody: false});
  }

  toggleBody () {
    if (this.state.openBody && this.state.title != "") {
      this.setState({openBody: false});
      this.props.toggleBody(this.props.work.id, false);
    } else {
      this.setState({openBody: true});
      this.props.toggleBody(this.props.work.id, true);
    }
  }

  modTitle (event) {
    const count = this.state.inputCount + 1;
    this.setState({
      title: event.target.value,
      inputCount: count
    });
    setTimeout(this.waitLastInput, 2000, count);
  }

  modBody (event) {
    const count = this.state.inputCount + 1;
    this.setState({
      body: event.target.value,
      inputCount: count
    });
    setTimeout(this.waitLastInput, 2000, count);
  }

  waitLastInput (count) {
    count == this.state.inputCount ? this.submitState() : null;
  }

  submitState () {
    const url = this.props.url + '/' + this.props.work.id + '.json';
    const token = this.props.token;
    fetch(url, {
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      })
    }).catch(error => {
      console.error('Error: ', error)
    }).then(response => {
      console.log('Success: ', response);
      this.props.onChange(this.props.work.id, this.state.title, this.state.body)
    });
  }

  delete () {
    if (confirm("削除しますか？")) {
      console.log('start deleting');
      const url = this.props.url + '/' + this.props.work.id + '.json';
      const token = this.props.token;
      fetch(url, {
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'DELETE',
        credentials: 'same-origin'
      }).catch(error => {
        console.error('Error: ', error)
      }).then(response => {
        console.log('Deleted: ', response);
        this.props.onDelete(this.props.work.id);
      });
    }
  }

  render () {
    if (this.state.openBody == false) {
      return <div onClick={this.toggleBody} className="WorkContainer flex animBar"><span className="flexContent">{this.state.title}</span><i className="material-icons openBody">expand_more</i></div>;
    } else {
      return (
        <div className="WorkContainer">
          <div className="flex"><input type="text" onChange={this.modTitle} value={this.state.title} placeholder="work" /><i className="material-icons deleteIcon" onClick={this.delete}>delete_sweep</i></div>
          <div className="bar" />
          <div className="flex"><textarea type="text" rows="6" onChange={this.modBody} value={this.state.body} placeholder="event_note" /></div>
          <div onClick={this.toggleBody} className="closeBar animBar"><i className="material-icons closeBody">expand_less</i></div>
        </div>
      );
    }
  }
}
