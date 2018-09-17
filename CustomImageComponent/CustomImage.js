import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';


export default class CustomImage extends React.PureComponent {
    render() {
        const {
            width,
            height,
            imgURL,
        } = this.props;
        return (
            <View style={styles.imageContainer}>
                <View style={{width, height}}>
                    <Image
                        source={imgURL}
                        style={styles.image}
                    />
                </View>
            </View>
        )
    }
}

CustomImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    imgURL: PropTypes.number.isRequired,
};

CustomImage.defaultProps = {
    width: 100,
    height: 100,
};

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
});