import React from 'react';
import { CardItem, Body, Text } from "native-base";

const planetDetailsCardItem = props => (
  <CardItem bordered>
    <Body>
      <Text> Name: {props.data.name} </Text>
      <Text> Rotation period: {props.data.rotation_period} </Text>
      <Text> Orbital period: {props.data.orbital_period} </Text>
      <Text> Diameter: {props.data.diameter} </Text>
      <Text> Climate: {props.data.climate} </Text>
      <Text> Gravity: {props.data.gravity} </Text>
      <Text> Terrain: {props.data.terrain} </Text>
      <Text> Surface Water: {props.data.surface_water} </Text>
      <Text> Population: {props.data.population} </Text>
    </Body>
  </CardItem>
);

export default planetDetailsCardItem;
