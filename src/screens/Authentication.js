import { Link } from 'react-router-dom';
import './Authentication.css';
import React from 'react';
import { useUser } from '../context/UserContext';

export const AuthenticationMode = Object.freeze({
  Login: 'Login',
  Register: 'Register'
});

export default function Authentication({authenticationMode})  {
  const { user, setUser, singUp, signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authenticationMode === AuthenticationMode.Login) {
        await signUp();
        navigate('/signin');
      } else {
        await signIn();
        navigate('/');
      }
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.error : error;
      alert(message);
    }
  }

  return (
    <div>
      <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
      <form>
        <div>
          <label>Email</label>
          <input type="email" value={user.email} onChange={e => setUser({...user,email: e.target.value})}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={user.password} onChange={e => setUser({...user,password: e.target.value})}/>
        </div>
        <div>
          <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
        </div>
        <div>
          <Link to={authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}>
            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
          </Link>
        </div>
      </form>
    </div>
  )
}