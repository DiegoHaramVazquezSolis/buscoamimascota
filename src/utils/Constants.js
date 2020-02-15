// Background colors
export const DARK_COLOR = '#16536E'; // 344955
export const PRIMARY_COLOR = '#489EBA';
export const SECONDARY_COLOR = '#70C4C4';

// Text colors
export const PRIMARY_TEXT_COLOR = '#455A64';
export const SECONDARY_TEXT_COLOR = '#707079';

// Multiple propuse colors
export const ERROR_COLOR = '#FF0000';
export const DISABLED_COLOR = '#E5E5E5';

// Redux constants

/* LostedPublicationsReducer */
export const GET_LOSTED_PUBLICATION = 'GET_LOSTED_PUBLICATION';
export const REMOVE_LOSTED_PUBLICATION = 'REMOVE_LOSTED_PUBLICATION';
export const REMOVE_ALL_LOSTED_PUBLICATIONS = 'REMOVE_ALL_LOSTED_PUBLICATIONS';

/* UserReducer */
export const USER_LOGGED = 'USER_LOGGED';
export const USER_NOT_LOGGED = 'USER_NOT_LOGGED';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

/* AdoptionPublicationsReducer */
export const GET_ADOPTION_PUBLICATION = 'GET_ADOPTION_PUBLICATION';
export const REMOVE_ADOPTION_PUBLICATION = 'REMOVE_ADOPTION_PUBLICATION';
export const REMOVE_ALL_ADOPTION_PUBLICATIONS = 'REMOVE_ALL_ADOPTION_PUBLICATIONS';

/* ScreensReducer */
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
export const SET_PREVIOUS_SCREEN = 'SET_PREVIOUS_SCREEN';

// Navigator constants
export const APP_STACK_NAVIGATOR = 'AppStackNavigator';
export const MAIN_BOTTOM_NAVIGATOR = 'MainBottomNavigator';
export const PETS_TOP_TAB_NAVIGATOR = 'PetsTopTabNavigator';
export const PUBLICATIONS_STACK_NAVIGATOR = 'PublicationsStackNavigator';
export const PUBLICATION_DETAILS_STACK_NAVIGATOR = 'PublicationDetailsStackNavigator';
export const AUTHENTICATION_STACK_NAVIGATOR = 'AuthenticationStackNavigator';
export const CREATE_PUBLICATION_STACK_NAVIGATOR = 'CreatePublicationStackNavigator';

// Screen constants

/* Publications screens constants */
export const LOSTED_PUBLICATIONS_LIST_SCREEN = 'LostedPublicationsListScreen';
export const ADOPTION_PUBLICATIONS_LIST_SCREEN = 'AdoptionPublicationListScreen';
export const PUBLICATION_DETAILS_SCREEN = 'PublicationDetailsScreen';
export const PUBLICATION_DETAILS_LOCATION_SCREEN = 'PublicationDetailsLocationScreen';
export const CHOOSE_PUBLICATION_TYPE_SCREEN = 'ChoosePublicationTypeScreen';

/* Pet info screens constants */
export const PET_INFO_FORM_SCREEN = 'PetInfoFormScreen';
export const PET_INFO_LOCATION_SCREEN = 'PetInfoLocationScreen';
export const PET_INFO_CONTACT_SCREEN = 'PetInfoContactScreen';
export const PET_INFO_IMAGE_SCREEN = 'PetInfoImageScreen';

/* Auth screens constants */
export const CREATE_ACCOUNT_SOCIAL_MEDIA_SCREEN = 'CreateAccountSocialMediaScreen';
export const CREATE_ACCOUNT_EMAIL_SCREEN = 'CreateAccountEmailScreen';
export const LOGIN_SCREEN = 'LoginScreen';

/* User screens constants */
export const USER_SETTINGS_SCREEN = 'UserSettingsScreen';

/* Other screens constants */
export const ON_BOARDING_SCREEN = 'OnBoardingIntroductionScreen';
export const LOADING_DATA_SCREEN = 'LoadingDataScreen';

// Async storage constants
export const ON_BOARDING_VIEWED_AS = 'on_boarding_viewed';

// API Key constants
export const BATTUTA_API_KEY = 'b60ad6a578b6decda04575a54429b117';
export const WEB_CLIENT_GOOGLE_AUTH = '1021296714116-l90pno6dch9snp6d1tlnlrmg4h7rlpto.apps.googleusercontent.com';

// Location constants
export const DEGREES_LATITUDE_PER_MILE = 0.0144927536231884;
export const DEGREES_LONGITUDE_PER_MILE = 0.0181818181818182;

// Firebase auth error codes
export const WRONG_PASSWORD = 'auth/wrong-password';
export const WEAK_PASSWORD = 'auth/weak-password';
export const REQUIRES_RECENT_LOGIN = 'auth/requires-recent-login';