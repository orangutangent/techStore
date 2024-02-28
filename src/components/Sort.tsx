import React from "react";
export enum sortBy {
  titleASC = "title",
  titleDESC = "-title",
  priceASC = "price",
  priceDESC = "-price",
}

const listSort = [
  { name: "Title↑", type: sortBy.titleASC },
  { name: "Title↓", type: sortBy.titleDESC },
  { name: "Price↑", type: sortBy.priceASC },
  { name: "Price↓", type: sortBy.priceDESC },
];

type SortPropType = {
  sort: { name: string; type: sortBy };
  setSort: React.Dispatch<React.SetStateAction<{ name: string; type: sortBy }>>;
};

const Sort: React.FC<SortPropType> = ({ sort, setSort }) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  return (
    <div className="text-xl w-full mt-5 md:mt-0">
      <select
        defaultValue={sortBy.titleASC}
        ref={selectRef}
        value={sort.type}
        onChange={() => {
          setSort(
            listSort.find((item) => item.type === selectRef.current?.value) || {
              name: "Title↑",
              type: sortBy.titleASC,
            }
          );
        }}
        className="bg-slate-800 text-white p-2 rounded-lg  mx-3 my-4 outline-none w-1/2 sortElement"
      >
        <option value={sortBy.titleASC}>Title↑</option>
        <option value={sortBy.titleDESC}>Title↓</option>
        <option value={sortBy.priceASC}>Price↑</option>
        <option value={sortBy.priceDESC}>Price↓</option>
      </select>
    </div>
  );
};
export default Sort;
