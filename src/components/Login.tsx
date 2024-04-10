import React = require('react');

function Login() {
  return (
    <div>
      <h1>Google Login</h1>
      <form action="/auth/google" method="GET">
        <button type="submit">GOOGLE BUTTON</button>
      </form>
    </div>
  );
}

export default Login;
