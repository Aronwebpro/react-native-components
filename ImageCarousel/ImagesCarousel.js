import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    StyleSheet,
    View,
    ScrollView, Dimensions
} from 'react-native';
import {Image} from 'react-native-expo-image-cache';
//Constants
import {API_URI} from '../constants/API_CONSTANTS';
//Components

const imgWidth = Dimensions.get('window').width;
const imgHeight = imgWidth * 0.5625;

class ImagesCarousel extends React.PureComponent {
    state = {
        activeIndex: 0
    };

    render() {
        const images = this.props.images.map((img) => API_URI + '/' + img);
        return (
            <View style={styles.container}>
                <FlatList
                    ref={ref => this.list = ref}
                    style={styles.container}
                    horizontal={true}
                    data={images}
                    pagingEnabled
                    renderItem={({item}) => (
                        <View>
                            <View style={styles.imageWrapper}>
                                <Image
                                    uri={item}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, key) => item + key}
                    getItemLayout={(data, index) => {
                        return {
                            length: imgWidth,
                            offset: imgWidth * index,
                            index
                        }
                    }}
                />
            </View>
        )
    }

    componentDidMount() {
        if ( this.props.images.length > 1 ) {
            setInterval(() => {
                if (this.list && this.list.scrollToIndex !== undefined) {
                    const nextIndex = (this.state.activeIndex + 1) % this.props.featuredItems.length;
                    this.list.scrollToIndex({index: nextIndex});
                    this.setState({activeIndex: nextIndex});
                }
            }, 5000)
        }
    }

};

ImagesCarousel.propTypes = {
    images: PropTypes.array.isRequired,
};

export default ImagesCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    imageWrapper: {
        width: imgWidth,
        height: imgHeight,
    },
});