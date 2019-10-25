import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import CartIcon from "./components/CartIcon";

import Icon from "react-native-vector-icons/Ionicons";

import store from "./store";

class App extends React.Component {
  state = {
    isFontLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      Lobster: require("./assets/fonts/Lobster.ttf")
    });
    this.setState({ isFontLoaded: true });
  }
  render() {
    return (
      <Provider store={store}>
        {this.state.isFontLoaded ? (
          <NavContainer />
        ) : null}
      </Provider>
    );
  }
}

const HomeTab = createStackNavigator(
  {
    Home: HomeScreen,
    Restaurant: RestaurantScreen,
    Menu: MenuScreen,
    Cart: CartScreen,
    Checkout: CheckoutScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: "QuickFood",
      headerRight: <CartIcon />,
      headerTitleStyle: {
        fontFamily: 'Lobster'
      }
    }
  }
);

const SearchTab = createStackNavigator(
  {
    Search: SearchScreen,
    Restaurant: RestaurantScreen,
    Menu: MenuScreen,
    Cart: CartScreen,
    Checkout: CheckoutScreen
  },
  {
    defaultNavigationOptions: {
      defaultNavigationOptions: {
        headerTitle: "Search",
        headerRight: <CartIcon />
      }
    }
  }
);

const MainApp = createBottomTabNavigator(
  {
    Home: HomeTab,
    Search: SearchTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return (
            <Icon
              onPress={() => navigation.navigate("Home")}
              name="md-home"
              size={30}
              color={tintColor}
            />
          );
        } else {
          return (
            <Icon
              onPress={() => navigation.navigate("Search")}
              name="md-search"
              size={30}
              color={tintColor}
            />
          );
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#354fc4",
      inactiveTintColor: "#b8b8b8",
      showLabel: false
    }
  }
);

const NavContainer = createAppContainer(MainApp);

export default App;

//export default createAppContainer(MainApp);
