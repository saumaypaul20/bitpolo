import * as Fonts from './typography';
import * as ColorPallette from './colors'

let isLight = false;

let Colors = ColorPallette.primaryColors
if(isLight){
    Colors = ColorPallette.secondaryColors
}

export {Fonts, Colors }
 