import { deleteObject, ref } from "firebase/storage";
import { storage } from "../_lib/firebase";

export const deleteImage = async (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Erro ao deletar imagem: ", error);
  }
};
