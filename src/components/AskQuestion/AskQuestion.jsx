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

const url = "3.26.116.220";

const AskQuestion = () => {
  const [post, setPost] = useState(data);
  const { addPost } = useContext(PostContext);
  const { question } = post;

  const onChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://${url}:3000/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title: question }),
    });
    const { success, message } = await response.json();
    if (success) alert(message);
    // addPost(post);
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
