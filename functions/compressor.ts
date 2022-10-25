import Compressor from "compressorjs";

type Avatar = File | Blob;

const compressor = (image: Avatar) => {
  const compressedFile = new Compressor(image, {
    quality: 0.8,
    success: (compressedResult) => {
      return compressedResult;
    },
  });

  return compressedFile;
};

export default compressor;
