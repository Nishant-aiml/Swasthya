import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swasthya.app',
  appName: 'Swasthya',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  android: {
    buildOptions: {
      keystorePath: 'android/release-key.keystore',
      keystoreAlias: 'key0',
    },
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    },
    Geolocation: {
      permissions: {
        android: {
          foregroundService: {
            enabled: true,
            title: 'SwasthyaCare Location Service',
            text: 'SwasthyaCare needs your location to find nearby emergency services.'
          }
        }
      }
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#10B981',
      sound: 'beep.wav'
    },
    App: {
      backgroundColor: '#ffffff',
      hideNavigationBarOnLaunch: true,
      webViewAllowsBackForwardNavigationGestures: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    PrivacyScreen: {
      enable: true,
      imageName: 'Splash'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      AndroidPersistentFileLocation: 'Compatibility',
      FadeSplashScreen: 'false',
      AutoHideSplashScreen: 'false',
      ShowSplashScreen: 'true',
      SplashMaintainAspectRatio: 'true',
      SplashShowOnlyFirstTime: 'false',
      SplashScreenDelay: '3000'
    }
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: true,
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: true
  }
}

export default config;
