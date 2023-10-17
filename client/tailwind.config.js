/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        'app-icon': '1.5px'
      },
      boxShadow: {
        'light-app-icon': '4px 4px 0px rgba(0, 0, 0, 0.8)',
        'light-app-icon-hover': '-4px -4px 0px rgba(0, 0, 0, 0.8)',
        'dark-app-icon': '4px 4px 0px rgba(255, 255, 255, 0.8)',
        'dark-app-icon-hover': '-4px -4px 0px rgba(255, 255, 255, 0.8)',
        button: 'inset 1px 1px 2px hsla(0, 0%, 100%,.1)',
        'light-side-item': 'inset 1px 1px 2px rgba(0, 0, 0, 0.1)',
        'dark-side-item': 'inset 1px 1px 2px rgba(255, 255, 255, 0.1)'
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
        8: '#0050B3'
      },
      neutral: {
        1: '#FFFFFF',
        2: '#FAFAFA',
        3: '#F5F5F5',
        4: '#F0F0F0',
        5: '#D9D9D9',
        13: '#000000'
      },
      'dust-red': {
        1: '#FFF1F0',
        2: '#FFCCC7',
        3: '#FFA39E',
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
        '0.75-light': 'rgba(255, 255, 255, 0.75)',
        '0.75-dark': 'rgba(24, 29, 35, 0.75)',
        0: 'rgb(24, 29, 35)',
        1: 'rgb(29, 35, 43)',
        0.7: 'rgba(24, 29, 35, 0.7)'
      },
      'clr-link': {
        light: '#050505',
        dark: '#FFFFFF'
      },
      white: '#FFFFFF',
      app: { light: '#EDF2F7', dark: '#07080b' },
      text: {
        light: '#1A202C',
        dark: '#CBD1E1'
      },
      button: {
        light: '#CBD1D8',
        'light-hover': '#B6C0C9',
        'light-text': '#545657',
        dark: '#323F4A',
        'dark-hover': '#43515e',
        'dark-text': '#FFFFFF'
      },
      header: {
        end: 'transparent',
        'light-start': 'rgba(255, 255, 255)'
      },
      'clr-border-1': {
        light: '#E0E4E8',
        dark: '#20262E'
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
      footer: {
        'light-text': '#6B7B8E'
      },
      'drop-down': {
        light: '#EDF2F7',
        dark: '#27313A'
      },
      'count-down-timer': 'linear-gradient(90deg, #E7DADA 0.01%, #E0CFCF 99.99%)',
      section: {
        background:
          'linear-gradient(125deg, rgba(255, 255, 255, 0.75) 30.27%, rgba(245, 245, 245, 0.56) 68.16%)',
        shadown: 'rgba(0, 0, 0, 0.07)'
      },
      game: {
        locked: '#252E36'
      },
      ranking: {
        'top-1':
          'linear-gradient(90deg, #FFF 10.94%, #FFFBDE 99.99%, rgba(255, 255, 255, 0.00) 100%)',
        'top-2':
          'linear-gradient(90deg, #FFF 10.94%, #E1E1E1 99.99%, rgba(255, 255, 255, 0.00) 100%)',
        'top-3': 'linear-gradient(90deg, #FFF 10.94%, #FBECDE 99.99%)',
        'top-4-10': 'linear-gradient(90deg, #FFF 10.94%, #F5F5F5 99.99%)',
        background: 'linear-gradient(109deg, #D2D7DC 42.62%, rgba(225, 230, 235, 0.50) 71.78%)',
        number: '#B6C1C7'
      },
      avatar: {
        outline: '#976E06'
      },
      border: {
        clear: '#CBD5E0'
      },
      'game-list': {
        background:
          'linear-gradient(90deg, rgba(243, 246, 250, 0.75) 46.55%, rgba(255, 255, 255, 0.00) 91.04%)'
      },
      input: {
        background: '#E2E8F0',
        border: '#CBD5E0'
      }
    }
  },
  plugins: [],
  important: true
}
