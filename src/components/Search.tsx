export function Search({
  handleSearch,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="text-center">
      <input
        className="bg-slate-800 text-white p-2 rounded-lg md:w-1/2 w-3/4 mx-3 my-4 outline-none searchBar"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
}
