import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UpdateUser from "../screens/UpdateUser";
import ConfigMenu from "../screens/ConfigMenu";
import colors from "../config/colors";

const ConfigStack = createStackNavigator();

const ConfigRoutes: React.FC = () => {
  return (
    <ConfigStack.Navigator initialRouteName="configMenu">
      <ConfigStack.Screen
        name="configMenu"
        component={ConfigMenu}
        options={{
          headerShown: false,
        }}
      />
    </ConfigStack.Navigator>
  );
};

export default ConfigRoutes;
