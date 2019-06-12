import {createStackNavigator} from 'react-navigation';

//import LoginScreen from './src/screens/login-screen';
//import SignInScreen from './src/screens/signin-screen';
import HomeScreen from './src/screens/home-screen';
import InformationScreen from './src/screens/information';
import RoomsScreen from './src/screens/rooms';
import ServicesScreen from './src/screens/services';
import AirportsScreen from './src/screens/airports';
import CasinosScreen from './src/screens/casinos';
import ZoneScreen from './src/screens/zone';
import NetworksScreen from './src/screens/networks';
import ExperiencesScreen from './src/screens/experiences';
import ContactScreen from './src/screens/contact';
import ActivitiesScreen from './src/screens/activities';

const App = createStackNavigator({
  //Login: {screen: LoginScreen},
  //SignIn: {screen: SignInScreen},
  Home: {screen: HomeScreen},
  Information: {screen: InformationScreen},
  Rooms: {screen: RoomsScreen},
  Services: {screen: ServicesScreen},
  Airports: {screen: AirportsScreen},
  Casinos: {screen: CasinosScreen},
  Zone: {screen: ZoneScreen},
  Networks: {screen: NetworksScreen},
  Experiences: {screen: ExperiencesScreen},
  Contact: {screen: ContactScreen},
  Rooms: {screen: RoomsScreen},
  Activities: {screen: ActivitiesScreen}
})

export default App
