import { Dialpad } from "@mui/icons-material";
import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  toggleFormAdd: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  toggleFormAdd: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const openBoxForm_toggle = (pBool: boolean) => {
    dispatch({ type: "UI - Toggle Box -- New Tag", payload: pBool });
  };
 
  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  }

  const stopDragging = () => {
    dispatch({ type: "UI - Stop Dragging" });
  }

  return (
    <UIContext.Provider
      value={{
        // sidemenuOpen: state.sidemenuOpen,
        ...state,

        //Methods to dispatch actions
        openSideMenu,
        closeSideMenu,
        
        openBoxForm_toggle,
        
        startDragging,
        stopDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
