import logo from './logo.svg';
import './App.css';
import styles from './App.module.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button, Modal, Form, Input, Select, Table, List } from 'antd';
import { Home } from './Home';
import { useEffect } from "react";
import { Employees } from './Employees';
import { bindActionCreators } from "redux";
import { Sales } from './Sales';
import { Pharm } from './Pharm';
import {Registration} from './Registration';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import { logout, setLoggedIn } from "./redux/actions/authActions";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './Login';
const { Header } = Layout;

function App({ isLoggedIn,  setLoggedIn,logout }) {
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedIsLoggedIn === "true") {
      setLoggedIn(true);
    } else {
      logout();
    }
  }, [logout, setLoggedIn]);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
  };
  let button1;
  let button2;
  let button3;
  let button4;

  if (isLoggedIn) {
    button1 = <button onClick={handleLogout}>Logout</button>;
    button2 = null;
    button3 =  <Link className={styles.AppLink} to="/employees"> Employees </Link>;
    button4 = <Link className={styles.AppLink} to="/pharm"> Pharmaceuticals </Link>;
  } else {
    button1 = <Link className={styles.AppLink} to="/registration">Register</Link>;
    button2 = <Link className={styles.AppLink} to="/login">Login</Link>;
    button3 = null;
    button4 = null;
  }
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className={styles.App}>
      <h3>ANB Farms</h3>
      <h3>
        {button1}
        {button2}
      </h3>
    <Header>
            <Link className={styles.AppLink} to="/">
              Home
            </Link>
            {button3}
            {button4}
      </Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/pharm" element={<Pharm />} />
      <Route path="/registration" element={<Registration/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout, setLoggedIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

