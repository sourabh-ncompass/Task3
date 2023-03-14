import { useContext } from "react";
import { PostContext } from "../../App";
import menu from "./Menu.module.css";

const Menu = () => {
  const { handleSort, handleDisplayBookmarks, bookmark } =
    useContext(PostContext);

  const onChange = (e) => handleSort(e.target.value);

  return (
    <div className={menu.main}>
      <div className={menu.sort} onChange={onChange}>
        <span>SORT</span>
        <input type="radio" id="radioVote" value="VOTE" name="sort" />
        <label htmlFor="radioVote">VOTE</label>
        <input type="radio" id="radioTime" value="TIME" name="sort" />
        <label htmlFor="radioTime">TIME</label>
      </div>
      <button className={menu.bookmark} onClick={handleDisplayBookmarks}>
        {!bookmark ? "BOOKMARKED" : "SHOWALL"}
      </button>
    </div>
  );
};

export { Menu };
