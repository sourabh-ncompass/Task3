import { useEffect, useContext, useState } from "react";
import { PostContext } from "../../App";
import content from "./Content.module.css";
import { Post } from "../Post/Post";
import { Menu } from "../Menu/Menu";
import { Question } from "../Question/Question";

const Content = () => {
  // const { postData, bookmark } = useContext(PostContext);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await fetch("http://localhost:3000/show-posts");
    const { data } = await response.json();
    setPostData(data);
  };
  console.log(postData);
  return (
    <div className={content.main}>
      <Menu />
      {postData.length > 0 ? (
        postData.map((data) => <Question key={data.ID} data={data} />)
      ) : (
        <div className={content.noData}>No data</div>
      )}
      {/* {postData.length ? (
        postData
          .filter((items) =>
            bookmark ? items.isBookmarked === bookmark : items
          )
          .map((data) => <Post key={data.id} data={data} />)
      ) : (
        <div className={content.noData}>No data</div>
      )} */}
    </div>
  );
};

export { Content };
