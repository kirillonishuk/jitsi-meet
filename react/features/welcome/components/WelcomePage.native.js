import React from 'react';
import {
    Animated,
    Keyboard,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Clipboard,
    ScrollView,
    ImageBackground,
    Image,
    Linking
} from 'react-native';

import bipKonferans from '../../../../images/bip_konferans.jpg';
import group4 from '../../../../images/group-4.png';
import { getName } from '../../app/functions';
import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import { Icon, IconMenu, IconWarning } from '../../base/icons';
import { MEDIA_TYPE } from '../../base/media';
import { Header, LoadingIndicator, Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import {
    createDesiredLocalTracks,
    destroyLocalTracks
} from '../../base/tracks';
import { HelpView } from '../../help';
import { DialInSummary } from '../../invite';
import { SettingsView } from '../../settings';
import { setSideBarVisible } from '../actions';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import LocalVideoTrackUnderlay from './LocalVideoTrackUnderlay';
import styles, { PLACEHOLDER_TEXT_COLOR } from './styles';

import EditIcon from '../icons/edit.png';
import CopyIcon from '../icons/sheet-copy.png';
import Eye from '../icons/eye.png';
import EyeCrossed from '../icons/eye_crossed.png';

/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state._fieldFocused = false;
        this.state.hintBoxAnimation = new Animated.Value(0);

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._onShowSideBar = this._onShowSideBar.bind(this);
        this._renderHintBox = this._renderHintBox.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
        this._onContactUsPress = this._onContactUsPress.bind(this);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        super.componentDidMount();

        // this._updateRoomname();

        const { dispatch } = this.props;

        if (this.props._settings.startAudioOnly) {
            dispatch(destroyLocalTracks());
        } else {
            // Make sure we don't request the permission for the camera from
            // the start. We will, however, create a video track iff the user
            // already granted the permission.
            navigator.permissions.query({ name: 'camera' }).then(response => {
                response === 'granted'
                    && dispatch(createDesiredLocalTracks(MEDIA_TYPE.VIDEO));
            });
        }
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // We want to have the welcome page support the reduced UI layout,
        // but we ran into serious issues enabling it so we disable it
        // until we have a proper fix in place. We leave the code here though, because
        // this part should be fine when the bug is fixed.
        //
        // NOTE: when re-enabling, don't forget to uncomment the respective _mapStateToProps line too

        /*
        const { _reducedUI } = this.props;

        if (_reducedUI) {
            return this._renderReducedUI();
        }
        */

        return this._renderFullUI();
    }

    /**
     * Renders the insecure room name warning.
     *
     * @inheritdoc
     */
    _doRenderInsecureRoomNameWarning() {
        return (
            <View
                style = { [
                    styles.messageContainer,
                    styles.insecureRoomNameWarningContainer
                ] }>
                <Icon
                    src = { IconWarning }
                    style = { styles.insecureRoomNameWarningIcon } />
                <Text style = { styles.insecureRoomNameWarningText }>
                    { this.props.t('security.insecureRoomNameWarning') }
                </Text>
            </View>
        );
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.messageContainer,
            styles.hintContainer,
            {
                opacity: this.state.hintBoxAnimation
            }
        ];
    }

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        focused
            && this.setState({
                _fieldFocused: true
            });

        Animated.timing(
            this.state.hintBoxAnimation,
            {
                duration: 300,
                toValue: focused ? 1 : 0
            })
            .start(animationState =>
                animationState.finished
                    && !focused
                    && this.setState({
                        _fieldFocused: false
                    }));
    }

    /**
     * Callback for when press on Contact Us.
     *
     * @private
     * @returns {void}
     */
    _onContactUsPress() {
        Linking.openURL('mailto:TEAM-BIP-KONFERANS@turkcell.entp.tgc');
    }

    /**
     * Toggles the side bar.
     *
     * @private
     * @returns {void}
     */
    _onShowSideBar() {
        Keyboard.dismiss();
        this.props.dispatch(setSideBarVisible(true));
    }

    /**
     * Copies Meeting Address to clipboard .
     *
     * @private
     * @returns {void}
     */
    _onCopyPress() {
        Clipboard.setString(this.state.meetingAddress);
    }

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */
    _renderHintBox() {
        if (this.state._fieldFocused) {
            const { t } = this.props;

            return (
                <Animated.View style = { this._getHintBoxStyle() }>
                    <View style = { styles.hintTextContainer } >
                        <Text style = { styles.hintText }>
                            { t('welcomepage.roomnameHint') }
                        </Text>
                    </View>
                    <View style = { styles.hintButtonContainer } >
                        { this._renderJoinButton() }
                    </View>
                </Animated.View>
            );
        }

        return null;
    }

    /**
     * Renders the join button.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinButton() {
        const { t } = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color = { styles.buttonText.color }
                        size = 'small' />
                </View>
            );
        } else {
            children = (
                <Text style = { styles.buttonText }>
                    { this.props.t('welcomepage.join') }
                </Text>
            );
        }

        return (
            <TouchableHighlight
                accessibilityLabel =
                    { t('welcomepage.accessibilityLabel.join') }
                onPress = { this._onJoin }
                style = { styles.button }
                underlayColor = { ColorPalette.white }>
                { children }
            </TouchableHighlight>
        );
    }

    /**
     * Renders the full welcome page.
     *
     * @returns {ReactElement}
     */
    _renderFullUI() {
        const { _headerStyles, t } = this.props;

        return (
            <LocalVideoTrackUnderlay style = { styles.welcomePage }>
                <View style = { _headerStyles.page }>
                    <ImageBackground
                        source = { bipKonferans }
                        style = { styles.welcomePageBackground } >
                        <View style = { styles.darckify }>
                            <Header style = { styles.header }>
                                <Image source = { group4 } />
                            </Header>
                            <ScrollView contentInsetAdjustmentBehavior="automatic" style = { styles.roomContainer } >
                                <SafeAreaView>
                                    <View style = { styles.mainForm }>

                                        <View style = { styles.tabsBlock }>
                                            <Text
                                                onPress = { () => this._onChangeMeetingType(false) }
                                                style = {
                                                    this.state.isPersonalMeeting ? styles.tabItem : {
                                                        ...styles.tabItem,
                                                        ...styles.activeTab
                                                    }
                                                }
                                            >
                                                New Meeting
                                            </Text>
                                            <Text
                                                onPress = { () => this._onChangeMeetingType(true) }
                                                style = {
                                                    !this.state.isPersonalMeeting ? styles.tabItem : {
                                                        ...styles.tabItem,
                                                        ...styles.activeTab
                                                    }
                                                }
                                            >
                                                Personal Room
                                            </Text>
                                        </View>

                                        <Text style = { styles.infoText }>
                                            Please enter the information below in order to start meeting.
                                        </Text>

                                        <View style = { styles.fieldWrapper }>
                                            <View style = { styles.labelWrapper }>
                                                <Text style = { styles.inputLabel }>Username</Text>
                                            </View>
                                            <View style = { styles.textInputWrapper }>
                                                <TextInput
                                                    onChangeText = { this._onUsernameChange }
                                                    placeholder = { 'Username' }
                                                    style = { styles.textInput }
                                                    value = { this.state.username }
                                                />
                                                <Image source = {EditIcon} style = { styles.editIcon } />
                                            </View>
                                        </View>



                                        {!this.state.isPersonalMeeting && (
                                            <View style = { styles.fieldWrapper }>
                                                <View style = { styles.labelWrapper }>
                                                    <Text style = { styles.inputLabel }>Meeting Subject</Text>
                                                </View>
                                                <View style = { styles.textInputWrapper }>
                                                    <TextInput
                                                        onChangeText = { this._onSubjectChange }
                                                        placeholder = { 'Meeting Subject' }
                                                        style = { styles.textInput }
                                                        value = { this.state.meetingSubject }
                                                    />
                                                </View>
                                            </View>
                                        )}

                                        <View style = { styles.fieldWrapper }>
                                            <View style = { styles.labelWrapper }>
                                                <Text style = { styles.inputLabel }>
                                                    {this.state.isPersonalMeeting ? 'Room Address' : 'Meeting Address'}
                                                </Text>
                                            </View>
                                            <View style = { styles.textInputWrapper }>
                                                {
                                                    this.state.isPersonalMeeting ? (
                                                        <View style={{
                                                            width: '90%',
                                                            flexDirection: 'row',
                                                            overflow: 'hidden'
                                                        }}>
                                                            <Text style = {{
                                                                color: '#03a9f4',
                                                                fontSize: 15,
                                                                paddingTop: 14,
                                                                paddingLeft: 20
                                                            }}>
                                                                https://konferans.bip.com/
                                                            </Text>
                                                            <TextInput
                                                                onChangeText = { this._onSubjectChange }
                                                                style = {{
                                                                    color: '#03a9f4',
                                                                    fontSize: 15,
                                                                    marginLeft: -4,
                                                                    flex: 1,
                                                                    marginRight: 6
                                                                }}
                                                                value = { this.state.meetingSubject }
                                                            />
                                                        </View>
                                                    ) : (
                                                        <TextInput
                                                            editable = { this.state.isPersonalMeeting }
                                                            onChangeText = { this._onAddressChange }
                                                            style = { styles.textInput }
                                                            value = { this.state.meetingAddress }
                                                        />
                                                    )
                                                }
                                                <TouchableOpacity onPress = { () => this._onCopyPress() }>
                                                    <Image
                                                        source = {CopyIcon}
                                                        style = { styles.copyIcon }
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style = { styles.passInfoTextWrapper }>
                                            <Text
                                                onPress = { this._onChangePasswordFieldVisibility }
                                                style = { styles.passwordText }
                                            >
                                                You might consider setting a new password for the privacy of your meeting.
                                            </Text>
                                            <View style={ this.state.isDisplayPasswordField ? styles.triangleIcon : styles.triangleIconReverse } />
                                        </View>
                                        {this.state.isDisplayPasswordField && (
                                            <View style = { styles.fieldWrapper }>
                                                <View style = { styles.labelWrapper }>
                                                    <Text style = { styles.inputLabel }>Meeting Password</Text>
                                                </View>
                                                <View style = { styles.textInputWrapper }>
                                                    <TextInput
                                                        style = { styles.textInput }
                                                        value = { this.state.password }
                                                        secureTextEntry = { !this.state.isPasswordVisible }
                                                    />
                                                    <TouchableOpacity onPress = { this._onChangePasswordValueVisibility }>
                                                        <Image
                                                            source = { this.state.isPasswordVisible ? EyeCrossed : Eye }
                                                            style = { styles.eyeIcon }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}

                                        <TouchableOpacity
                                            style = {{
                                                ...styles.hostButton,
                                                ...(!this.state.meetingSubject ? styles.hostButtonDeactivated : styles.hostButtonActive)
                                            }}
                                            onPress = { this._onJoin }
                                            disabled = { !this.state.meetingSubject }
                                        >
                                            <Text style = { !this.state.meetingSubject ? styles.hostBtnText : styles.hostBtnTextActive }>Host a Meeting</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style = { styles.privacy }>
                                        <Text style = { styles.privacyItem }>
                                            Secure and Fast Communication via BiP
                                        </Text>
                                        <Text style = { styles.privacyItem }>
                                            BiP Konferans Alpha is a test version.
                                        </Text>
                                        <Text style = { styles.privacyItem }>
                                            All rights reserved @ 2020
                                        </Text>
                                        <Text
                                            onPress = { this._onContactUsPress }
                                            style = { styles.privacyContactUs } >
                                            Contact us
                                        </Text>
                                    </View>
                                </SafeAreaView>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            </LocalVideoTrackUnderlay>
        );
    }

    /**
     * Renders a "reduced" version of the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderReducedUI() {
        const { t } = this.props;

        return (
            <View style = { styles.reducedUIContainer }>
                <Text style = { styles.reducedUIText }>
                    { t('welcomepage.reducedUIText', { app: getName() }) }
                </Text>
            </View>
        );
    }

    /**
     * Renders JitsiModals that are supposed to be on the welcome page.
     *
     * @returns {Array<ReactElement>}
     */
    _renderWelcomePageModals() {
        return [
            <HelpView key = 'helpView' />,
            <DialInSummary key = 'dialInSummary' />,
            <SettingsView key = 'settings' />
        ];
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')

        // _reducedUI: state['features/base/responsive-ui'].reducedUI
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
