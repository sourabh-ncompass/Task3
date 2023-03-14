import { useContext, useState } from "react";
import { PostContext } from "../../App";
import "./AskQuestion.css";

const data = {
  id: 0,
  votes: 0,
  question: "",
  answer: "",
  isBookmarked: false,
  time: "",
};

const AskQuestion = () => {
  const [post, setPost] = useState(data);
  const { addPost } = useContext(PostContext);
  const { question } = post;

  const onChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(post);
    setPost(data);
  };

  return (
    <div className="ask-question">
      <form onSubmit={handleSubmit}>
        <label htmlFor="ask-question-content" className="ask-question-title">
          <h1>ASK</h1>
          <h1>QUESTION</h1>
        </label>
        <input
          name="question"
          value={question}
          onChange={onChange}
          id="ask-question-content"
          type="text"
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export { AskQuestion };
