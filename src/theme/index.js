import * as Fonts from './typography';
import * as ColorPallette from './colors'
import * as Images from './images'

let isLight = false;

let Colors = ColorPallette.primaryColors
if(isLight){
    Colors = ColorPallette.secondaryColors
}

export {Fonts, Colors, Images }
 