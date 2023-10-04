import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Your name is too short!')
    .max(50, 'Your name is too long!')
    .required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address!'),
  password: Yup.string()
    .min(5, 'Confirm password must be 8 characters long.')
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Your password must contain at least one uppercase, lowercase, number and a special character',
    ),
  confirmPass: Yup.string()
    .min(8)
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Confirm password is required'),
  mobile: Yup.string()
    .min(11, 'Must be exact 11 digits')
    .max(11, 'Must be exact 11 digits')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Mobile number is required'),
});

const App = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        mobile: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}>
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isValid,
        setFieldTouched,
        touched,
      }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Full Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Email Address"
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorTxt}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                autoCapitalize="none"
                onBlur={() => setFieldTouched('confirmPass')}
                value={values.confirmPass}
                onChangeText={handleChange('confirmPass')}
              />
              {touched.confirmPass && errors.confirmPass && (
                <Text style={styles.errorTxt}>{errors.confirmPass}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Mobile No."
                keyboardType="phone-pad"
                onBlur={() => setFieldTouched('mobile')}
                value={values.mobile}
                onChangeText={handleChange('mobile')}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? '#395B64' : '#A5C9CA'},
              ]}
              disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#FF0d10',
  },
  submitBtn: {
    // backgroundColor: ,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
