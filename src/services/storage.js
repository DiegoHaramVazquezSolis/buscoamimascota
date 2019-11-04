import { storage } from './firebase';

export const lostedStorageRef = storage.ref('/Lost');
export const adoptionStorageRef = storage.ref('/Adoption');

export async function uploadPetImage(losted, publicationId, image) {
    if (losted) {
        await lostedStorageRef.child(publicationId).putString(image, 'base64');
        return await lostedStorageRef.child(publicationId).getDownloadURL();
    } else {
        await adoptionStorageRef.child(publicationId).putString(image, 'base64');
        return await adoptionStorageRef.child(publicationId).getDownloadURL();
    }
}