import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { RequestMethod } from '../api/methods';
import { doRequest } from '../api/do-request';
import { useNavigate } from 'react-router-dom';

export default function NewAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandle = async (event: any) => {
    event.preventDefault();
    console.log(`Email: ${email} | Password: ${password}`);
    const signUpResponse = await doRequest({
      url: 'http://localhost:3001/api/users/signup',
      method: RequestMethod.post,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(`RESPONSE : ${JSON.stringify(signUpResponse)}`);
    navigate('/tickets');
  };
  return (
    <Container>
      <Form onSubmit={onSubmitHandle}>
        <Form.Group className='mt-5 mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter email'
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-4' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className='btn btn-primary btn-large centerButton'
          variant='primary'
          type='submit'
        >
          Create Account
        </Button>
      </Form>
    </Container>
  );
}
