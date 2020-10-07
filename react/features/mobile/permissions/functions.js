// @flow

import { jitsiLocalStorage } from '@jitsi/js-utils';
import { Alert, Linking, NativeModules } from 'react-native';

import { Platform } from '../../base/react';

/**
 * Opens the settings panel for the current platform.
 *
 * @private
 * @returns {void}
 */
export function openSettings() {
    switch (Platform.OS) {
    case 'android':
        NativeModules.AndroidSettings.open().catch(() => {
            Alert.alert(
                    'Error opening settings',
                    'Please open settings and grant the required permissions',
                    [
                        { text: 'OK' }
                    ]
            );
        });
        break;

    case 'ios':
        Linking.openURL('app-settings:');
        break;
    }
}

/**
 * Opens the terms of services.
 *
 * @private
 * @returns {void}
 */
export function openTermsOfServices() {
    Linking.openURL('https://vk.com');
}

/**
 * Opens the privacy statement.
 *
 * @private
 * @returns {void}
 */
export function openPrivacyStatement() {
    Linking.openURL('https://instagram.com');
}

/**
 * Save terms and privacy accepting.
 *
 * @private
 * @returns {void}
 */
export function AcceptPrivacyAndTerms() {
    jitsiLocalStorage.setItem('termsandprivacy', true);
}
