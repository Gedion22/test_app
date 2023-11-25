import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COMMON_STYLES} from '../../../styles';

interface Props {
    isLiked: boolean;
    onClick: () => void;
}

const LikeButton = ({isLiked, onClick}: Props) => {
    return (
        <TouchableOpacity style={styles.imageContainer} onPress={onClick}>
            <Image
                style={styles.image}
                source={isLiked ? require('../../../assets/heart_red.png') : require('../../../assets/heart_black.png')}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 40,
        width: 40,
        bottom: 25,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        opacity: 0.8,
    },
});

export default LikeButton;
