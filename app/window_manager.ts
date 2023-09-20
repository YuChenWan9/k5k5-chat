import type { WindowDict } from "./types";
import type { BrowserWindow } from "electron";

// 线程池
const winDict: WindowDict = {};

const WindowDictProxy = new Proxy(winDict, {
  get(winObj: WindowDict, prop: string) {
    return winObj[prop];
  },

  set(winObj: WindowDict, prop: string, value: BrowserWindow) {
    if (winObj[prop]) {
      return false;
    } else {
      winObj[prop] = value;
      return true;
    }
  },

  has(target: WindowDict, key: string) {
    return Object.getOwnPropertyNames(target).includes(key);
  },

  ownKeys(target: WindowDict) {
    return [...Object.getOwnPropertyNames(target)];
  },

  deleteProperty(target: WindowDict, prop: string) {
    try {
      delete target[prop];
      return true;
    } catch (e) {
      return false;
    }
  },
});

// 通过ID托管窗口
function setWindowById(winInstance: BrowserWindow) {
  try {
    const id = winInstance.id.toString();
    WindowDictProxy[id] = winInstance;
  } catch (error) {
    return;
  }
}

function getWindowById(id: string): BrowserWindow {
  return WindowDictProxy[id];
}

function hideWindowById(id: string): boolean {
  try {
    getWindowById(id).hide();
    return true;
  } catch (error) {
    return false;
  }
}

function closeWindowById(id: string): boolean {
  try {
    getWindowById(id).close();
    delete WindowDictProxy[id];
    return true;
  } catch (error) {
    return false;
  }
}

function minimizeWindowById(id: string): boolean {
  try {
    getWindowById(id).minimize();
    delete WindowDictProxy[id];
    return true;
  } catch (e) {
    return false;
  }
}

function restoreWindowById(id: string): boolean {
  try {
    getWindowById(id).restore();
    delete WindowDictProxy[id];
    return true;
  } catch (error) {
    return false;
  }
}

function closeAllWindows() {
  Object.getOwnPropertyNames(WindowDictProxy).forEach((id: string) => {
    WindowDictProxy[id].close();
    delete WindowDictProxy[id];
  });
}


/**
 * 主窗口
 */
type MainWindowId = { value?: string };
const mainWindowId: MainWindowId = {};
const mainWindowIdProxy = new Proxy(mainWindowId, {
    get(obj: MainWindowId, prop: 'value') {
        return obj[prop];
    },
    set(obj: MainWindowId, prop: 'value', value) {
        obj[prop] = value;
        return true;
    }
})

export {
    setWindowById,
    getWindowById,
    hideWindowById,
    closeAllWindows,
    closeWindowById,
    restoreWindowById,
    minimizeWindowById,
    mainWindowIdProxy
}