import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = props => (
    <View style={styles.LoaderContainer}>
        <ActivityIndicator size="large" color="white" animating="true"/>
    </View>
);

const styles = StyleSheet.create({
    LoaderContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        color:'white',
    }
});

export default Loader;