import { Post } from "./Post";
import { useState } from "react";
import search from "./PostById.module.css";
import { useContext } from "react";
import { PostContext } from "../../App";

const PostById = () => {
  const { postData } = useContext(PostContext);
  const [id, setId] = useState("");
  const [post, setPost] = useState([]);

  const handleOnChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPost(postData.filter((items) => items.id === +id));
  };

  return (
    <div className={search.main}>
      <form onSubmit={handleSubmit}>
        <input className={search.input} value={id} onChange={handleOnChange} />
        {post.length ? (
          post.map((data) => <Post key={data.id} data={data} />)
        ) : (
          <div>no data</div>
        )}
      </form>
    </div>
  );
};

export { PostById };
