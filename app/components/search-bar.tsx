import { sortOptions } from "~/utils/constants";
import { useNavigate, useSearchParams } from "react-router";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClear = () => {
    searchParams.delete("search");
    searchParams.delete("sort");

    navigate("/dashboard", { replace: true });
  };

  return (
    <form className="flex items-center justify-center w-full">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <select
        name="sort"
        className="border bg-white rounded-xl border-gray-300 p-2"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
      {searchParams.get("search") && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-red-300 rounded-full shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Clear Filter
        </button>
      )}
    </form>
  );
}
