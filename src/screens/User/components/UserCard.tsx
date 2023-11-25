import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useCurrentUser} from '../../../app/hooks';
import React, {useCallback} from 'react';
import {ImagePlaceholder} from '../../Home/components/ImagePlaceholder/ImagePlaceholder';
import {COMMON_STYLES} from '../../../styles';
import LikeButton from './LikeButton';
import {toggleLikeUser} from '../../../app/actions/users';

const UserCard = () => {
    const dispatch = useAppDispatch();
    const currentUser = useCurrentUser();

    const handleLikeUser = useCallback(() => {
        dispatch(toggleLikeUser());
    }, [dispatch]);

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {currentUser?.id}</Text>
                <Text>Name: {currentUser?.name}</Text>
                <Text>Age: {currentUser?.age}</Text>
            </View>
        ),
        [currentUser?.age, currentUser?.id, currentUser?.name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {currentUser?.avatar ? (
                    <Image style={styles.image} source={{uri: currentUser?.avatar}} />
                ) : (
                    <ImagePlaceholder />
                )}
                <LikeButton isLiked={!!currentUser?.like} onClick={handleLikeUser} />
            </View>
        ),
        [currentUser?.avatar, currentUser?.like, handleLikeUser],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                {renderImage()}
                {renderDescription()}
            </View>
        );
    }, [renderDescription, renderImage]);

    return <View style={styles.root}>{renderBody()}</View>;
};

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
});

export default UserCard;
