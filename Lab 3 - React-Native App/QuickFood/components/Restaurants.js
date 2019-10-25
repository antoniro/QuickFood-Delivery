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
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RestaurantCard from "../components/RestaurantCard";

class Restaurants extends React.Component {

    renderRestaurants = (restaurants) => {
        //console.log(restaurants);
        return restaurants.map((item, index) => {
            return (
                <RestaurantCard key={index} restaurantItem={item}/>
            )
        })
    }



    render() {
        return (
            <View>
                {this.renderRestaurants(this.props.restaurants)}
            </View>
        );
    }
}
export default Restaurants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});