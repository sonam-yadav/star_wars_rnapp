
import { createStackNavigator,createAppContainer } from 'react-navigation';

import LoginScreen from './component/login';
import SearchScreen from './component/search';
import DetailScreen from './component/Details'

const AppStackNav = createStackNavigator({

    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    SearchScreen: {
        screen: SearchScreen,
        navigationOptions: {
            header: null
        }
    },
    DetailScreen: {
        screen: DetailScreen,
        navigationOptions: {
            header: null
        }
    }
});

const RouteCompo = createAppContainer(AppStackNav);

export default RouteCompo;