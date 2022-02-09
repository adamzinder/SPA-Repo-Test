import { useState, useEffect } from 'react';
import './App.css';
import workosLogo from './images/workos_logo_new.png';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies()
  const [profile, setProfile ] = useState()
  const [loggedIn, setloggedIn ] = useState(false)
 
  const getCreds = async () => {
    const response = await fetch('/.netlify/functions/getCreds')
    .then(response => response.json())    
    launchAuth(response.message.clientId, response.message.provider, response.message.redirect)
  }

  const launchAuth = (client_id, provider, redirect) => {
    window.location.href = `https://api.workos.com/sso/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=&provider=${provider}`
  }

  const getCode = async () => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let code = params.get('code')

    if (code) {
      const response = await fetch('/.netlify/functions/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: code
      })
      .then(response => response.json())

      const user = JSON.stringify(response.message.profile)
      const firstName = response.message.profile.first_name
      const baseUrl = response.base_url

      cookies.set('loggedIn', true, {path: '/'})
      cookies.set('profile', user, {path: '/'})
      cookies.set('firstName', firstName, {path: '/'})
      setloggedIn(true)
      window.location.href = baseUrl
    }
  }

  const logout = () => {
      setProfile(null) 
      setloggedIn(false)
      cookies.set('loggedIn', false, {path: '/'})
  }

  useEffect(() => {
    if (!loggedIn) {getCode()}
  }, []);

  return (
    <>
    {
      cookies.get('loggedIn') === 'true' ? 

        <div className="container_success">
          <div className="logged_in_nav">
              <div className="flex">
                  <p>You're logged in {cookies.get('firstName')}, welcome!</p>
              </div>
              <div>                  
                  <img src={workosLogo} alt="workos logo"></img>
              </div>
          </div>
          <div className='flex'>
              <div className="logged_in_div_left">
                  <div>
                      <h1>Your app,</h1>
                      <h2>Enterprise Ready</h2>
                  </div>
                  <div>
                      <a href="https://workos.com/" target="_blank" rel="noreferrer"><button className='button'>WorkOS</button></a>
                      <a href="https://workos.com/docs" target="_blank" rel="noreferrer"><button className='button'>Documentation</button></a>
                      <a href="https://workos.com/docs/reference" target="_blank" rel="noreferrer"><button className='button'>API Reference</button></a>
                      <a href="https://workos.com/blog" target="_blank" rel="noreferrer"><button className='button'>Blog</button></a>                      
                  </div>
              </div>
              <div className="logged_in_div_right">
                  <div className="flex_column">
                      <h2>Raw Profile Response Details</h2>
                      <div className="text_box">
                          <p>{profile ? profile : JSON.stringify(cookies.get('profile'))}</p>
                      </div>
                      <button className="button" onClick={logout}>Log Out</button>
                  </div>

              </div>
          </div>
        </div>
      :        
        <div className="container_login">
          <div className='flex_column'>
              <div className="flex heading_div">                  
                  <img src={workosLogo} alt="workos logo"></img>
                  <div className="heading_text_div">
                      <h1>WorkOS</h1>
                  </div>
              </div>              
              <h2>SPA SSO Example App</h2>
              <button className="button login_button" onClick={getCreds}>Login</button>
          </div>
        </div>
  }
    </>    
  );
}

export default App;
