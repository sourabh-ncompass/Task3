import { useState } from "react";
import search from "./SearchPost.module.css";

const url = "3.26.116.220";

const SearchPost = () => {
  const [question, setQuestion] = useState("");
  const [post, setPost] = useState([]);

  const handleOnChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://${url}:3000/posts/answers?title=${question}`
    );
    const data = await response.json();
    setPost(data.data);
  };
  return (
    <div className={search.main}>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor={search.input}>Search Question</label>
        <input
          type="text"
          id={search.input}
          value={question}
          onChange={handleOnChange}
          placeholder="write question"
        />
      </form>
      <div className={search.post}>
        {post.length ? (
          post.map((data, idx) => (
            <div key={idx} className={search.item}>
              <h3>{question}</h3>
              <h4>{data.ANSWER}</h4>
            </div>
          ))
        ) : (
          <h1 className={search.nodata}>no data</h1>
        )}
      </div>
    </div>
  );
};

export { SearchPost };
