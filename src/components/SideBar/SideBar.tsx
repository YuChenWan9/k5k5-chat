import TabBar from "../TabBar";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

import "./index.scss";

const SideBar = () => {
  const [globalSearchShow, setGlobalSearchShow] = useState({
    display: "none",
  });

  const searchFocus = (display: "none" | "block") => {
    setGlobalSearchShow({
      display,
    });

    if (display === "block") {
      window.onclick = () => {
        searchFocus("none");
      };
    } else {
      window.onclick = null;
    }
  };

  return (
    <div className="side-bar k5k5-side-bar__bg">
      <TabBar allowResize={false}>
        <div className="tab-bar__inner">
          <input
            onClick={(e) => e.stopPropagation()}
            onFocus={() => searchFocus("block")}
            type="text"
          />
          <button>+</button>
          <div onMouseDown={(e) => e.stopPropagation()} onMouseUp={(e) => e.stopPropagation()} className="global-search" style={globalSearchShow}>
            <div className="global-search__inner">
              <div className="icc"></div>
              <div className="global-search__inner_info">
                <div className="title">进入全局搜索</div>
                <div>查找好友、群聊、文件等</div>
              </div>
            </div>
          </div>
        </div>
      </TabBar>
      <div className="side-bar-main">
        <Link to="/home">home</Link>
      </div>
      <div className="re-size-div"></div>
    </div>
  );
};

export default SideBar;
