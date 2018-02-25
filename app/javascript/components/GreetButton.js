import React from "react"

export class GreetButton extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			greet: "Hello"
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		if (this.state.greet == "Hello") {
			this.setState({
				greet: "Hi"
			});
		} else {
			this.setState({
				greet: "Hello"
			});
		}
		this.props.onClick();
	}

	render () {
		return (
			<button onClick={this.handleClick}>
				Say {this.state.greet}!
			</button>
			);
	}
}