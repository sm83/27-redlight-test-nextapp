'use client';
import { useEffect } from 'react';

import styles from './App.module.css';
import Header from '../components/Header/Header';
import Posts from '../components/Posts/Posts';
import Search from '../components/Search/Search';
import { useAppDispatch } from '../hooks';
import { fetchLocalSession, fetchUserData } from '../store/sessionSlice';

function App() {
  const dispatch = useAppDispatch();

  // localStorage.clear();

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('currentSession') != undefined) {
      useEffect(() => {
        const currentSession = localStorage.getItem('currentSession');

        if (currentSession != null) {
          dispatch(fetchLocalSession(JSON.parse(currentSession)));
          dispatch(fetchUserData(JSON.parse(currentSession).id));
        }
      }, [dispatch]);
    }
  }

  return (
    <>
      <div className={styles.App}>
        <Header />
        <Search />
        <div className={styles.contentArea}>
          <Posts />
        </div>
      </div>
    </>
  );
}

export default App;
