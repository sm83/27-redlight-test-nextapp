'use client';
import { useAppSelector, useAppDispatch } from '../../hooks';
import styles from './Search.module.css';
// import SearchAllBtn from './SearchAllBtn/SearchAllBtn';
import { SearchIcon } from './SearchIcon';

import { useEffect } from 'react';

import SearchAreaBtn from './SearchAreaBtn/SearchAreaBtn';
import {
  setListModeAll,
  setListModeSelected,
  updateSearchField,
} from '../../store/sessionSlice';
import { usePathname, useParams, useRouter } from 'next/navigation';
// import { addToSelected } from '../../store/sessionSlice';

const Search = () => {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();

  // console.log();

  useEffect(() => {
    console.log({ pathName, params, router });

    const searchParams = params?.catchAll;

    if (searchParams?.[0] === 'search' && searchParams?.[1]) {
      console.log(decodeURIComponent(searchParams?.[1] as string));
      dispatch(
        updateSearchField(decodeURIComponent(searchParams?.[1] as string))
      );
    }
  }, []);

  const dispatch = useAppDispatch();

  const handleAllSet = () => {
    dispatch(setListModeAll());
  };

  const handleSelectedSet = () => {
    dispatch(setListModeSelected());
  };

  // const [searchField, setSearchField] = useState('');

  const handleSearchInput = (e: any) => {
    // setSearchField(e.target.value);
    // router.push(`/search/${e.target.value}`, { });
    window.history.pushState({}, '', `/search/${e.target.value}`);

    dispatch(updateSearchField(e.target.value));
  };

  const mode = useAppSelector((state) => state.session.postsDisplayMode);

  const searchField = useAppSelector((state) => state.session.searchField);

  return (
    <div className={styles.searchCompArea}>
      <div className={styles.searchBar}>
        <SearchIcon />
        <input
          className={styles.searchField}
          placeholder="Search by operation or DeFi company name"
          type="text"
          value={searchField}
          onChange={(e) => handleSearchInput(e)}
        ></input>
      </div>
      <SearchAreaBtn btnText="all" active={!mode} action={handleAllSet} />
      <SearchAreaBtn
        btnText="selected"
        active={mode}
        action={handleSelectedSet}
      />

      {/* <SearchAllBtn mode={mode} /> */}
    </div>
  );
};

export default Search;
