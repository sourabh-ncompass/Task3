import { useContext } from "react";
import { PostContext } from "../../App";
import content from "./Content.module.css";
import { Post } from "../Post/Post";
import { Menu } from "../Menu/Menu";

const Content = () => {
  const { postData, bookmark } = useContext(PostContext);

  return (
    <div className={content.main}>
      <Menu />
      {postData.length ? (
        postData
          .filter((items) =>
            bookmark ? items.isBookmarked === bookmark : items
          )
          .map((data) => <Post key={data.id} data={data} />)
      ) : (
        <div className={content.noData}>No data</div>
      )}
    </div>
  );
};

export { Content };
