import React from 'react';
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const StyledText = incomingProps => {
    const { style, size, bold, ...props } = incomingProps;
    // Size
    let fontSize = 12;
    switch (size) {
        case 'small':
            fontSize = 10;
            break;
        case 'body':
            fontSize = 12;
            break;
        case 'upperbody' :
            fontSize = 14;
            break;
        case 'subheader':
            fontSize = 16;
            break;
        case 'header':
            fontSize = 20;
            break;
        case 'headline' :
            fontSize = 23;
            break;
        case 'extra-large':
            fontSize = 32;
            break;
    }
    // Font
    //const fontFamily = bold ? 'open-sans-bold': 'open-sans-regular';
    const propStyles = {
        fontSize: style.fontSize || fontSize
    };
    return (
        <Text
            {...props}
            style={[style, propStyles ]}
        />
    );
};

StyledText.defaultProps = {
    size: 'body',
    style: {},
};

StyledText.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    size: PropTypes.oneOf(['small', 'body', 'upperbody', 'subheader', 'header', 'headline', 'extra-large']),
};

export default StyledText;