import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const newImage = async (fileName: string, filePicture: File) => {
  if (!filePicture) {
    return 'https://firebasestorage.googleapis.com/v0/b/real-madrid-fantasy-ce626.appspot.com/o/521-bust-in-silhouette-coloring-page.png?alt=media&token=5d856bb3-e49d-47ab-9b3f-d48cbdfe0cbf';
  }
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, filePicture);

  const imgUrl = await getDownloadURL(storageRef);

  return imgUrl;
};
