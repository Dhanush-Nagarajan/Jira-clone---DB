import logo from '../../assets/logo.png'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {

  const handleLogin=(e)=>{
      e.preventDefault();
      console.log('submitted')
  }
  return (
    <form onSubmit={handleLogin}>
    <div className='login'>
       <div className='login-container'>
          <div className='logo-con'>
            <img className='img' src={logo} alt="logo"/> <span className='name-logo'>Jira</span>
            <p className='font'>Login to to continue</p>
              <div className='ip-box font'>
                <input  className='input i' type="email" placeholder='Enter your Email-id' required/> <br />
                <input className='input i' type="password" required placeholder='Enter Password'/> <br />
                <button type='submit' className='input inputb'>Login</button>
              </div>
            </div>
          <div className='end'>
            <p className='font'><span>Does not Have an account ?</span> <span className='sign-up'><Link to='/signup'>Sign up here!</Link></span></p>
          </div>
       </div>
    </div>
    </form>
  )
}

export default Login