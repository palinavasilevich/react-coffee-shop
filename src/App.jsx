import { ShoppingCartContextProvider } from "./store/shopping-cart-context";
import { UserProgressContextProvider } from "./store/user-progress-context";

import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { CheckoutForm } from "./components/CheckoutForm/CheckoutForm";

function App() {
  return (
    <UserProgressContextProvider>
      <ShoppingCartContextProvider>
        <Header />
        <main>
          <Products />
        </main>
        <Cart />
        <CheckoutForm />
      </ShoppingCartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
