import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("http://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // step1
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  // step2
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);
  console.log("pages >>>", pages);

  const indexOfLastPost = currentPage * postsPerPage; // e.g we are on page 5. 5 * 10 = 50
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 50 - 10 = 40
  const visiblePosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function handlePrevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div>
      <h1>Pagination</h1>
      <ul>
        {visiblePosts.map((item) => (
          <li key={item.id} style={{ margin: "20px 40px" }}>
            <h2>
              {item.id}:{item.title}
            </h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 ? true : ""}
        >
          Previous
        </button>
        {pages.map((item) => (
          <span
            key={item}
            className={`pageNumber ${item === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </span>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages ? true : ""}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
