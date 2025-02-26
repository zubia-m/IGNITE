import { useState } from "react";

const RenovationOptions = ({ onOptionSelect }) => {
  const options = [
    "Kitchen",
    "Living Room",
    "Bedroom",
    "Bathroom",
    "Basement",
    "Garage",
    "Attic",
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onOptionSelect(selectedOption);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">What Do You Want to Renovate?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RenovationOptions;