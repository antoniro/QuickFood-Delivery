import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import RestaurantCard from "../components/RestaurantCard";
import Restaurants from "../components/Restaurants";
import { white } from "ansi-colors";

import * as Font from "expo-font"

import {restaurants} from "../Data"
//import RestaurantCardList from '../components/RestaurantCardList'

export default class Homescreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Text style={{fontFamily: 'Lobster', paddingHorizontal:15, paddingTop:9, fontSize:26}}>QuickFood</Text>,
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: "rgb(240, 240, 240)" }}>
        <View style={{ backgroundColor: "white", marginTop: 10}}>
          <View>
            <Text style={{ fontSize: 20, marginTop: 20, marginHorizontal: 20}}>
              Top Restaurants Picks
            </Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <RestaurantCard restaurantItem={restaurants[5]}/>
              <RestaurantCard restaurantItem={restaurants[3]}/>
              <RestaurantCard restaurantItem={restaurants[10]}/>
              <RestaurantCard restaurantItem={restaurants[7]}/>
            </ScrollView>
          </View>
        </View>
        <View style={{ backgroundColor: "white", marginTop: 10 }}>
        <View>
          <Text style={{ fontSize: 20, marginTop: 20, marginHorizontal: 20 }}>
            Popular Near You
          </Text>
        </View>
        <View style={{ padding: 0, alignItems: "center" }}>
        <Restaurants restaurants={restaurants}/>
        </View>
        </View>
      </ScrollView>
    );
  }
}
