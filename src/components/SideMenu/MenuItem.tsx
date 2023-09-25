export interface MenuItemDataType {
  iconType: "img" | "uc";
  icon: string;
  actIcon?: string;
}
type MenuItemPropsType = React.PropsWithChildren<{
  data: MenuItemDataType;
  currentIndex?: number;
  index?: number;
  clickMenu?: () => void;
  className?: string;
}>;

function UCView({
  icon,
  actIcon,
  isActive,
}: {
  icon: string;
  actIcon?: string;
  isActive: boolean;
}) {
  return (
    <>
      {actIcon && isActive ? (
        <span
          className="iconfont active"
          dangerouslySetInnerHTML={{ __html: actIcon }}
        ></span>
      ) : (
        <span
          className="iconfont"
          dangerouslySetInnerHTML={{ __html: icon }}
        ></span>
      )}
    </>
  );
}

function MenuItem(props: MenuItemPropsType) {
  const { children, data, currentIndex, index, className, clickMenu } = props;
  const View = () => {
    return data.iconType === "uc" ? (
      <UCView
        icon={data.icon}
        actIcon={data.actIcon}
        isActive={currentIndex === index}
      />
    ) : (
      <></>
    );
  };
  return (
    <div className={className} onClick={clickMenu}>
      {children ? children : <View />}
    </div>
  );
}

export default MenuItem;
