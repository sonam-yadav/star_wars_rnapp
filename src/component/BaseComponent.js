import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Container } from 'native-base';

import backgroundImage from '../../assets/star_war_1.jpg';

const baseComponent = props => (
    <Container>
        <ImageBackground style={styles.imageBackground} source={props.imageBackgroundSource ? props.imageBackgroundSource : backgroundImage}>
            {props.children}
        </ImageBackground>
    </Container>
);

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%'
    }
});

export default baseComponent;