import {extend} from "./utils";
import BaseTheme from "./base";

/*
|--------------------------------------------------------------------------
| Dark theme
|--------------------------------------------------------------------------
| extending dark theme from the base theme
|
*/

export default extend(BaseTheme, {
    actionActive: '#424242',
    actionDisabled: '#303030',
    actionDisabledBackground: '#303030',
    backgroundPrimary: '#303030',
    backgroundSecondary: '#424242',
    textPrimary: '#fff',
    textSecondary: '#c1c1c1',
    textDisabled: '#989898'
})