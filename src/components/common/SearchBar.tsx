import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (params: Record<string, string>) => void;
  fields: { name: string; placeholder: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, fields }) => {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((f) => (initial[f.name] = ""));
    return initial;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-300 text-white py-2 px-4 flex flex-wrap gap-4 items-center justify-start"
    >
      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          type="text"
          placeholder={field.placeholder}
          value={values[field.name]}
          onChange={handleChange}
          className="px-3 py-1 rounded text-black w-48 border bg-white"
        />
      ))}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
