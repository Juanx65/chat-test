import { useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import './App.css';
import { IonContent, IonPage } from '@ionic/react';

const App = () => {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [users, setUsers] = useState<any>([]);

  const joinRoom = async (user: any, room: any) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages: any) => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message: any) => {
    try {
      if (connection)
        await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      if (connection)
        await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <div>
        {!connection
          ? <Lobby joinRoom={joinRoom} />
          : <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />
        }
      </div>
  );
}

export default App;
