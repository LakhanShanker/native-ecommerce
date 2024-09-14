import { Provider } from 'react-redux';
import StackNavigator from './navigation/StackNavigator';
import store from './store'
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext'
export default function App() {
  return (
   <>
   <Provider store={store}>
    <UserContext>
   <StackNavigator/>
   <ModalPortal/>
   </UserContext>
   </Provider>
   </>
  );
}
