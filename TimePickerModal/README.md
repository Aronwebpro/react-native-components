## Pick Up Time Modal for React Native 

This is simple solution if you need Modal to Pick Time and have Native UI look. This is for iOS only, because Android has React Native Component TimePickerAndroid to pick time. 

## Demo iOS:

<div style="text-align:center"><img src="https://github.com/Aronwebpro/react-native-toolkit/blob/master/TimePickerModal/timePickerSample.gif" alt="Time Picker Demo" width="300px" height="auto"></div>

## TimePicker Component
I like to use Pure Component instead of functional component because it has integrated componentShallUpdate functionality insite it, and prevent it from extra rendering. 

As Pick Tool React Native Picker components is used and with the right styling I was able to line up in one nice row. 

```js
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Picker,
    StyleSheet,
} from 'react-native';

//Default Options for Time Picker
const hoursList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const minsList = Array.apply(null, {length: 60}).map((min, index) => index < 10 ? `0${index }` : `${index}`);
const partList = ['AM', 'PM'];

export default class TimePicker extends React.PureComponent {
    render() {
        const {
            hours,
            mins,
            part,
            handleHoursChange,
            handleMinsChange,
            handlePartChange
        } = this.props;
        return (
            <View styles={styles.container}>
                <Picker
                    selectedValue={hours}
                    style={styles.hours}
                    onValueChange={handleHoursChange}
                    prompt={'Hours'}
                    mode={'dialog'}
                >
                    {
                        hoursList.map((hour, index) => (
                            <Picker.Item label={hour} value={hour} key={'hours' + index}/>
                        ))
                    }
                </Picker>
                <Picker
                    selectedValue={mins}
                    style={styles.mins}
                    onValueChange={handleMinsChange}
                    prompt={'Mins'}
                    mode={'dialog'}
                >
                    {
                        minsList.map((min, index) => (
                            <Picker.Item label={min} value={min} key={'mins' + index}/>
                        ))
                    }
                </Picker>
                <Picker
                    selectedValue={part}
                    style={styles.part}
                    onValueChange={handlePartChange}
                    mode={'dialog'}
                >
                    {
                        partList.map((part, index) => (
                            <Picker.Item label={part} value={part} key={'parts' + index}/>
                        ))
                    }
                </Picker>
            </View>
        )
    }

}

TimePicker.propTypes = {
    hours: PropTypes.string.isRequired,
    mins: PropTypes.string.isRequired,
    part: PropTypes.string.isRequired,
    handleHoursChange: PropTypes.func.isRequired,
    handleMinsChange: PropTypes.func.isRequired,
    handlePartChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    column: {
        flexDirection: 'row',
    },
    hours: {
        height: 50,
        position: 'absolute',
        top: -20,
        width: 100 / 3 + '%',
    },
    mins: {
        height: 50,
        position: 'absolute',
        top: -20,
        left: 100 / 3 + '%',
        width: 100 / 3 + '%'
    },
    part: {
        height: 50,
        position: 'absolute',
        top: -20,
        left: 100 / 3 * 2 + '%',
        width: 100 / 3 + '%'
    },
});
```
