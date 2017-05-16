import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export const Theme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#D32F2F',
    primary2Color: '#F44336',
    primary3Color: '#FFCDD2',
    accent1Color: '#FFC107',
    accent2Color: '#FFC107',
    accent3Color: '#FFC107' ,
    textColor: '#212121',
    alternateTextColor: '#FFFFFF',
    canvasColor: white,
    borderColor: '#BDBDBD',
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});


export const baseLightTheme = getMuiTheme({
 spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
})

export default Theme;

