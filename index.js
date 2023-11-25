/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import Home from './src/screens/Home';
import User from './src/screens/User';
import {HOME_COMPONENT_ID} from './src/app/constants';

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('User', () => User);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            id: HOME_COMPONENT_ID,
                            name: 'Home',
                        },
                    },
                ],
            },
        },
    });
});
