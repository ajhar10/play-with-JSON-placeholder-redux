const store = require('./app/store');
const { fetchPosts } = require('./features/post/postSlice');
const { fetchRelatedPosts } = require('./features/post/relatedPostSlice');

// subscribe to state changes
store.subscribe(() => {
	//console.log(store.getState());
});

// disptach actions
(async function () {
	await store.dispatch(fetchPosts());
	const single_post = store.getState().post.posts;
	await store.dispatch(fetchRelatedPosts(single_post));
})();
