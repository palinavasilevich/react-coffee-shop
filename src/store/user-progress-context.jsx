import { createContext, useState } from "react";
import { USER_PROGRESS_STATE } from "../constants";

const UserProgressContext = createContext({
  progress: USER_PROGRESS_STATE.INITIAL, // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState(USER_PROGRESS_STATE.INITIAL);

  function showCart() {
    setUserProgress(USER_PROGRESS_STATE.CART);
  }

  function hideCart() {
    setUserProgress(USER_PROGRESS_STATE.INITIAL);
  }

  function showCheckout() {
    setUserProgress(USER_PROGRESS_STATE.CHECKOUT);
  }

  function hideCheckout() {
    setUserProgress(USER_PROGRESS_STATE.INITIAL);
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
