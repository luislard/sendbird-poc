import React from 'react';
import './MiddleSection.scss';
import SendMessageBox from '../SendMessageBox/SendMessageBox';
import Message from '../Message/Message';
import {AdminMessage, FileMessage, UserMessage} from 'sendbird';

function MiddleSection({ onSendMessage, messages }) {
    return (
        <div className="MiddleSection">
            {messages.map((message: UserMessage | FileMessage | AdminMessage) => <Message key={message.messageId} message={message} />)}
            <SendMessageBox onSendMessage={onSendMessage} />
        </div>
    );
}

export default MiddleSection;