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
    console.log('Waiting for your last input...');
    setTimeout(this.waitLastInput, 5000, count);
  }

  modBody (event) {
    let count = this.state.inputCount;
    count++;
    this.setState({
      body: event.target.value,
      inputCount: count
    });
    console.log('Waiting for your last input...');
    setTimeout(this.waitLastInput, 5000, count);
  }

  waitLastInput (count) {
    console.log('Your input was ' + count + 'th and the state is ' + this.state.inputCount);
    count == this.state.inputCount ? this.submitState() : console.log('Canceled transaction');
  }

  submitState () {
    console.log('now committing');
    const url = this.props.work_path + '.json';
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
      console.log('Success: ', response)
    });
  }

  delete () {
    if (confirm("削除しますか？")) {
      console.log('start deleting');
      const url = this.props.work_path + '.json';
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
        console.log('Success: ', response);
        this.setState({
          show: false
        });
        console.log('bye');
      });
    }
  }

  render () {
    if (this.state.show == false) {
      return null;
    } else if (this.state.openBody == false && this.state.title != "") {
      return <div onClick={this.toggleBody} className="WorkContainer flex onHover"><span className="flexContent">{this.state.title}</span><i className="material-icons openBody">expand_more</i></div>;
    } else {
      return (
        <div className="WorkContainer">
          <div className="flex"><input type="text" onChange={this.modTitle} value={this.state.title} placeholder="Title:" /><i className="material-icons deleteIcon" onClick={this.delete}>delete_sweep</i></div>
          <div className="bar" />
          <div className="flex"><textarea type="text" onChange={this.modBody} value={this.state.body} placeholder="Details:" /></div>
          <div onClick={this.toggleBody} className="closeBar onHover"><i className="material-icons closeBody">expand_less</i></div>
        </div>
        );
    }
  }
}
