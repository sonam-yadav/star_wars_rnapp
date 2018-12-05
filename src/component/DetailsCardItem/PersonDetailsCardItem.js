import React from 'react';
import { CardItem, Body, Text } from "native-base";

const personDetailsCardItem = props => (
  <CardItem bordered>
    <Body>
      <Text> Name: {props.data.name} </Text>
      <Text> Height: {props.data.height} </Text>
      <Text> Mass: {props.data.mass} </Text>
      <Text> Hair Color: {props.data.hair_color} </Text>
      <Text> Skin Color: {props.data.skin_color} </Text>
      <Text> Eye Color: {props.data.eye_color} </Text>
      <Text> Birth Year: {props.data.birth_year} </Text>
      <Text> Gender: {props.data.gender} </Text>
    </Body>
  </CardItem>
);

export default personDetailsCardItem;
