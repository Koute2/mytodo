import React from "react"
import PropTypes from "prop-types"

export default class WorkContainer extends React.Component {
  constructor (props) {
  	super(props);
  	this.state = {
      title: this.props.work.title,
      body: this.props.work.body,
  		openBody: false,
      show: true,
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
    this.state.title ? null : this.setState({title: "", openBody: true});
    this.state.body ? null : this.setState({body: ""});
  }

  toggleBody () {
    this.state.openBody && this.state.title != "" ? this.setState({openBody: false}) : this.setState({openBody: true});
  }

  modTitle (event) {
    let count = this.state.inputCount;
    count++;
    this.setState({
      title: event.target.value,
      inputCount: count
    });
    setTimeout(this.waitLastInput, 3000, count);
  }

  modBody (event) {
    let count = this.state.inputCount;
    count++;
    this.setState({
      body: event.target.value,
      inputCount: count
    });
    setTimeout(this.waitLastInput, 3000, count);
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
        this.setState({
          show: false
        });
      });
    }
  }

  render () {
    if (this.state.show == false) {
      return null;
    } else if (this.state.openBody == false) {
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
