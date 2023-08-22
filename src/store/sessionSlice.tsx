import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

type User = {
  id: number | null;
  username: string;
  selected: null | string[];
};

type SessionInfo = {
  id: number | null;
  username: string | null;
  selected: null | string[];
  logined: boolean;

  postsDisplayMode: boolean;

  searchField: string;
  currentList: number;

  loading: boolean;
  nameError: string | null | undefined;
};

type LocalStorageSession = {
  id: null | number;
  username: string | null;
  selected: string[] | null;
  logined: boolean;
  postsDisplayMode: boolean; //false = all, true = selected
};

const initialState: SessionInfo = {
  id: null,
  username: null,
  selected: null,
  logined: false,

  postsDisplayMode: false,

  searchField: '',
  currentList: 1,

  loading: false,
  nameError: null,
};

const usersDb = 'http://localhost:3001/users';

export const findUser = createAsyncThunk<User, string, { rejectValue: string }>(
  'session/findUser',
  async (searchUsername, { rejectWithValue }) => {
    try {
      const response = await axios.get(usersDb, {
        params: { username: searchUsername },
      });

      if (response.statusText != 'OK' || response.data[0] == undefined) {
        throw new Error();
      }

      // console.log(response.data[0]);

      return response.data[0];
    } catch (error) {
      return rejectWithValue("Can't find such user or server error.");
    }
  }
);

export const fetchUserData = createAsyncThunk<
  string[],
  number,
  { rejectValue: string }
>('session/fetchUserData', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${usersDb}/${userId}`);

    if (response.statusText != 'OK') {
      throw new Error();
    }

    // console.log(response.data.selected);

    return response.data.selected;
  } catch (error) {
    return rejectWithValue("Can't fetch user data.");
  }
});

type AddPostToSelected = {
  userId: number;
  postId: string;
  alreadySelected: null | string[];
};

export const addToSelected = createAsyncThunk<
  User,
  AddPostToSelected,
  { rejectValue: string }
>(
  'session/addToSelected',
  async ({ userId, postId, alreadySelected }, { rejectWithValue }) => {
    // console.log('postId: ' + postId);

    try {
      // console.log(postId);
      // console.log(alreadySelected);

      const response = await axios.patch(`${usersDb}/${userId}`, {
        selected: alreadySelected?.concat(postId),
      });

      // console.log(response.data);
      return response.data;
      // console.log(response);
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

type RemovePostFromSelected = {
  userId: number | null;
  postId: string;
  alreadySelected: string[];
};

export const removeFromSelected = createAsyncThunk<
  User,
  RemovePostFromSelected,
  { rejectValue: string }
>(
  'session/removeFromSelected',
  async ({ userId, postId, alreadySelected }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${usersDb}/${userId}`, {
        selected: alreadySelected.filter((id) => id != postId),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logOut(state) {
      state.id = null;
      state.logined = false;
      state.username = null;
      state.selected = [];
      state.postsDisplayMode = false;

      state.loading = false;
      state.nameError = null;

      localStorage.removeItem('currentSession');
    },
    fetchLocalSession(state, action: PayloadAction<LocalStorageSession>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      // state.selected = action.payload.selected;
      state.logined = action.payload.logined;
    },
    setListModeAll(state) {
      state.postsDisplayMode = false;
    },
    setListModeSelected(state) {
      state.postsDisplayMode = true;
    },
    updateSearchField(state, action: PayloadAction<string>) {
      state.searchField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findUser.pending, (state) => {
        state.loading = true;
        state.nameError = null;
      })
      .addCase(findUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.selected = action.payload.selected;
        state.logined = true;

        state.loading = false;

        // console.log(localStorage);
        localStorage.setItem(
          'currentSession',
          JSON.stringify({
            id: action.payload.id,
            username: action.payload.username,

            logined: true,
          })
        );
        // console.log(localStorage);
      })
      .addCase(findUser.rejected, (state, action) => {
        state.loading = false;
        state.logined = false;
        state.nameError = action.payload;

        console.log(action.payload);
      })
      .addCase(addToSelected.fulfilled, (state, action) => {
        state.selected = action.payload.selected;

        localStorage.setItem(
          'currentSelected',
          JSON.stringify({
            selected: action.payload.selected,
          })
        );
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(removeFromSelected.fulfilled, (state, action) => {
        state.selected = action.payload.selected;

        localStorage.setItem(
          'currentSelected',
          JSON.stringify({
            selected: action.payload.selected,
          })
        );
      });
  },
});

export default sessionSlice.reducer;

export const {
  logOut,
  fetchLocalSession,
  setListModeAll,
  setListModeSelected,
  updateSearchField,
} = sessionSlice.actions;
