import { useState } from "react";

const names = [
  "Shiva Teja",
  "Rohit Sharma",
  "Virat Kohli",
  "Sachin Tendulkar",
  "Suresh Raina",
  "MS Dhoni",
  "Ravindra Jadeja",
  "Germany",
  "Australia",
  "India",
  "England",
  "South Africa",
  "New Zealand",
  "Pakistan",
  "Sri Lanka",
];

const SearchList = () => {
  const [query, setQuery] = useState("");

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} className="text-blue-600">
              {part}
            </b>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Live Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search names..."
        className="w-full border p-2 rounded"
      />
      <p className="text-sm text-slate-600">Results: {filteredNames.length}</p>

      {filteredNames.length === 0 ? (
        <p className="text-red-500">No matches found</p>
      ) : (
        <ul className="space-y-2">
          {filteredNames.map((name, index) => (
            <li key={index} className="border p-2 rounded">
              {getHighlightedText(name, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchList;
