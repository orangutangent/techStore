import { ProductElement } from "../components/ProductElement";
import products from "../products.json";
import { Search } from "../components/Search";
import { useState } from "react";
import Sort from "../components/Sort";
import { sortBy } from "../components/Sort";

export function Home() {
  const [sort, setSort] = useState({ name: "Title↑", type: sortBy.titleASC });
  const [search, setSearch] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  products.sort((a, b) => {
    if (sort.type === sortBy.titleASC) {
      return a.title.localeCompare(b.title);
    }
    if (sort.type === sortBy.titleDESC) {
      return b.title.localeCompare(a.title);
    }
    if (sort.type === sortBy.priceASC) {
      return a.price - b.price;
    }
    if (sort.type === sortBy.priceDESC) {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const filteredProducts = search
    ? products.filter((product) => {
        return (
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      })
    : products;

  return (
    <>
      <Search handleSearch={handleSearch} />
      <Sort sort={sort} setSort={setSort} />
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="flex justify-center" key={product.id}>
              <ProductElement product={product} />
            </div>
          ))
        ) : (
          <div className="text-center text-2xl">
            <h1>No products found</h1>
          </div>
        )}
      </div>
    </>
  );
}
