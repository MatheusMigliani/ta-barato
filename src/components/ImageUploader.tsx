import React, { useRef, useState } from "react";
import { IonButton } from "@ionic/react";

interface ImageUploaderProps {
  onImageSelected: (url: string) => void;
  showChangeButton?: boolean; // tornando opcional
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, showChangeButton }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        localStorage.setItem('profileImageUrl', imageUrl); // Armazena a URL da imagem no armazenamento local
        setImageUrl(imageUrl);
        onImageSelected(imageUrl);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImage = () => {
    localStorage.removeItem('profileImageUrl');
    setImageUrl(null);
  };

  const handleCancelImageSelection = () => {
    setImageUrl(null);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {imageUrl ? (
        <>
          
          <IonButton onClick={handleRemoveImage}>Remover Foto</IonButton>
        </>
      ) : (
        <>
          <IonButton onClick={handleButtonClick}>
            {showChangeButton ? "Trocar Foto" : "Escolher Foto"}
          </IonButton>
          {showChangeButton && <IonButton onClick={handleCancelImageSelection}>Cancelar</IonButton>}
        </>
      )}
    </>
  );
};

export default ImageUploader;
