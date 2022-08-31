const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// create thunk function
const fetchRelatedPosts = createAsyncThunk(
  "relatedPost/fetchRelatedPosts",
  async (single_post) => {
    const query_string = single_post.title
      .split(" ")
      .reduce((titleWord1, titleWord2) => {
        return `${titleWord1}&title_like=${titleWord2}`;
      });
    const fetch_url =
      "https://jsonplaceholder.typicode.com/posts?title_like=" + query_string;
    const response = await fetch(fetch_url);
    const related_posts = await response.json();
    return related_posts;
  }
);

// create slice
const relatedPostSlice = createSlice({
  name: "relatedPost",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    });
    builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = [];
    });
  },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
