// @flow

import { StyleSheet } from 'react-native';

import { BoxModel, ColorPalette } from '../../base/styles';

export const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.5)';

export const SIDEBAR_AVATAR_SIZE = 100;

const SIDEBAR_HEADER_HEIGHT = 150;

export const SWITCH_THUMB_COLOR = ColorPalette.blueHighlight;

export const SWITCH_UNDER_COLOR = 'rgba(0, 0, 0, 0.4)';

/**
 * The default color of text on the WelcomePage.
 */
const TEXT_COLOR = ColorPalette.white;
const CONTACT_US_TEXT_COLOR = ColorPalette.blue;

/**
 * The styles of the React {@code Components} of the feature welcome including
 * {@code WelcomePage} and {@code BlankPage}.
 */
export default {

    /**
     * The audio-video switch itself.
     */
    audioVideoSwitch: {
        marginHorizontal: 5
    },

    /**
     * View that contains the audio-video switch and the labels.
     */
    audioVideoSwitchContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    /**
     * View that is rendered when there is no welcome page.
     */
    blankPageWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    /**
     * Join button style.
     */
    button: {
        backgroundColor: ColorPalette.blue,
        borderColor: ColorPalette.blue,
        borderRadius: 4,
        borderWidth: 1,
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    /**
     * Join button text style.
     */
    buttonText: {
        alignSelf: 'center',
        color: ColorPalette.white,
        fontSize: 14
    },

    /**
     * The style of the display name label in the side bar.
     */
    displayName: {
        color: ColorPalette.white,
        fontSize: 16,
        marginTop: BoxModel.margin,
        textAlign: 'center'
    },

    enterRoomText: {
        color: TEXT_COLOR,
        fontSize: 18,
        marginBottom: BoxModel.margin
    },

    /**
     * The welcome screen header style.
     */
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /**
     * Container for the button on the hint box.
     */
    hintButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    /**
     * Container for the hint box.
     */
    hintContainer: {
        flexDirection: 'column',
        overflow: 'hidden'
    },

    /**
     * The text of the hint box.
     */
    hintText: {
        textAlign: 'center'
    },

    /**
     * Container for the text on the hint box.
     */
    hintTextContainer: {
        marginBottom: 2 * BoxModel.margin
    },

    /**
     * Container for the items in the side bar.
     */
    itemContainer: {
        flexDirection: 'column',
        paddingTop: 10
    },

    /**
     * A view that contains the field and hint box.
     */
    joinControls: {
        padding: BoxModel.padding
    },

    messageContainer: {
        backgroundColor: ColorPalette.white,
        borderColor: ColorPalette.white,
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: BoxModel.padding,
        paddingVertical: 2 * BoxModel.padding
    },

    /**
     * The style of the top-level container/{@code View} of
     * {@code LocalVideoTrackUnderlay}.
     */
    localVideoTrackUnderlay: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        flex: 1
    },

    /**
     * Top-level screen style.
     */
    page: {
        flex: 1,
        flexDirection: 'column'
    },

    /**
     * The styles for reduced UI mode.
     */
    reducedUIContainer: {
        alignItems: 'center',
        backgroundColor: ColorPalette.blue,
        flex: 1,
        justifyContent: 'center'
    },

    reducedUIText: {
        color: TEXT_COLOR,
        fontSize: 12
    },

    /**
     * Container for room name input box and 'join' button.
     */
    roomContainer: {
        alignSelf: 'stretch',
        flexDirection: 'column'
    },

    /**
     * Container of the side bar.
     */
    sideBar: {
        width: 250
    },

    /**
     * The body of the side bar where the items are.
     */
    sideBarBody: {
        backgroundColor: ColorPalette.white,
        flex: 1
    },

    /**
     * The style of the side bar header.
     */
    sideBarHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        height: SIDEBAR_HEADER_HEIGHT,
        justifyContent: 'center',
        padding: BoxModel.padding
    },

    /**
     * Style of the menu items in the side bar.
     */
    sideBarItem: {
        padding: 13
    },

    /**
     * The View inside the side bar buttons (icon + text).
     */
    sideBarItemButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    /**
     * The icon in the side bar item touchables.
     */
    sideBarItemIcon: {
        color: ColorPalette.blueHighlight,
        fontSize: 20,
        marginRight: 15
    },

    /**
     * The label of the side bar item touchables.
     */
    sideBarItemText: {
        color: ColorPalette.black,
        fontWeight: 'bold'
    },

    /**
     * The container of the label of the audio-video switch.
     */
    switchLabel: {
        paddingHorizontal: 3
    },

    /**
     * Room input style.
     */
    textInput: {
        backgroundColor: 'transparent',
        color: '#03a9f4', //TEXT_COLOR,
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        width: '90%'
    },

    /**
     * Application title style.
     */
    title: {
        color: TEXT_COLOR,
        fontSize: 25,
        marginBottom: 2 * BoxModel.margin,
        textAlign: 'center'
    },

    insecureRoomNameWarningContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5
    },

    insecureRoomNameWarningIcon: {
        color: ColorPalette.warning,
        fontSize: 24,
        marginRight: 10
    },

    insecureRoomNameWarningText: {
        color: ColorPalette.warning,
        flex: 1
    },

    /**
     * The style of the top-level container of {@code WelcomePage}.
     */
    welcomePage: {
        overflow: 'hidden'
    },

    welcomePageBackground: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%'
    },

    darckify: {
        backgroundColor: 'rgba(36,46,55,.65)',
        width: '100%',
        height: '100%'
    },

    privacy: {
        marginBottom: 26,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    privacyItem: {
        color: TEXT_COLOR,
        fontSize: 18,
        lineHeight: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },

    privacyContactUs: {
        color: CONTACT_US_TEXT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        textDecorationLines: 'underline'
    },

    mainForm: {
        backgroundColor: '#fff',
        margin: 16,
        paddingTop: 50,
        paddingRight: 40,
        paddingLeft: 40,
        paddingBottom: 20,
        borderRadius: 8,
        alignItems: 'center'
    },

    tabsBlock: {
        flexDirection: 'row',
        borderBottomColor: '#b8c2c7',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 20,
        width: '100%'
    },

    tabItem: {
        color: '#b8c2c7',
        height: 34,
        fontSize: 15,
        textAlign: 'center',
        width: '50%',
        bottom: -2
    },

    activeTab: {
        color: '#03a9f4',
        borderBottomColor: '#03a9f4',
        borderBottomWidth: 3,
    },

    fieldWrapper: {
        width: '100%',
        marginBottom: 20
    },

    inputLabel: {
        zIndex: 5,
        backgroundColor: '#fff',
        marginBottom: -8,
        marginLeft: 10,
        paddingLeft: 4,
        paddingRight: 4,
        color: '#59595b'
    },

    labelWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },

    textInputWrapper: {
        borderColor: 'rgba(89,89,91,.5)',
        borderRadius: 8,
        borderWidth: 1,
        color: '#03a9f4',
        height: 50,
        width: '100%',
        flexDirection: 'row',
    },

    infoText: {
        color: '#7b7b7b',
        fontSize: 15,
        paddingBottom: 10,
        width: '100%'
    },

    passInfoTextWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#9f9f9f',
        marginBottom: 16,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    passwordText: {
        color: '#7b7b7b',
        fontSize: 15,
        paddingBottom: 10,
        width: '94%'
    },

    hostButton: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderRadius: 30,
        paddingTop: 15,
        paddingLeft: 25,
        paddingBottom: 15,
        paddingRight: 15
    },

    hostButtonActive: {
        backgroundColor: '#03a9f4',

    },
    hostButtonDeactivated: {
        backgroundColor: '#ccc',

        color: 'gray'
    },

    hostBtnText: {
        fontSize: 18,
        color: 'gray'
    },

    hostBtnTextActive: {
        fontSize: 18,
        color: '#fff'
    },

    editIcon: {
        marginLeft: -4,
        marginTop: 14
    },

    copyIcon: {
        marginLeft: -8,
        marginTop: 12
    },

    triangleIcon: {
        marginTop: 20,
        width: 0,
        height: 0,
        borderTopWidth: 0,
        borderRightWidth: 8,
        borderLeftWidth: 8,
        borderBottomWidth: 8,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'rgb(181, 181, 181)',
    },

    triangleIconReverse: {
        marginTop: 20,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderRightWidth: 8,
        borderLeftWidth: 8,
        borderBottomWidth: 0,
        borderTopColor: 'rgb(181, 181, 181)',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },

    eyeIcon: {
        marginLeft: -8,
        marginTop: 12
    }
};
