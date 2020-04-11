import * as React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductsList from '../componentes/ProductsList';
import {Icon} from 'react-native-elements';

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

function LogoutComponent() {
  return (
    <View style={{marginRight: 10}}>
      <TouchableHighlight onPress={() => logout}>
        <Icon name="exit-run" type="material-community" color="#517fa4" />
      </TouchableHighlight>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.clientNavigation.setOptions({
      headerRight: () => <LogoutComponent />,
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
