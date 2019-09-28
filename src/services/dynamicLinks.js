import { firebaseDynamicLinks, firebaseLinks } from './firebase';

export async function createDynamicLink(urlParams) {
    let urlFormatedParams = '';
    Object.keys(urlParams).forEach((key, index) => {
        if (index > 0) {
            urlFormatedParams += '&';
        }
        urlFormatedParams += `${key}=${urlParams[key]}`;
    });
    console.log(urlFormatedParams);
    const link = new firebaseDynamicLinks.DynamicLink(`https://buscoamimascota.com/?${urlFormatedParams}`, 'https://buscoamimascota.page.link')
        .android.setPackageName('com.buscoamimascota.android');

    return await firebaseLinks.createShortDynamicLink(link, 'SHORT');
}