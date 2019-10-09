import { firebaseDynamicLinksGenerator } from './firebase';

export async function createDynamicLink(urlParams) {
    let urlFormatedParams = '';
    Object.keys(urlParams).forEach((key, index) => {
        if (index > 0) {
            urlFormatedParams += '&';
        }
        urlFormatedParams += `${key}=${urlParams[key]}`;
    });

    return await firebaseDynamicLinksGenerator.buildShortLink({
        link: `https://buscoamimascota.com/?${urlFormatedParams}`,
        domainUriPrefix: 'https://buscoamimascota.page.link'
    }, 'SHORT');
}