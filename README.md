# FireCards [![Build Status](https://travis-ci.org/ryansully/firecards.svg?branch=master)](https://travis-ci.org/ryansully/firecards) [![codecov](https://codecov.io/gh/ryansully/firecards/branch/master/graph/badge.svg)](https://codecov.io/gh/ryansully/firecards)

A party game for horrible people,
powered by [Firebase](https://firebase.google.com).

FireCards is an online implementation of
[Cards Against Humanity](https://cardsagainsthumanity.com) that demonstrates
some of the features and capabilities of Firebase. Anyone can install it to a
personal Firebase project to play with friends and other horrible people. :)

## Firebase Setup

Before installing FireCards, you will need to create a Firebase project.
1. Create a Firebase project in the
  [Firebase console](https://console.firebase.google.com/).
2. Enable the sign-in providers you want to use in the **Authentication**
  section. Your friends will be able to connect to your game through the
  services you enable.

## Installation

    npm install

After packages finish installing, you will be prompted to log into Firebase and
add the project you created.

When you're ready to deploy to Firebase, run `npm run deploy`.
Use the **Hosting URL** displayed at the end of deployment to use your FireCards
installation.

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).
See the [CRA User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for details.