## App.js

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";

const App = () => {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(10);

useEffect(() => {
setLoading(true);
const fetchPosts = async () => {
const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
setPosts(res.data);
setLoading(false);
};

    fetchPosts();

}, []);

// Get current posts
const indexOfLastPost = currentPage \* postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

const paginate = (number) => {
setCurrentPage(number);
};

return (
<div className="container p-5">
<h1 className="text-primary mb-5">Blog</h1>
<Posts posts={currentPosts} loading={loading} />
<Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
</div>
);
};

export default App;

## Pagination.js

import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
const pageNumber = [];
for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
pageNumber.push(i);
}
return (
<div>
<ul className="pagination mt-4">
{pageNumber.map((number) => (
<li className="page-item" key={number}>
<a href="!#" onClick={() => paginate(number)} className="page-link">
{number}
</a>
</li>
))}
</ul>
</div>
);
};

export default Pagination;

## Posts.js

import React from "react";

const Posts = ({ posts, loading }) => {
{
loading && (
<div>
{" "}
<h1 className="text-primary">Loading...</h1>
</div>
);
}
return (
<div className="">
<ul className="list-group">
{posts.map((item) => (
<li className="list-group-item" key={item.id}>
{item.title}
</li>
))}
</ul>
</div>
);
};

export default Posts;
