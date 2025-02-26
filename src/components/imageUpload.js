import { useState } from "react";

const ImageUpload = ({ onImagesSubmit }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onImagesSubmit(images);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upload Pictures</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;