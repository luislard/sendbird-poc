import React from 'react';
import './Message.scss';

function Message( { message } ) {
    return (
        <div className="Message">
            {message.message}
        </div>
    );
}

export default Message;