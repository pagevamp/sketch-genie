# EXPO starter kit

Jumpstart your app development journey with this [Expo](https://expo.dev) starter kit. It includes essential tools and configurations to simplify development and ensure compatibility with the latest practices.

## Getting Started

- [Features](#Features)
- [Create project with template](#create-project-with-template)
- [Project Structure](#project-structure)
- [Editor Setup](#editor-setup)
- [Development Setup](#development-setup)
- [Project Configuration](#project-configuration)
- [Build Configuration](#build-configuration)

## Features

- **Typescript**: Enhances code quality and developer productivity with TypeScript.
- **Expo Router**: Simplifies navigation using [file-based routing](https**://docs.expo.dev/router/introduction).
- **SVG Transformation**: Supports seamless integration of SVG assets.
- **Absolute Paths**: Simplifies module imports using absolute paths.
- **Vector Icons**: Includes a variety of vector icons for enhanced visual design.
- **Fonts**: Provides pre-configured fonts to style text elements as an example.
- **Responsive Scales**: Ensures consistent UI scaling across devices.
- **Common Styles**: Encapsulates reusable styles for UI components.
- **Splash Screen**: Customizes the app's launch screen for branding.
- **App Icons**: Configures app icons for different platforms.
- **RTK Query**: Facilitates efficient data fetching and state management.
- **Redux Persist**: Persists reducer data based on whitelisting.
- **Sentry Setup**: Enables error monitoring and debugging with Sentry.

## Create project with template
> To use this template, make sure to have the [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed and run:

```bash
npx create-expo-app [app-name] --template @ichhya/react-native-expo-starter-kit
```

## Project Structure

```
|- project-root
	|- android
	|- ios
	|- node_modules
	|- src
		|- app
			|- _layout.tsx
			|- index.tsx
			|- (auth)
				|- _layout.tsx
				|- index.tsx
		|- assets
			|- fonts
			|- images
			|- svgs
			|- index.ts
		|- components
			|- atoms
			|- molecules
			|- organisms
		|- config
		|- constants
		|- helpers
		|- hooks
		|- models
		|- redux
			|- slices
		|- screens
		|- services
			|- apis
			|- providers
		|- utils
	|- .editorconfig
	|- .env.example
	|- .env
	|- .eslintrc
	|- .gitignore
	|- .nvmrc
	|- .prettierrc.js
	|- .ruby-version
	|- README.md
	|- app.json
	|- babel.config.js
	|- declarations.d.ts
	|- metro.config.js
	|- package.json
	|- yarn.lock
```

## Editor Setup

Following tools are used to make code look consistent. Please install the mentioned tools below,

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## Development Setup
### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Ruby](https://www.ruby-lang.org/en/)
- [Android Studio](https://developer.android.com/studio)
- [XCode](https://developer.apple.com/xcode/)

> Please make sure that you have follow environment setup steps as described in [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) documentation.

## Project Configuration

### `.env` Files

`.env` files are where we save all the environment variables. They are placed under project root directory. Ensure to update the .env files as per your needed to reflect changes.

```
|- project-root
  |- .env.example
  |- .env
```

### `.env.example`

```
EXPO_PUBLIC_APP_ENV=
EXPO_PUBLIC_API_URL=
GOOGLE_OAUTH_CLIENT_ID_ANDROID=
```

### After setting `env` variables follow following steps to get up and running with development. Run following commands from project root directory

### 1. Install dependencies

```
yarn
```

### 2. Link necessary dependencies
Before linking dependencies, ensure the ios directory exists. If the ios directory is missing, please complete the next steps before proceeding to link dependencies.

```
cd ios && pod install
```

### 3. Generating Native Directories
Expo requires native project directories for Android and iOS. To comply with Expo's requirements for native project directories in Android and iOS:

Remove the _android.package_ and _ios.bundleIdentifier_ fields from app.json. Next, delete the existing native directories for Android and iOS. Afterward, you can regenerate these directories with new specified identifiers using one of the following methods:

### [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
Running expo prebuild will generate the required project files. After executing this command, developers can proceed with configuring local development build.
```bash
npx expo prebuild
```

### [Development Build](https://docs.expo.dev/guides/local-app-development/)
Alternatively, you can run a development build (expo run:ios) to generate the native directories.

#### Compiling the App Locally
To build your project locally you can use compile commands from Expo CLI which generates the android and ios directories:

#### Building the Android Project

```bash
npx expo run:android
```

#### Building the iOS Project

```bash
npx expo run:ios
```

## Build Configuration
While this starter kit doesn't include pre-configured EAS Build setup, you can easily set it up yourself by following these steps:

### EAS Build
EAS Build is a powerful tool offered by Expo for optimizing and simplifying the build process of Expo projects. Here’s how you can get started:

- **Expo Account**: If you don't have one already, sign up for an Expo account at expo.dev/signup.

- **Apple Developer Account**: Ensure you have an Apple Developer account if you plan to build iOS apps using EAS Build. This is necessary for full iOS build functionality.

- **Setup Guide**: Explore the comprehensive [Expo documentation](https://docs.expo.dev/build/introduction/) on EAS Build for detailed setup instructions.

By setting up EAS Build, you'll streamline your app deployment process and leverage advanced features directly from the command line.

 ### Triggering EAS builds from terminal
EAS Build is available to anyone with an Expo account. You can sign up at  [https://expo.dev/signup](https://expo.dev/signup). An apple developer account is required for ios builds.

```bash
eas login
```

```bash
eas build --platform [android | ios | all]
```   
	  
### IOS Internal Distribution
This is a to distribute apps directly to testers, so they can download and install them to physical devices directly from a web browser as soon as the builds are completed. However, we will need to build the app with an ad hoc provisioning profile that explicitly lists the devices on which the application can run. An apple developer account is required during this process.

The first two steps are required only once, and you don't need to re-register your device again for future builds.

1. **Register apple device that you'll be using**
	```bash
	eas device:create
	```
2. **Setup build credentials and add device in provisioning profile**
	```bash
	eas credentials
	```
3. **Run a build with internal build profile** (can also be triggered from this [workflow](https://github.com/pagevamp/journa-app/actions/workflows/dispatch-internal-build.yml))
	```bash
	eas build --profile preview --platform ios
	```
You can then access the build artifact in expo project dashboard and use QR scan to directly install the application in the registered IOS device. If you're running iOS 16 or above and haven't yet turned on Developer Mode, you will need to [enable it](https://docs.expo.dev/guides/ios-developer-mode/) before you can run your build.

### Android Internal Distribution
Since there is no Android restrictions, the operating system is capable of installing any compatible **.apk** file. You can generate an apk file with one command:
```bash
eas build --profile preview --platform android
```
