import { ProductCard } from "./ProductCard";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import { Loader } from "../UI/Loader";

import useHttp from "../../hooks/useHttp";

import { API_URL } from "../../constants";

import cls from "./Products.module.css";

const requestConfig = {};

export const Products = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useHttp(`${API_URL}/products`, requestConfig, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent title="Failed to fetch products." message={error} />;
  }

  return (
    <section className={cls.section}>
      <div className={cls.products}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
