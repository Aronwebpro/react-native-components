import {Linking, Platform} from 'react-native';
/**
 * Helper method to open native Map App.
 * @param address {string}
 */
const openMapApp = (address) => {
    const encodeAddress = encodeURIComponent(address);
    const url = Platform.select({
        android: 'https://maps.google.com/maps?q=',
        ios: 'https://maps.apple.com/?address='
    });
    try {
        Linking.openURL(url + encodeAddress)
    } catch (e) {
        console.log(e);
    }
};

export {
    openMapApp
}