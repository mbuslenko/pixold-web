import React, { useState } from 'react';
import './LoginPage.scss';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import axios from 'axios';

{
  /* <Route exact path="/auth">
  {loggedIn ? <Redirect to="/play" /> : <HomePage />}
</Route>; */
}

const clientId = '574224742867-trmdu15b20r5ejv3i42eek47l2m9q8dv.apps.googleusercontent.com';

const LoginPage: React.FC = () => {
  const [redirectToPlay, setRedirectToPlay] = useState<boolean>(false);

  const handleLoginSuccess = async (responseGoogleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(responseGoogleData);

    if (!('tokenId' in responseGoogleData)) {
      return;
    }

    axios
      .post('https://pixold.azurewebsites.net/google', {
        accessToken: responseGoogleData.accessToken,
        googleId: responseGoogleData.googleId,
      })
      .then((res) => console.log(res))
      .catch((er) => console.error(er));

    setRedirectToPlay(true);
    // const res = await fetch('/api/v1/auth/google', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     token: responseGoogleData.tokenId,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const data = await res.json();
    // store returned user somehow
  };

  const handleLoginFailure = () => {
    console.log('Fail to login');
  };

  return (
    <div className="login-wrap">
      <div className="login-content">
        <div className="logo"></div>
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the game</div>
        <div className="login-btn-wrap">
          <button className="login-btn login-apple-btn">Continue with Apple</button>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <button
                className="login-btn login-google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Continue with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
          {/* <button className="login-btn login-google-btn">Continue with Google</button> */}
        </div>
      </div>
      {/* {redirectToPlay && <Redirect to="/play" />} */}
    </div>
  );
};

export default LoginPage;
