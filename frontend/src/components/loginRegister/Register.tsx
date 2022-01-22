import React from "react";
import { registerUser } from "../../api/LoginRegister";

type RegisterProps = {};
type RegisterState = { usernameValue: string, passwordValue: string };

export default class Register extends React.Component<RegisterProps, RegisterState>
{
    constructor(props : RegisterProps)
    {
        super(props);
        this.state = {
            usernameValue: "",
            passwordValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : any) : void
    {
        switch (event.target.id)
        {
            case "registerUsername":
                this.setState({usernameValue: event.target.value});
                break;
            case "registerPassword":
                this.setState({passwordValue: event.target.value});
                break;
        }

    }

    async handleSubmit(event : any) : Promise<void>
    {
        event.preventDefault();

        const responseText = await registerUser(this.state.usernameValue, this.state.passwordValue);
        console.log("Server Response:");
        console.log(responseText);
    }

    render()
    {
        return (
            <div className="container mt-3 mb-3">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="registerUsername" className="form-label">Username:</label>
                        <input type="text"
                                id="registerUsername"
                                name="registerUsername"
                                className="form-control"
                                placeholder="Username"
                                onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerPassword" className="form-label">Password:</label>
                        <input type="password"
                               id="registerPassword"
                               name="registerPassword"
                               className="form-control"
                               placeholder="Password"
                               onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}