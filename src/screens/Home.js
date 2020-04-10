import * as React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductsList from '../componentes/ProductsList';

function HomeScreen({navigation}) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Prevent default behavior
      e.preventDefault();

      alert('Default behavior prevented');
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  console.log(navigation);

  return <ProductsList />;
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function TestScreen() {
  return (
    <View>
      <Button title="teste" />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.clientNavigation.setOptions({
      headerRight: () => <TestScreen />,
    });
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
