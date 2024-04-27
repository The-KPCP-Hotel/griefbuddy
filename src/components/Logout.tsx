import React from 'react';

function Logout() {
  return (
    <form action="/logout" method="POST">
      <button type="submit"> Logout </button>
    </form>
  );
}

export default Logout;
