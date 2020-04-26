import React, { Component } from 'react'
import firebase from '../../config/firebase.js'
// import api from '../../config/api.js'
import MessageForm from './MessageForm'

export default class MessageAdd extends Component {
    constructor() {
        super();
        this.state = {
            msg: {},
            // db: firebase.firestore()
        }
    }

    handleSubmit(message) {
        console.log(message)
        message.parent = null
        firebase.submitMessage(message)
            .then(() => {
                console.log('saved:', message);
                const { history } = this.props;
                history.push(`/messages/${message.id}`);
            });
    }

    handleCancel(event) {
        event.preventDefault();
        const { history } = this.props;
        history.push(`/messages`)
        console.log("You've cancelled the submission.")
    }

    render() {
        return (
            <div>
                <h2>Nuevo Mensaje</h2>
                <MessageForm msg={this.state.msg} onSubmit={this.handleSubmit.bind(this)} onCancel={this.handleCancel.bind(this)} />
            </div>
        )
    }
}
