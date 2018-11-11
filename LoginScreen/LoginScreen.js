import React from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
    ScrollView,
    ActivityIndicator,
    Image,
    SafeAreaView,
    Text,
} from 'react-native';
//Expo
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons';


const photoURL = require('{LOGO URL}');


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        password: '',
        keyboardMargin: 0,
        loading: false,

    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardDismissMode={'on-drag'}
                    ref={(scrollView) => this.scrollView = scrollView}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Sign In
                        </Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.logoContainer}>
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={photoURL}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name={'ios-mail-outline'}
                                        size={26}
                                        color={Colors.primary}
                                        style={styles.icon}
                                    />
                                </View>
                                <TextInput
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                    keyboardType={'email-address'}
                                    placeholder={'Email'}
                                    placeholderTextColor={Colors.contentGrey}
                                    underlineColorAndroid={'transparent'}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name={'md-key'}
                                        size={26}
                                        color={Colors.primary}
                                        style={styles.icon}
                                    />
                                </View>
                                <TextInput
                                    value={this.state.password}
                                    secureTextEntry
                                    onChange={password => this.setState({ password })}
                                    placeholder={'Password'}
                                    placeholderTextColor={Colors.contentGrey}
                                    underlineColorAndroid={'transparent'}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                action={this.handleSubmit}
                                color={Colors.primary}
                                text={'Sign In'}
                            />
                        </View>
                    </View>
                </ScrollView>
                {this.state.loading === true && (
                    <View style={[styles.loadingContainer, {bottom: this.state.keyboardMargin}]}>
                        <ActivityIndicator
                            size="large"
                            color={Colors.contentLightGrey}
                        />
                    </View>
                )}
            </SafeAreaView>
        );
    }

    componentDidMount() {
        //Handle Keyboard
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    };

    //Move Input to Top on Keyboard events handlers
    keyboardDidShow = (e) => {
        if (this.scrollView && this.scrollView.scrollTo !== undefined) {
            this.scrollView.scrollTo({x: 0, y: 200, animated: true});
        }
    };
    keyboardDidHide = () => {
        if (this.scrollView && this.scrollView.scrollTo !== undefined) {
            this.scrollView.scrollTo({x: 0, y: 0, animated: true});
        }
    };

    handleSubmit = async () => {
        //Handle Login
    };



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    header: {
        marginTop: 50,
        alignItems: 'center',
    },
    headerText: {
        color: Colors.headerText,
    },
    contentContainer: {
        flex: 1,
        marginTop: 0,
        justifyContent: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    imageWrapper: {
        width: 300,
        height: 110,
    },
    formContainer: {
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 18,
        borderBottomColor: Colors.lightIconColor
    },
    iconContainer: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'column',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    loadingContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, .5)'
    }
});
