import React, {Component} from 'react';
import firebase from '../../config/firebase.js'
import MessageForm from './MessageForm'

export default class MessageEdit extends Component {
    constructor() {
        super();
        
        this.state = {
            message:{id: ""},
            // db: firebase.firestore()
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        // let msgRef = this.state.db.collection('messages').doc(`${params.id}`);
        firebase.getMessage(`${params.id}`)
        // msgRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    this.setState({message: doc.data()});
                }
            })
    }

    handleSubmit(message) {
        firebase.submitMessage(message)
            .then(doc => {
                console.log(doc);
                console.log("Message saved.")
                const { history } = this.props;
                history.push(`/messages/${message.id}`);
            });
    }

    handleCancel(event) {
        event.preventDefault();

        const { history } = this.props;
        const { message } = this.state;

        history.push(`/messages/${message.id}`);

        console.log("You've cancelled the edit.")
    }

    render() {
        return (
            <div>
                <h2>Editar Mensaje</h2>
                <MessageForm msg={this.state.message} onSubmit={this.handleSubmit.bind(this)} onCancel={this.handleCancel.bind(this)} />
            </div>
        )
    }
}