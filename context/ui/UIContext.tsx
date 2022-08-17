import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  toggleFormAdd: boolean;
  isDragging: boolean;

  //Methods to dispatch actions
  openSideMenu: () => void;
  closeSideMenu: () => void;
  openBoxForm_toggle: (pBool: boolean) => void;
  startDragging: () => void;
  stopDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
