import { ProductCard } from "./ProductCard";
import { Loader } from "../UI/Loader";
import useHttp from "../../hooks/useHttp";
import { API_URL } from "../../constants";

import cls from "./Products.module.css";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";

const requestConfig = {};

export const Products = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useHttp(`${API_URL}/productss`, requestConfig, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent title="Failed to fetch products." message={error} />;
  }

  return (
    <>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Notification text="The item has been added to your shopping cart.">
          <Button onClick={addItemToCart}>Go to Shopping cart</Button>
        </Notification>
      </Modal> */}
      <section className={cls.section}>
        <div className="container">
          <div className={cls.products}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
