import { useState } from "react";
import post from "./Post.module.css";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { useContext } from "react";
import { PostContext } from "../../App";

const Post = ({ data }) => {
  const {
    handleAddToBookmark,
    handleSubmitAnswer,
    handlePostDelete,
    handleVote,
  } = useContext(PostContext);

  const [answers, setAnswers] = useState("");

  const onChange = (e) => setAnswers(e.target.value);

  const handleOnClick = (fn) => () => fn(data.id);

  const handleSubmitKey = (e) => {
    if (e.key === "Enter") handleSubmitAnswer(data.id, answers);
  };

  return (
    <div className={post.main}>
      <div className={post.vote}>
        {data.votes}
        <div className={post.voteFn}>
          <button
            onClick={handleVote.bind(this, data.id, "+")}
            className={post.voteIncrement}
          >
            +
          </button>
          <button
            onClick={handleVote.bind(this, data.id, "-")}
            className={post.voteDecrement}
          >
            -
          </button>
        </div>
      </div>

      <div className={post.qna}>
        <label htmlFor={post.reply} className={post.question}>
          {data.question}
        </label>
        <input
          id={post.reply}
          value={answers ? answers : data.answer}
          onChange={onChange}
          disabled={data.answer}
          onKeyDown={handleSubmitKey}
        />
      </div>

      <div className={post.operation}>
        {!data.isBookmarked ? (
          <TurnedInNotIcon
            className={post.bookmark}
            onClick={handleOnClick(handleAddToBookmark)}
          />
        ) : (
          <TurnedInIcon
            className={post.bookmark}
            onClick={handleOnClick(handleAddToBookmark)}
          />
        )}

        {!data.answer.length && (
          <button
            className={post.submit}
            onClick={handleOnClick(handleSubmitAnswer)}
          >
            SUBMIT
          </button>
        )}
        <button
          className={post.submit}
          onClick={handleOnClick(handlePostDelete)}
        >
          DELETE
        </button>
        <div className={post.time}>{data.time}</div>
      </div>
    </div>
  );
};

export { Post };
