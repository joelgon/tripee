import React, {useState} from 'react';
import api from '../../services/api'
import { RouteComponentProps } from 'react-router';

import './login.css'

type SomeComponentProps = RouteComponentProps
const Login: React.FC<SomeComponentProps> = ({history}) => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    async function login(){
        try {
            const response = await api.post('/auth/v1/login', { Email, Password})
            const {token} = response.data
            localStorage.setItem('Token', token)
            history.push('/main')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='center'>
        <form >
            <div className="form-group">
                <input 
                    type="email" 
                    className="form-control" 
                    value={Email} 
                    onChange={({target}) => setEmail(target.value)} 
                    placeholder="Email" 
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Senha" 
                    value={Password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="button" onClick={() => login()} className="btn btn-primary">Login</button>
        </form>
    </div>
  );
}
export default Login