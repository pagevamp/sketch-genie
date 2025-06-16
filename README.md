# Sketch Genie 🎨✨

Transform your hand-drawn sketches into interactive React Native components with AI-powered magic! Sketch Genie uses machine learning to interpret your drawings and generate real, working UI components.

## Demo Video

https://github.com/user-attachments/assets/10991144-a0de-4d9f-bf45-bf102547b487

## Features ✨

- **Sketch Recognition**: Draw UI elements and see them come to life
- **Real-time Preview**: Instantly view generated React Native components
- **Interactive Components**: Generated UIs are fully interactive
- **Powered by AI**: Advanced machine learning for accurate sketch interpretation
- **Built with Expo**: Seamless cross-platform compatibility

## Getting Started 🚀

### Prerequisites

- Node.js 16+
- yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/pagevamp/sketch-genie.git
cd sketch-genie

# Install dependencies
yarn

# Generate native directories
npx expo prebuild

# Start the development server
npx expo run:ios
#or
npx expo run:android
```

## Server Setup

### Ollama llava model

```bash
brew install ollama

# Download llava model
ollama pull llava

# Run ollama server
ollama serve
```

> Use local endpoint from ollama in the project
