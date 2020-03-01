import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import PushNotification from 'react-native-push-notification';

import { getAsyncStorageData } from './../../utils/LocalStorage';
import { updateUserInfo, lostedRef, adoptionRef } from '../../services/database';

import { ON_BOARDING_SCREEN, ON_BOARDING_VIEWED_AS, APP_STACK_NAVIGATOR, PUBLICATION_DETAILS_STACK_NAVIGATOR } from '../../utils/Constants';
import { firebaseDynamicLinksGenerator, auth, messaging } from '../../services/firebase';

const LoadingDataScreen = ({ navigation }) => {

    /**
     * Determine what screen show when the user open the app
     */
    useEffect(() => {
        async function checkOnBoarding() {
            Orientation.lockToPortrait();

            messaging.onTokenRefresh((token) => {
                updateUserInfo(auth.currentUser.uid, { token });
            });

            PushNotification.configure({
                senderID: '1021296714116',
                permissions: {
                  alert: true,
                  badge: false,
                  sound: true
                },
                popInitialNotification: true,
                requestPermissions: true,
                onNotification: async ({ title, userInteraction, message, foreground, navigateTo, publicationId, losted }) => {

                    /**
                     * When the user opens the app through a push notification the userInteractions is equal to undefined
                     * When the user is on the app and press the notification userInteraction is true, we only want to execute
                     * this block of code if the user press the notification
                     */
                    if (userInteraction === undefined || userInteraction) {
                        if (navigateTo === PUBLICATION_DETAILS_STACK_NAVIGATOR && publicationId) {
                            let publication;

                            /**
                             * All the fields received from push notifications are not casted when they
                             * becomes, so we need to cast it manually
                             */
                            losted = JSON.parse(losted);

                            if (losted) {

                                /**
                                 * We can not know if the publication is already on the redux data, so we load the data
                                 * and send it as a navigation param
                                 */
                                publication = await lostedRef.doc(publicationId).get();
                            } else {
                                publication = await adoptionRef.doc(publicationId).get();
                            }

                            navigation.navigate(navigateTo, { ...publication.data(), losted });
                        }
                    }

                    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                    // notification.finish(PushNotificationIOS.FetchResult.NoData); <- Useful when we add support to iOS
                }
            });

            /**
             * On the first time (after installation) the user must be
             * the onboarding, in any other initialization of the app
             * the user must be redirected to the MainBottomNavigator
             */
            if(await getAsyncStorageData(ON_BOARDING_VIEWED_AS) === 'true') {
                const initialLink = await firebaseDynamicLinksGenerator.getInitialLink();
                if (initialLink) {
                    console.log('Initial link:', initialLink);
                }
                navigation.navigate(APP_STACK_NAVIGATOR);
            } else {
                navigation.navigate(ON_BOARDING_SCREEN);
            }
        }
        checkOnBoarding();
    }, []);

    return (
        null
    );
}

export default LoadingDataScreen;
