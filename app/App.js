import {createStackNavigator} from 'react-navigation';

import HomeScreen from './src/screens/home';
import InformationScreen from './src/screens/information';
import RoomsScreen from './src/screens/rooms';
import ServicesScreen from './src/screens/services';
import AirportsScreen from './src/screens/airports';
import CasinosScreen from './src/screens/casinos';
import BeachesScreen from './src/screens/beaches';
import GroupsScreen from './src/screens/groups';
import PoolsScreen from './src/screens/pools';
import RestaurantsScreen from './src/screens/restaurants';
import ZoneScreen from './src/screens/zone';
import NetworksScreen from './src/screens/networks';
import BookScreen from './src/screens/book';
import ExperiencesScreen from './src/screens/experiences';
import ContactScreen from './src/screens/contact';
import ActivitiesScreen from './src/screens/activities';
import SignInScreen from './src/screens/signin';
import CreateExperienceScreen from './src/screens/create-experience';

const App = createStackNavigator({
  Home: {screen: HomeScreen},
  Information: {screen: InformationScreen},
  Rooms: {screen: RoomsScreen},
  Services: {screen: ServicesScreen},
  Airports: {screen: AirportsScreen},
  Casinos: {screen: CasinosScreen},
  Beaches: {screen: BeachesScreen},
  Groups: {screen: GroupsScreen},
  Pools: {screen: PoolsScreen},
  Restaurants: {screen: RestaurantsScreen},
  Zone: {screen: ZoneScreen},
  Networks: {screen: NetworksScreen},
  Book: {screen: BookScreen},
  Experiences: {screen: ExperiencesScreen},
  Contact: {screen: ContactScreen},
  Rooms: {screen: RoomsScreen},
  Activities: {screen: ActivitiesScreen},
  SignIn: {screen: SignInScreen},
  CreateExperience: {screen: CreateExperienceScreen}
})

export default App
