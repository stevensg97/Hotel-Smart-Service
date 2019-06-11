import {createStackNavigator} from 'react-navigation';

import LoginScreen from './src/screens/login-screen';
import SignInScreen from './src/screens/signin-screen';
import HomeScreen from './src/screens/home-screen';
import ShowerScreen from './src/screens/shower-screen';
import SettingsScreen from './src/screens/settings-screen';
import StatisticsScreen from './src/screens/statistics-screen';
import AboutScreen from './src/screens/about-screen';

const App = createStackNavigator({
  Login: {screen: LoginScreen},
  SignIn: {screen: SignInScreen},
  Home: {screen: HomeScreen},
  Shower: {screen: ShowerScreen},
  Settings: {screen: SettingsScreen},
  Statistics: {screen: StatisticsScreen},
  About: {screen: AboutScreen},
})

export default App
