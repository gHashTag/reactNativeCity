import { createStackNavigator, createAppContainer } from 'react-navigation'
import { HomeScreen, AccountKit } from './screens'

const AppNavigator = createStackNavigator(
  {
    ACCOUNT_KIT: AccountKit,
    HOME: HomeScreen
  },
  {
    initialRouteName: 'ACCOUNT_KIT',
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)
