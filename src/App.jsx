import { useEffect } from "react";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import app from "./App.module.css";
import { Content, Navbar, PostById, AskQuestion } from "./components";

const PostContext = createContext({
  postData: [],
  setPostData: () => {},
  handleAddToBookmark: () => {},
  handleVote: () => {},
  handleSubmitAnswer: () => {},
  handleSort: () => {},
  handleDisplayBookmarks: () => {},
  bookmark: false,
  addPost: () => {},
  handlePostDelete: () => {},
});

const App = () => {
  const [bookmark, setBookmark] = useState(false);
  const [postId, setPostId] = useState(0);
  const [postData, setPostData] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    setPostData((prevState) => sortPosts(prevState, sort));
  }, [sort]);

  const addPost = (post) => {
    setPostId((prevState) => prevState + 1);
    setPostData((prevState) => [
      ...prevState,
      {
        ...post,
        id: postId,
        time: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      },
    ]);
  };

  const sortPosts = (posts, sort) => {
    if (sort === "VOTE") {
      return [...posts].sort((a, b) => b.votes - a.votes);
    } else if (sort === "TIME") {
      return [...posts].sort((a, b) => b.time.localeCompare(a.time));
    }
    return posts;
  };

  const handleSort = (sort) => {
    setSort(sort);
  };

  const handleDisplayBookmarks = () => {
    setBookmark((prevState) => !prevState);
  };

  const handleVote = (id, type) => {
    if (type === "+") {
      setPostData((prevState) =>
        prevState.map((items) => {
          if (items.id === id) {
            return { ...items, votes: items.votes + 1 };
          }
          return items;
        })
      );
    } else {
      setPostData((prevState) =>
        prevState.map((items) => {
          if (items.id === id) {
            if (items.votes > 0) return { ...items, votes: items.votes - 1 };
          }
          return items;
        })
      );
    }
  };

  const handleSubmitAnswer = (id, answer) => {
    setPostData((prevState) =>
      prevState.map((items) => {
        if (items.id === id) {
          return { ...items, answer };
        }
        return items;
      })
    );
  };

  const handleAddToBookmark = (id) => {
    setPostData((prevState) =>
      prevState.map((items) => {
        if (items.id === id) {
          return { ...items, isBookmarked: !items.isBookmarked };
        }
        return items;
      })
    );
  };

  const handlePostDelete = (id) => {
    setPostData((prevState) => prevState.filter((items) => items.id !== id));
  };

  const postContextData = {
    postData,
    setPostData,
    handleAddToBookmark,
    handleSubmitAnswer,
    handleSort,
    handleDisplayBookmarks,
    bookmark,
    addPost,
    handlePostDelete,
    handleVote,
  };

  return (
    <PostContext.Provider value={postContextData}>
      <div className={app.main}>
        <Navbar />
        <Routes>
          <Route path="/" element={<AskQuestion />} />
          <Route path="/posts" element={<Content />} />
          <Route path="/find-post" element={<PostById />} />
        </Routes>
      </div>
    </PostContext.Provider>
  );
};

export { App, PostContext };
