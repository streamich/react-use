import React from "react";
import { storiesOf } from "@storybook/react";

import { useObjectArray } from "../src";

import ShowDocs from "./util/ShowDocs";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discountAvailable: boolean;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    price: 10,
    quantity: 1,
    discountAvailable: true,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description 2",
    price: 15,
    quantity: 2,
    discountAvailable: false,
  },
  {
    id: "3",
    name: "Product 3",
    description: "Description 3",
    price: 20,
    quantity: 3,
    discountAvailable: true,
  },
];

const Demo = () => {
  const [products, setProducts, addProduct, removeProduct, updateProduct, clearProducts] =
    useObjectArray<Product>(initialProducts);

  const totalProducts = products.length;

  return (
    <div>
      <h1>Product Demo</h1>

      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <br />
            Description: {product.description}
            <br />
            Price: ${product.price}
            <br />
            Quantity: {product.quantity}
            <br />
            <button onClick={() => removeProduct(index)}>Remove</button>
            <button onClick={() => updateProduct(index, "name", "Updated Product Name")}>
              Update Name
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          addProduct({
            id: String(products.length + 1),
            name: `Product ${totalProducts + 1}`,
            description: `Description ${totalProducts + 1}`,
            price: 20,
            quantity: 3,
            discountAvailable: false,
          })
        }
      >
        Add Product
      </button>

      <button onClick={() => clearProducts()}>Clear Products</button>
      <button onClick={() => setProducts(initialProducts)}>Reset</button>
    </div>
  );
};

storiesOf("State/useObjectArray", module)
  .add("Docs", () => <ShowDocs md={require("../docs/useObjectArray.md")} />)
  .add("Demo", () => <Demo />);
