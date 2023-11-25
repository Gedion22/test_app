import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TUser} from '../../../app/API';
import {COMMON_STYLES} from '../../../styles';
import {ImagePlaceholder} from './ImagePlaceholder/ImagePlaceholder';
import {Navigation} from 'react-native-navigation';
import {HOME_COMPONENT_ID} from '../../../app/constants';

interface IProps {
    item: TUser;
    onRemove?: (id: number) => void;
    onClick?: (id: number) => void;
}

export function UserItem(props: IProps) {
    const {item, onRemove, onClick} = props;
    const {avatar, name, id, age, like} = item;

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);
    const handleClick = useCallback(() => onClick?.(item.id), [item, onClick]);
    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderHeart = useCallback(
        () => (
            <View style={styles.heartContainer}>
                {like ? <Image style={styles.heart} source={require('../../../assets/heart_red.png')} /> : null}
            </View>
        ),
        [like],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.removeIconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                {renderImage()}
                {renderHeart()}
                {renderDescription()}
                {renderRemoveButton()}
            </View>
        );
    }, [renderDescription, renderImage, renderRemoveButton, renderHeart]);

    const renderContainer = useCallback(() => {
        return (
            <TouchableOpacity
                onPress={() => {
                    handleClick();
                    Navigation.push(HOME_COMPONENT_ID, {
                        component: {
                            name: 'User',
                        },
                    });
                }}
                style={styles.container}>
                {renderBody()}
            </TouchableOpacity>
        );
    }, [handleClick, renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    heartContainer: {
        ...COMMON_STYLES.ml_1,
        height: 20,
        width: 20,
    },
    heart: {
        height: '100%',
        width: '100%',
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    removeIcon: {
        fontSize: 24,
    },
    removeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
