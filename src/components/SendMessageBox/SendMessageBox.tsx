import React, {useState} from 'react';
import './SendMessageBox.scss';

function SendMessageBox({ onSendMessage }) {

    const [message, setMessage] = useState('');

    const getInputValue = (event) => {
        setMessage(event.target.value);
    };

    const onSendClicked = (event) => {
        event.target.reset();
        event.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form className="SendMessageBox" onSubmit={onSendClicked}>
            <input
                className="message-control"
                type="text"
                onChange={getInputValue}
            />
            <button
                className="send"
                type="submit"
            >Send</button>
        </form>
    );
}

export default SendMessageBox;