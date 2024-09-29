import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholder, className }) => {
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="px-4 py-2 w-full rounded-l-full border-2 border-gray-300 focus:outline-none focus:border-primary"
      />
      <button
        onClick={onSearch}
        className="bg-primary text-white px-6 py-2 rounded-r-full hover:bg-primary-dark transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
