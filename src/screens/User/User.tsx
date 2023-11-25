import {Provider} from 'react-redux';
import {store} from '../../app/store';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import UserCard from './components/UserCard';

const User = () => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UserCard />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default User;
