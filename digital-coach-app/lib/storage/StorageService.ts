import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uuid } from "uuidv4";
import FireBaseService from "@App/lib/firebase/FirebaseService";

export enum EStorageFolders {
  profilePic = "profilePic",
}

class StorageService extends FireBaseService {
  private storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.app);
  }

  async upload(file: File, folder: EStorageFolders, filename: string = uuid()) {
    const fileRef = ref(this.storage, `${folder}/${filename}`);

    await uploadBytes(fileRef, file, { contentType: file.type });

    return getDownloadURL(fileRef);
  }
}

export default new StorageService();
