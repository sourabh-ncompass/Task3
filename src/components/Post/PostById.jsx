import { Post } from "./Post";
import { useState } from "react";
import search from "./PostById.module.css";
import { useContext } from "react";
import { PostContext } from "../../App";

const PostById = () => {
  const { postData } = useContext(PostContext);
  const [input, setInput] = useState("");
  const [post, setPost] = useState([]);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/posts?title=${input}`);
    const data = await response.json();
    setPost(data);
    console.log(post);
    // setPost(postData.filter((items) => items.id === +id));
  };

  return (
    <div className={search.main}>
      <form onSubmit={handleSubmit}>
        <input
          className={search.input}
          value={input}
          onChange={handleOnChange}
        />
        {post.length ? (
          post.map((data) => <h1>{data.TITLE}</h1>)
        ) : (
          // post.map((data) => <Post key={data.length} data={data} />)
          <div>no data</div>
        )}
      </form>
    </div>
  );
};

export { PostById };
