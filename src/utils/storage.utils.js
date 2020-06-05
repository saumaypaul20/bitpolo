'use strict';

import { AsyncStorage } from 'react-native'

export default class Storage {
    static get(key) {
        return AsyncStorage.getItem(key);
    }

    static set(key, value) {
        //console.log('storage',key,value);
        return AsyncStorage.setItem(key, value);
    }
    static clearAll() {
        return AsyncStorage.clear();
    }
}
