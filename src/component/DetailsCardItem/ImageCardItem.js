import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CardItem } from "native-base";

import backgroundImage from '../../../assets/free-star-war.jpg';

const imageCardItem = props => {
  const randomImages = [];

  return (
    <CardItem cardBody>
      <Image
        style={styles.image}
        source={backgroundImage}
      />
    </CardItem>
  )
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: null
  }
});

export default imageCardItem;
