import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

import axios from 'axios';

export type PostType = {
  id: string;
  adress: string;
  title: string;
  description: string;
  blocksCount: number;
};

type PostList = {
  list: PostType[];

  loading: boolean;
  postError: string | null;
};

const initialState: PostList = {
  list: [],
  loading: false,
  postError: null,
};

const postsJsonServer = 'http://localhost:3000/posts';

type fetchPostPayload = {
  currentList: number;
  searchField: string;
};

export const fetchPost = createAsyncThunk<
  PostType[],
  fetchPostPayload,
  { rejectValue: string }
>(
  'posts/fetchPost',
  async ({ currentList, searchField }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${postsJsonServer}?_page=${currentList}&_limit=50&title_like=${searchField}`
        /*{
        params: {
          filter: ,
        },
      }*/
      );

      console.log(response);

      if (response.statusText != 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.postError = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log(action.payload);
        state.postError = action.payload;
        state.loading = false;
      });
  },
});

export default postSlice.reducer;

function isError(action: AnyAction) {
  const matcherEndsWith = 'Post/rejected';

  if (action.type.endsWith(matcherEndsWith)) {
    console.log(action.type.endsWith(matcherEndsWith));
  }
  return action.type.endsWith(matcherEndsWith);
}
