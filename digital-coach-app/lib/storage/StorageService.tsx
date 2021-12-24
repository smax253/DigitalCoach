import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uuid } from "uuidv4";
import FireBaseService from "../firebase/FirebaseService";

export enum StorageFolders {
  profilePic = "profilePic",
}

class StorageService extends FireBaseService {
  storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.app);
  }

  async add(file: File, folder: StorageFolders, filename: string = uuid()) {
    const fileRef = ref(this.storage, `${folder}/${filename}`);

    await uploadBytes(fileRef, file, { contentType: file.type });

    return await getDownloadURL(fileRef);
  }
}

export default new StorageService();
