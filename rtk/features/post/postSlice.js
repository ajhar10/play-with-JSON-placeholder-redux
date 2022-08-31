const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
	loading: false,
	posts: [],
	error: '',
};

// create thunk function
const fetchPosts = createAsyncThunk('singlePost/fetchPosts', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
	const posts = await response.json();
	return posts;
});

// create slice
const postSlice = createSlice({
	name: 'singlePost',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state, action) => {
			state.loading = true;
			state.error = '';
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.posts = action.payload;
		});
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.posts = [];
		});
	},
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;
