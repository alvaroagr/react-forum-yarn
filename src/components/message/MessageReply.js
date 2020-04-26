import React, {Component} from 'react';
import firebase from '../../config/firebase.js'
import MessageForm from './MessageForm'

export default class MessageReply extends Component {
    
    constructor() {
        super();
        
        this.state = {
            parentmsg:{id:""},
            message:{id: ""},
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        firebase.getMessage(`${params.id}`)
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    this.setState({parentmsg: doc.data()});
                }
            })
    }

    handleSubmit(message) {
        // Submitting the Reply
        let reply = {
            parent: this.state.parentmsg.id,
            id: message.id,
            message: message.message,
            content: message.content,
            user: message.user
        }
        firebase.submitMessage(reply)
        .then(doc => {
            console.log(doc);
            console.log("Reply saved.")
        });
        
        // Updating the Parent
        let parent ={
            id: this.state.parentmsg.id,
            message: this.state.parentmsg.message,
            content: this.state.parentmsg.content,
            user: this.state.parentmsg.user,
            children: this.state.parentmsg.children
        }
        if(parent.children === undefined){
            parent.children = [];
        }
        parent.children.push(reply.id)
        firebase.submitMessage(parent)
            .then(doc => {
                console.log(doc);
                console.log("Parent updated.")
                const { history } = this.props;
                history.push(`/messages/${message.id}`);
            });
    }

    handleCancel(event) {
        event.preventDefault();

        const { history } = this.props;
        const { parentmsg } = this.state;
        history.push(`/messages/${parentmsg.id}`);
        console.log("You've cancelled the edit.")
    }

    render() {
        return (
            <div>
                <h2><b>Responder a:</b> {this.state.parentmsg.message}</h2>
                <MessageForm msg={this.state.message} onSubmit={this.handleSubmit.bind(this)} onCancel={this.handleCancel.bind(this)} />
            </div>
        )
    }
}