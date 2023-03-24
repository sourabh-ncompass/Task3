import { useState } from "react";
import { Navigate } from "react-router-dom";
import question from "./Question.module.css";

const url = "3.26.116.220";

const Question = ({ data }) => {
  const [showPost, setShowPost] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleShowPost = () => setShowPost((prevState) => !prevState);
  const handleOnChange = (e) => setAnswer(e.target.value);
  const handleDelete = async () => {
    const response = await fetch(`http://${url}:3000/post/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.ID,
      }),
    });
    const { success, message } = await response.json();
    if (success) {
      alert(message);
      <Navigate to="/posts" />;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://${url}:3000/posts/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.ID,
        answer,
      }),
    });
    const { success, message } = await response.json();
    if (success) alert(message);
    setAnswer("");
  };

  return (
    <div className={question.main}>
      <form onSubmit={handleOnSubmit}>
        <div className={question.post}>
          <label onClick={handleShowPost}>{data.TITLE}</label>
          <span className={question.deleteBtn} onClick={handleDelete}>
            🗑️
          </span>
        </div>
        {showPost && (
          <input
            placeholder="write answer"
            value={answer}
            onChange={handleOnChange}
          />
        )}
      </form>
    </div>
  );
};

export { Question };
