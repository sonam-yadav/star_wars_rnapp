import React from 'react';
import { View } from 'react-native';
import { CardItem, Text } from "native-base";

import ImageCardItem from './ImageCardItem';
import PlanetDetailsCardItem from './PlanetDetailsCardItem';
import PersonDetailsCardItem from './PersonDetailsCardItem';

const detailsCardItem = props => {
  let cardItemBodyContent = null;
  if (props.cardItemContentType === 'planet') {
    cardItemBodyContent = (
      <View>
        <ImageCardItem />
        <PlanetDetailsCardItem data={props.cardItemContent} />
      </View>
    );
  } else if (props.cardItemContentType === 'person') {
    cardItemBodyContent = (
      props.cardItemContent.map((item, index) => {
        return (<PersonDetailsCardItem key={index} data={item} />);
      })
    );
  }

  return (
    <View>
        {props.cardItemContentType === 'planet' && <CardItem header bordered>
            <Text style={{color:'grey'}} onPress={props.goBack}>{"< go back"}</Text>
        </CardItem>}
      <CardItem header bordered>
        <Text >{props.cardItemHeaderText}</Text>
      </CardItem>

      {cardItemBodyContent}
    </View>
  );
};


export default detailsCardItem;
