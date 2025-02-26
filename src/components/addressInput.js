import { useState } from "react";

const AddressInput = ({ onAddressSubmit, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddressSubmit(address);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Enter Your Home Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="123 Main St, Springfield, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressInput;