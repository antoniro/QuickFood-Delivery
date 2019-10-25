import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import RestaurantCard from "../components/RestaurantCard";
import Restaurants from "../components/Restaurants";
import { white } from "ansi-colors";

import {restaurants} from "../Data"
//import RestaurantCardList from '../components/RestaurantCardList'

export default class RestaurantScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Restaurants"
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: "rgb(240, 240, 240)" }}>
        <View style={{ backgroundColor: "white", marginTop: 10}}>
          <View>
            <Text style={{ fontSize: 20, marginTop: 20, marginHorizontal: 20 }}>
              Top Restaurants Picks
            </Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Restaurants restaurants={restaurants}/>
              <RestaurantCard />
              <RestaurantCard />
              <RestaurantCard />
              <RestaurantCard />
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
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </View>
        </View>
      </ScrollView>
    );
  }
}
