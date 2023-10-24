/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      aspectRatio: {
        ratio: '4 / 3'
      },
      borderWidth: {
        'app-icon': '1.5px'
      },
      boxShadow: {
        button: 'inset 1px 1px 2px hsla(0, 0%, 100%,.1)',
        card: '0px 0 20px rgba(0, 0, 0, 0.1)',
        'dark-app-icon': '4px 4px 0px rgba(255, 255, 255, 0.8)',
        'dark-app-icon-hover': '-4px -4px 0px rgba(255, 255, 255, 0.8)',
        'dark-panel':
          '0 0 30px rgba(255,223,0,0),0px 20px 50px rgba(0,0,0,.2),inset 1px 1px 3px hsla(0,0%,100%,.1)',
        'dark-side-item': 'inset 1px 1px 2px rgba(255, 255, 255, 0.1)',
        'hard-shadow':
          '0px 8px 20px rgba(0, 0, 0, 0.1), inset 1px 1px 3px rgba(255, 255, 255, 0.1)',
        filter: 'inset 1px 1px 2px hsla(0, 0%, 100%,.1)',
        'light-app-icon': '4px 4px 0px rgba(0, 0, 0, 0.8)',
        'light-app-icon-hover': '-4px -4px 0px rgba(0, 0, 0, 0.8)',
        'light-panel': '0px 20px 50px rgba(0, 0, 0, 0.07)',
        'light-side-item': 'inset 1px 1px 2px rgba(0, 0, 0, 0.1)'
      },
      height: {
        'main-content': 'calc(100vh - 4rem)'
      },
      minHeight: {
        content: 'calc(100vh - 4rem - 2.675rem)'
      }
    },
    colors: {
      disable: 'rgba(0, 0, 0, 0.45)',
      primary: {
        1: '#E6F7FF',
        2: '#BAE7FF',
        3: '#91D5FF',
        4: '#69C0FF',
        5: '#40A9FF',
        6: '#1890FF',
        8: '#0050B3'
      },
      neutral: {
        1: '#FFFFFF',
        2: '#FAFAFA',
        3: '#F5F5F5',
        4: '#F0F0F0',
        5: '#D9D9D9',
        8: '#595959',
        13: '#000000'
      },
      'dust-red': {
        1: '#FFF1F0',
        2: '#FFCCC7',
        3: '#FFA39E',
        4: '#FF7875',
        5: '#FF4D4F'
      },
      gold: {
        4: '#FFD666',
        5: '#FFC53D'
      },
      'polar-green': {
        1: '#F6FFED',
        2: '#D9F7BE',
        3: '#B7EB8F',
        5: '#73D13D'
      },
      'rgb-gray': {
        0.75: 'rgba(255, 255, 255, 0.75)',
        '0-563': 'rgba(24, 29, 35, 0.563)',
        '0-0.75': 'rgba(24, 29, 35, 0.75)',
        '1-0.75': 'rgba(29, 35, 43, 0.75)',
        0: 'rgb(24, 29, 35)',
        1: 'rgb(29, 35, 43)',
        0.7: 'rgba(24, 29, 35, 0.7)'
      },
      app: { light: '#EDF2F7', dark: '#07080b' },
      button: {
        light: '#CBD1D8',
        'light-hover': '#B6C0C9',
        'light-text': '#545657',
        dark: '#323F4A',
        'dark-hover': '#43515e',
        'dark-text': '#FFFFFF'
      },
      card: {
        'light-start': 'rgba(255, 255, 255, 1)',
        'light-end': 'rgba(245, 245, 245, 1)',
        'dark-start': 'rgba(45, 55, 64, 0.5)',
        'dark-end': 'rgba(39, 45, 52, 0.5)'
      },
      'clr-link': {
        light: '#050505',
        dark: '#FFFFFF'
      },
      'clr-border-1': {
        light: '#E0E4E8',
        dark: '#20262E'
      },
      'drop-down': {
        light: '#EDF2F7',
        dark: '#27313A'
      },
      footer: {
        'light-text': '#6B7B8E'
      },
      filter: {
        'start-light': 'rgb(218, 222, 226)',
        'end-light': 'rgb(211, 216, 221)',
        'start-dark': 'rgb(45, 55, 64)',
        'end-dark': 'rgb(39, 45, 52)'
      },
      header: {
        end: 'transparent',
        'light-start': 'rgba(255, 255, 255)'
      },
      game: {
        locked: '#252e36'
      },
      ranking: {
        'start-light': '#FFFFFF',
        'start-dark': 'rgba(45, 55, 64, 0.5)',
        1: {
          'end-light': '#FFFBDE',
          'end-dark': '#262100',
          crown: '#CBB30A'
        },
        2: {
          'end-light': '#E1E1E1',
          'end-dark': '#1D1D1D',
          crown: '#B0B0B0'
        },
        3: {
          'end-light': '#FBECDE',
          'end-dark': '#1F1308',
          crown: '#C5701D'
        },
        '4-10': {
          'end-light': 'rgb(245, 245, 245)',
          'end-dark': 'rgba(39, 45, 52, 0.5)'
        },
        background: {
          'start-light': 'rgb(225, 230, 235)',
          'start-dark': 'rgba(29, 35, 43)',
          end: 'rgba(255, 255, 255, 0)'
        },
        'top-3': {},
        number: '#B6C1C7'
      },
      panel: {
        'light-start': 'rgba(255, 255, 255, 0.75)',
        'light-end': 'rgba(245, 245, 245, 0.5625)'
      },
      white: '#FFFFFF',
      text: {
        light: '#1A202C',
        dark: '#CBD1E1',
        secondary: '#6B7B8E',
        'heading-light': '#050505',
        'heading-dark': '#EFF5FB'
      },
      'side-bar': {
        background: 'linear-gradient(99deg, #F3F6FA 76.34%, rgba(255, 255, 255, 0.70) 91.22%)',
        start: 'rgb(243, 246, 250)',
        end: 'rgba(255, 255, 255, 0.7)'
      },
      'side-item': {
        'light-heading': '#D4D6DB',
        'light-link': '#505B69',
        'light-link-hover': '#111111',
        'light-start': 'rgb(217, 222, 227)',
        'light-end': 'rgba(217, 222, 227, 0)',
        'dark-heading': '#101217',
        'dark-link': '#95A7BC',
        'dark-link-hover': '#FFFFFF',
        'dark-start': 'rgb(53, 63, 73)',
        'dark-end': 'rgba(53, 63, 73, 0)',
        'light-icon': '#A4AAB2',
        'light-icon-hover': '#6d7c8e',
        'dark-icon': '#4C5663',
        'dark-icon-hover': '#7C8C9E'
      },

      'count-down-timer': 'linear-gradient(90deg, #E7DADA 0.01%, #E0CFCF 99.99%)',

      avatar: {
        outline: '#976E06'
      },
      input: {
        light: '#E2E8F0',
        dark: '#0F1117',
        'border-light': '#CBD5E0',
        'border-dark': '#323F4A'
      }
    }
  },
  plugins: [],
  important: true
}
