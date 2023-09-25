import { Suspense, useEffect } from "react";
import K5K5SysRoutes from "./components/K5K5SysRoutes";

function App() {
  useEffect(() => {
    window.document.documentElement.setAttribute("data-skin", "dart-theme");
  });
  return (
    <Suspense>
      <K5K5SysRoutes />
    </Suspense>
  );
}

export default App;
