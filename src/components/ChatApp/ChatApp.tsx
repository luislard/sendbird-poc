import React, {useEffect, useState} from 'react';
import SendBird, {AdminMessage, FileMessage, OpenChannel, UserMessage} from 'sendbird';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import MiddleSection from '../MiddleSection/MiddleSection';
import RightSideBar from '../RightSideBar/RightSideBar';
import './ChatApp.scss';

let globalOpenChannel: OpenChannel;

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('userid') ?? 'fallbackUser';
const channelId = urlParams.get('channelid') ?? 'fallbackChannel';
const channelUrl = urlParams.get('channelurl') ?? '';
const appId = urlParams.get('appid') ?? '';

function ChatApp() {
    const sb = new SendBird({appId: appId});

    const [messages, setMessages] = useState([] as any[]);

    const getChannelAndEnter = (channelUrl) => {
        sb.OpenChannel.getChannel(channelUrl, function(openChannel, error) {
            if (error) {
                return;
            }
            console.log('the channel we get', openChannel);
            globalOpenChannel = openChannel;
            openChannel.enter(function(response, error) {
                if (error) {
                    return;
                }
                console.log('response', response);
                const ChannelHandler = new sb.ChannelHandler();

                ChannelHandler.onMessageReceived = function(channel, message) {
                    console.log('MESSAGE RECEIVED!', channel, message);
                    setMessages(messages => [...messages, message]);
                };

                sb.addChannelHandler(channelId, ChannelHandler);
                console.log('added listener to message received');

            });
        });
    };

    const createChannelCb = (openChannel: OpenChannel, error: any) => {
        if (error) console.log('error!', error);
        console.log('chanel created!', openChannel);
        getChannelAndEnter(openChannel.url);
    };


    const onSendMessage = (message: string) => {
        globalOpenChannel.sendUserMessage(message, '', '', function(message, error) {
            if (error) {
                return;
            }
            setMessages( messages => [...messages, message]);
        });
    };

    useEffect(() => {
        console.log('useEffect');
        sb.connect(userId, (user, error) => {
            if (error) console.log('error!', error);
            console.log('connected!');
            if (!channelUrl) {
                sb.OpenChannel.createChannel(
                    channelId,
                    '',
                    '',
                    [],
                    '',
                    createChannelCb
                );
            } else {
                getChannelAndEnter(channelUrl);
            }

        });

    }, []);

    return (
        <div className="ChatApp">
            <LeftSideBar />
            <MiddleSection onSendMessage={onSendMessage} messages={messages} />
            <RightSideBar />
        </div>
    );
}

export default ChatApp;