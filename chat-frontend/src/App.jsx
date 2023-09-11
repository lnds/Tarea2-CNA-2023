import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// components
import Login from "./components/Login";
import Logout from "./components/Logout";
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Fragment>
        <Login setToken={setToken} />
      </Fragment>
    )
  }
  return (
    <Fragment >
      <div className="container">
        <Logout />
      </div>
    </Fragment >
  );
}

export default App
