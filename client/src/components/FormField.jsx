import React from 'react';

function FormField({
  label,
  type,
  placeholder,
  value,
  name,
  handleChange,
  isSurprise = false,
  handleSurprise,
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {isSurprise && (
          <button
            type="button"
            className="text-[#868e96] text-sm font-medium border border-gray-900 rounded px-4 py-2 hover:scale-105 transition-all duration-300"
            onClick={handleSurprise}
          >
            Surprise me
          </button>
        )}
      </div>
      <div className="mt-3">
        <input
          type={type}
          name={name}
          id={name}
          className="shadow-sm outline-none px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default FormField;
