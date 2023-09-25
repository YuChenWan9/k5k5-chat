import "./index.scss";
import TabBar from "~/components/TabBar";
import Avatar from "~/components/Avatar";
import MenuItem, { MenuItemDataType } from "./MenuItem";
import { SetStateAction, useState } from "react";

type SideMenuPropsType = React.PropsWithChildren<object>;
interface MenuBlockPropsType {
  menuList: MenuItemDataType[];
  currentMenu: number;
  setCurrentMenu?: React.Dispatch<SetStateAction<number>>;
  className?: string;
}
const MenuBlock = ({
  menuList,
  currentMenu,
  setCurrentMenu,
  className,
}: MenuBlockPropsType) => {
  return (
    <div className={`side-menu__block ${className}`}>
      {menuList?.map((item, index) => (
        <MenuItem
          className={
            currentMenu === index
              ? "k5k5-side-menu__item active"
              : "k5k5-side-menu__item"
          }
          index={index}
          key={index}
          clickMenu={() =>
            item.actIcon && setCurrentMenu && setCurrentMenu(index)
          }
          data={item}
          currentIndex={currentMenu}
        />
      ))}
    </div>
  );
};

function SideMenu(props: SideMenuPropsType) {
  const [currentMenu, setCurrentMenu] = useState(0);

  const topMenuList: MenuItemDataType[] = [
    {
      iconType: "uc",
      icon: "&#xe613;",
      actIcon: "&#xe650;",
    },
    { iconType: "uc", icon: "&#xe601;", actIcon: "&#xe600;" },
    { iconType: "uc", icon: "&#xe62a;" },
  ];
  return (
    <div className="side-menu k5k5-side-menu__bg">
      <TabBar allowResize={false} />
      <Avatar />

      <MenuBlock
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        menuList={topMenuList}
      />

      <MenuBlock
        className="bottom_block"
        currentMenu={-1}
        menuList={[
          {
            iconType: "uc",
            icon: "&#xe620;",
          },
          { iconType: "uc", icon: "&#xe67c;" },
          { iconType: "uc", icon: "&#xe6d9;" },
          { iconType: "uc", icon: "&#xeb71;" },
        ]}
      />
    </div>
  );
}
export default SideMenu;
