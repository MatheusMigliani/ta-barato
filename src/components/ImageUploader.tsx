import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          localStorage.setItem('profileImageUrl', imageUrl); // Armazena a URL da imagem no armazenamento local
          onImageSelected(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <input type="file" accept="image/*" onChange={handleImageChange} />
    );
  };

export default ImageUploader;
