import React from "react"
import { GreetButton } from "./GreetButton"

export default class HelloWorld extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			greet: "Hi"
		};
		this.changeGreet = this.changeGreet.bind(this);
	}

	changeGreet () {
		if (this.state.greet == "Hi") {
			this.setState({
				greet: "Hello"
			});
		} else {
			this.setState({
				greet: "Hi"
			});
		}
	}

	render () {
		return (
			<div>
				<GreetButton onClick={this.changeGreet} />
				Greeting: {this.state.greet}
			</div>
			);
	}
}
