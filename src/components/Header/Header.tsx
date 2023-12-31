import { useState } from 'react';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { findUser, logOut, usersDb } from '../../store/sessionSlice';
import axios from 'axios';
import LoginBtn from './LoginBtn/LoginBtn';

const Header = () => {
  const dispatch = useAppDispatch();

  const [loginName, setLoginName] = useState<string>('');

  const handleInputLogin = (e: any) => {
    setLoginName(e.target.value.toUpperCase());
  };

  const logIn = (event: any) => {
    event.preventDefault();

    dispatch(findUser(loginName));
    // dispatch(createUser(loginName));
  };

  const handleLogOut = (event: any) => {
    event.preventDefault();

    dispatch(logOut());

    setLoginName('');
  };

  const currentUsername = useAppSelector((state) => state.session.username);

  if (!useAppSelector((state) => state.session.logined)) {
    return (
      <div className={styles.headerArea}>
        <form className={styles.loginAreaForm} onSubmit={logIn}>
          <label>
            <input
              className={styles.loginAreaInput}
              placeholder="PASTE YOUR FULLNAME"
              type="text"
              value={loginName}
              onChange={(e) => handleInputLogin(e)}
            ></input>
          </label>

          {/* <button className={styles.enterLoginBtn} type="submit">
            LOG IN
          </button> */}
          <LoginBtn loginName={loginName} type="submit" text="LOG IN" />
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.headerArea}>
        <div className={styles.loginAreaForm}>
          <div className={styles.loginAreaInput}>{currentUsername}</div>

          <button className={styles.enterLoginBtn} onClick={handleLogOut}>
            LOG OUT
          </button>
        </div>
      </div>
    );
  }
};

export default Header;
