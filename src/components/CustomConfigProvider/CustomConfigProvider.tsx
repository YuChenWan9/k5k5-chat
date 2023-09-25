import { useEffect } from "react";

interface ThemeType {
  [t: string]: string;
}
export type CustomConfigProviderPropsType = React.PropsWithChildren<{
  theme?: ThemeType;
}>;

function CustomConfigProvider({
  children,
  theme,
}: CustomConfigProviderPropsType) {
  useEffect(() => {
    for (const item in theme) {
      const _name = `--data-${item}`;

      document
        .querySelector<HTMLElement>(":root")
        ?.style.setProperty(_name, theme[item]);
    }
  });
  return <>{children}</>;
}

export default CustomConfigProvider;
