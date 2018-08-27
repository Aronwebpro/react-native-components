import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Platform
} from 'react-native';
import Colors from '../constants/Colors';
import StyledText from './StyledText';
import TimePicker from './TimePicker';
import moment from 'moment';

class CustomModal extends React.PureComponent {
    state = {
        backgroundColor: {},
        hours: '8',
        mins: '00',
        part: 'am',
    };

    render() {
        const {
            modalVisible,
            closeModal,
        } = this.props;
        return (
            <View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalBackground}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <View style={styles.buttonsWrapper}>
                            <View style={styles.borderBottom}>
                                <View style={styles.modalLinkRow}>
                                    <StyledText
                                        size='header'
                                        style={styles.titleText}
                                    >
                                        Pick a Time
                                    </StyledText>
                                </View>
                            </View>
                            <View style={styles.bodyContainer}>
                                <TimePicker
                                    hours={this.state.hours}
                                    mins={this.state.mins}
                                    part={this.state.part}
                                    handleHoursChange={this.handleHoursChange}
                                    handleMinsChange={this.handleMinsChange}
                                    handlePartChange={this.handlePartChange}
                                />
                            </View>
                            <View style={styles.borderTop}>
                                <TouchableOpacity
                                    style={styles.modalLinkRow}
                                    onPress={this.handleTimeConfirm}
                                    hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                                >
                                    <StyledText
                                        size='header'
                                        style={styles.confirmText}
                                    >
                                        Confirm
                                    </StyledText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalLinkRowCancel}>
                            <TouchableOpacity
                                onPress={closeModal}
                                hitSlop={{top: 10, left: 5, bottom: 10, right: 5}}
                                style={styles.modalCancelButton}
                            >
                                <StyledText style={styles.cancelStyle} size='header'>
                                    Cancel
                                </StyledText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    setTimeNow = () => {
        const time = moment();
        this.setState({hours: time.format('h'), mins: time.format('m'), part: time.format('a').toUpperCase()});
    };

    componentDidMount() {
        this.setTimeNow()
    };

    componentDidUpdate(prevProps) {
        if (prevProps.modalVisible === false && this.props.modalVisible === true) {
            this.setTimeNow()
        }
    };

    handleHoursChange = (hours) => this.setState({hours});

    handleMinsChange = (mins) => this.setState({mins});

    handlePartChange = (part) => this.setState({part});

    handleTimeConfirm = () => {
        const {hours, mins, part} = this.state;
        this.props.handleConfirm({hours, mins, part});
    }
};

export default CustomModal;

CustomModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    cancelStyle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ]),
    handleConfirm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    modalBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        marginBottom: 10,
    },
    buttonsWrapper: {
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    modalLinkRow: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,.1)',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.1)',
    },
    confirmText: {
        color: Colors.primary,
    },
    modalLinkRowCancel: {
        display: 'flex',
        paddingVertical: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    titleText: {
        color: Colors.contentGrey,
    },
    bodyContainer: {
        height: Platform.OS === 'ios' ? 200 : 50,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
    },
    cancelStyle: {
        color: '#D8283C'
    },
    modalCancelButton: {
        width: '100%',
        alignItems: 'center',
    },
});