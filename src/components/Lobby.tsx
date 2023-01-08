import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Lobby = ({ joinRoom }:any) => {
    const [user, setUser] = useState<string>();
    const [room, setRoom] = useState<string>();

    return <Form className='lobby'
        onSubmit={(e:any) => {
            e.preventDefault();
            joinRoom(user, room);
        }} >
        <Form.Group>
            <Form.Control placeholder="name" onChange={e => setUser(e.target.value)} />
            <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
    </Form>
}

export default Lobby;