import React, { Component } from 'react';

export default class MessageForm extends Component {

    constructor() {
        super();

        this.state = {
            parent: "",
            children: [],
            message: "",
            content: "",
            user: "",
            id: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.msg.id !== prevState.id) {
            return {
                parent: nextProps.msg.parent,
                children: nextProps.msg.children,
                id: nextProps.msg.id,
                user: nextProps.msg.user,
                message: nextProps.msg.message,
                content: nextProps.msg.content
            };
        } else {
            return null;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.message)

        let id = (this.state.id === "" || this.state.id === undefined) ? Math.floor(Math.random() * 255).toString() : this.state.id;

        let msg = {
            id: id,
            message: this.state.message,
            user: this.state.user,
            content: this.state.content
        }
        this.props.onSubmit(msg);
    }

    handleCancel(event) {
        this.props.onCancel(event);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="hidden" className="form-control" id="id" value={this.state.id} onChange={this.handleChange.bind(this)} />
                    <div className="form-group">
                        <label htmlFor="user">Autor</label>
                        <input type="text" className="form-control" id="user" value={this.state.user} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <input type="text" className="form-control" id="message" value={this.state.message} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea className="form-control" id="content" value={this.state.content} onChange={this.handleChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button className="btn btn-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
}