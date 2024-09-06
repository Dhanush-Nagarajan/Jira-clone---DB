import logo from '../../assets/logo.png'
import './Login.css'
import {useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate=useNavigate();

  const handleLogin=(e)=>{
      e.preventDefault();
      console.log('submitted')
  }

  const home=()=>{
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
    <div className='login'>
       <div className='login-container'>
          <div className='logo-con'>
            <img className='img' src={logo} alt="logo" onClick={home}/> <span className='name-logo' onClick={home}>Jira</span>
            <p className='font log'>Login to Continue...</p>
              <div className='ip-box font'>
                <input  className='input i' type="email" placeholder='Enter your Email-id' required/>
                <input className='input i' type="password" required placeholder='Enter Password'/>
                <button type='submit' className='input inputb'>Login</button>
              </div>
            </div>
          <div className='end'>
            <p className='font'><span>Does not Have an account ?</span> <span className='sign-up'><span onClick={()=>navigate('/signup')}>Sign up here!</span></span></p>
          </div>
       </div>
    </div>
    </form>
  )
}

export default Login