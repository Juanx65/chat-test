import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUsers';
import { Button } from 'react-bootstrap';
import { IonContent } from '@ionic/react';

const Chat = ({ sendMessage, messages, users, closeConnection }: any) => {
    return (
        <div>
            <div className='leave-room'>
                <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
            </div>
            <ConnectedUsers users={users} />
            <div className='chat'>
                <MessageContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;
