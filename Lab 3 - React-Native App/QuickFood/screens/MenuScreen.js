import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    Button
} from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MenuItems from "../components/MenuItems";

import {menuItems} from "../Data"

import {connect} from 'react-redux'

class MenuScreen extends React.Component {

   static navigationOptions = {
       headerTitle: 'Menu'
   }
   render() {
    const { navigation } = this.props;
    //console.log(this.props.navigation.state.params);
       //const restaurantImageSrc = navigation.getParam('imageSrc', '../assets/African.jpg')
       //console.log(restaurantImageSrc);
       const restaurantItem = navigation.state.params;
       return (
           <ScrollView>
               {/* <MenuItems menuItems={menuItems} restaurantImageSrc={restaurantImageSrc} onPress={this.props.addItemToCart} /> */}
               <MenuItems menuItems={menuItems} restaurantItem={restaurantItem} onPress={this.props.addItemToCart} />
           </ScrollView>
       );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       addItemToCart: (menuItem, restaurantItem) => {
           //console.log(restaurantItem, menuItem);
           const info = {item: menuItem, restaurant: restaurantItem};
           //console.log(info)
           dispatch({ type: 'ADD_TO_CART', payload: info })}
   }
}

export default connect(null, mapDispatchToProps)(MenuScreen);
