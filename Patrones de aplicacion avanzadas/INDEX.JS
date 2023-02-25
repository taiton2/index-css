import 'https://unpkg.com/favicon-badge@2.0.0/dist/FavIconBadge.js';

// the '<favicon-badge>' custom element.
const favicon = document.querySelector('favicon-badge');
//the installButton 
const installButton = document.querySelector('button');

// Feature detection.
const supportsAppBadge = 'setAppBadge' in navigator;

//this function will either set the favicon or the native
//app badge. The implementation is dynamically changes at runtime.
let setAppBadge;

//Variable for the counter.
let i = 0;

//Returns a value between 0 and 9.
const getAppBadgeValue = () => {
    if (i > 9) {
        i = 0;
    }
    return i++;
};

// Function to set a native app badge.
const setAppBadgeFavicon = (value) => {
    favicon.badge = value;
};

// Function to set a native app badge.
const setAppBadgeNative = (value) => {
    navigator.setAppBadge(value);
}

// If the app is installed and native app badge are supported,
// use the native app badge.
if (
    matchMedia(('display-mode: standalone')).matches &&
    supportsAppBadge 
) {
    setAppBadge = setAppBadgeNative;
//In all other cases (i.e., if the app is not installed or native
// app badge are not supported), use the favicon badge.
} else {
    setAppBadge = setAppBadgeFavicon;
}

// Only relevant for browsers that support installation.
if ('BeforeInstallPromptEvent' in window) {
    // Variable to stash the 'BeforeInstallPromtEvant'.
    let installEvant = null;

// Function that will be run when the app is installed.
    const onInstall = () => {
    //Disable the install button.
        installButton.disabled = true;
    //Switch the implementation so it uses the native
    // app badge.
        setAppBadge = setAppBadgeNative;
    }
};

window.addEventListener('beforeinstallprompt', (event) => {
    //Do not show the install prompt quite yet.
    event.preventDefault();
    // Stash the 'BeforeInstallPromptEvent' for later.
    installEvent = event;
    // Enable the install button.
    installButton.disabled = false;
});

installButton.addEventListener('click', async () => {
    // If there is no stashed 'BeforeInstallPromptEvent', return.
    if (!installEvent) {
        return;
    }
    // USE The stashed 'BeforeInstallPromptEvent' to prompt the user.
    installEvent.prompt();
    const result = await installEvant.userChoice;
    // If the user installs the app, run 'onInstall()'.
    if (result.outcome === 'accepted') {
        onInstall();
    }
});

//The user can decide to ignore the install install Button
// and just use the browser prompt directly. In this cases
//Likewise run 'onInstall()'.
window.addEventListener('appinstalled', (event) => {
    onInstall();
});






