import React, { useEffect, useReducer } from 'react';
import { PermissionsAndroid, Alert, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

import { PUBLICATIONS_STACK_NAVIGATOR, AUTHENTICATION_STACK_NAVIGATOR } from '../../utils/Constants';
import { ANONYMOUS_PROVIDER, PASSWORD_PROVIDER } from '../../services/firebase';

import { updateUserInfo } from '../../services/database';
import { closeSession } from '../../services/auth';
import { translate } from '../../services/i18n';

import Card from '../../components/simple/Card/Card';
import ScreenTitle from '../../components/simple/ScreenTitle/ScreenTitle';
import ChangePasswordDialog from '../../components/complex/ChangePasswordDialog/ChangePasswordDialog';
import SettingSection from '../../components/complex/SettingSection/SettingSection';
import Setting from '../../components/complex/Setting/Setting';

const UserSettingsScreen = ({ isLoggedUser = false, userAuthProvider='', uid='', lostedPetsNotifications, adoptionPetsNotifications, navigation }) => {
    const initialState = {
        shareLocation: false,
        lostedPetsNotifications,
        adoptionPetsNotifications,
        showChangePasswordDialog: false
    };

    useEffect(() => {
        async function checkLocationPermissions() {
            setState({ shareLocation: await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) });
        }

        validateUserIsLogged();
        checkLocationPermissions();
    }, []);

    const reducer = (prevState, state) => {
        return {...prevState, ...state};
    }

    const [ state, setState ] = useReducer(reducer, initialState);

    const askForLocationPermission = async () => {
        if (!state.shareLocation) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setState({ shareLocation: true });
            }
        } else {
            Alert.alert(
                translate('UserSettingsScreen.errorMessage.title'),
                translate('UserSettingsScreen.errorMessage.description'),
                [{ text: translate('UserSettingsScreen.errorMessage.acceptButton') }],
                { cancelable: true }
            )
        }
    }

    const updateLostedNotificationsSetting = (lostedPetsNotifications) => {
        updateUserInfo(uid, { lostedPetsNotifications });
        setState({ lostedPetsNotifications });
    }

    const updateAdoptionNotificationsSetting = (adoptionPetsNotifications) => {
        updateUserInfo(uid, { adoptionPetsNotifications });
        setState({ adoptionPetsNotifications });
    }

    const signOut = async () => {
        try {
            await closeSession();
            navigation.navigate(PUBLICATIONS_STACK_NAVIGATOR);
        } catch (error) {
            console.error(error);
        }
    }

    const validateUserIsLogged = () => {
        if(!isLoggedUser) {
            navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.flex1]}>
            <NavigationEvents onDidFocus={validateUserIsLogged} />
            <ChangePasswordDialog
                visible={state.showChangePasswordDialog}
                onClose={() => setState({ showChangePasswordDialog: false })} />
            <ScrollView contentContainerStyle={[styles.container, GlobalStyles.alignItemsCenter]}>
                <ScreenTitle>
                    {translate('UserSettingsScreen.title')}
                </ScreenTitle>
                <Card style={styles.card}>
                    <View style={GlobalStyles.col}>
                        <SettingSection title={translate('UserSettingsScreen.notificationsSection.title')} firstChild>
                            <Setting
                                value={state.lostedPetsNotifications}
                                onValueChange={updateLostedNotificationsSetting}>
                                {translate('UserSettingsScreen.notificationsSection.lostedPetsNotifications')}
                            </Setting>
                            <Setting
                                value={state.adoptionPetsNotifications}
                                onValueChange={updateAdoptionNotificationsSetting}>
                                {translate('UserSettingsScreen.notificationsSection.adoptionPetsNotifications')}
                            </Setting>
                        </SettingSection>

                        <SettingSection
                            title={translate('UserSettingsScreen.locationSection.title')}
                            style={{ marginBottom: (!isLoggedUser || userAuthProvider === ANONYMOUS_PROVIDER) ? 16 : 0 }}>
                            <Setting
                                value={state.shareLocation}
                                onValueChange={askForLocationPermission}>
                                {translate('UserSettingsScreen.locationSection.shareMyLocation')}
                            </Setting>
                        </SettingSection>

                        {userAuthProvider === ANONYMOUS_PROVIDER ?
                            <SettingSection title={translate('UserSettingsScreen.accountSection.title')}>
                                <View style={[GlobalStyles.col, GlobalStyles.justifyContentSpaceBetween, GlobalStyles.mt12, GlobalStyles.ml24]}>
                                    <TouchableOpacity
                                        activeOpacity={.6}
                                        style={[userAuthProvider === PASSWORD_PROVIDER && GlobalStyles.mt16, { marginBottom: 16 }]}
                                        onPress={() => navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR)}>
                                        <Text style={[GlobalStyles.colorParagraphText, styles.actions]}>
                                            {translate('UserSettingsScreen.accountSection.createAccount')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </SettingSection>
                            :
                            <>
                                {isLoggedUser ?
                                    <SettingSection title={translate('UserSettingsScreen.sessionSection.title')}>
                                        <View style={[GlobalStyles.col, GlobalStyles.justifyContentSpaceBetween, GlobalStyles.mt12, GlobalStyles.ml24]}>
                                            {userAuthProvider === PASSWORD_PROVIDER &&
                                                <TouchableOpacity
                                                    activeOpacity={.6}
                                                    onPress={() => setState({ showChangePasswordDialog: true })}>
                                                    <Text style={[GlobalStyles.colorParagraphText, styles.actions]}>
                                                        {translate('UserSettingsScreen.sessionSection.changePassword')}
                                                    </Text>
                                                </TouchableOpacity>
                                            }
                                            <TouchableOpacity
                                                activeOpacity={.6}
                                                style={[userAuthProvider === PASSWORD_PROVIDER && GlobalStyles.mt16, { marginBottom: 16 }]}
                                                onPress={signOut}>
                                                <Text style={[GlobalStyles.colorParagraphText, styles.actions]}>
                                                    {translate('UserSettingsScreen.sessionSection.closeSession')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </SettingSection>
                                    :
                                    null
                                }
                            </>
                        }
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

mapStateToProps = (state) => ({
    isLoggedUser: state.User.isLogged,
    uid: state.User.uid,
    lostedPetsNotifications: state.User.lostedPetsNotifications,
    adoptionPetsNotifications: state.User.adoptionPetsNotifications,
    userAuthProvider: state.User.authProvider
});

export default connect(mapStateToProps)(UserSettingsScreen);
