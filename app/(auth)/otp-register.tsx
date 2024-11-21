import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const OtpRegister = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // State for OTP input
  const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility

  // Handle OTP Input
  

  // Function to verify OTP
  const verifyOtp = () => {
    console.log('Entered OTP:', otp.join(''));
    // Add your OTP verification logic here
  };

  return (
    <View style={styles.container}>
      <Modal visible={true} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.headerText}>OTP Verification</Text>
            <Text style={styles.infoText}>
              Enter the OTP sent to <Text style={styles.bold}>+234 706 067 2335</Text>
            </Text>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                 
                />
              ))}
            </View>

            <TouchableOpacity>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>

            {/* Verify Button */}
            <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  resendText: {
    color: '#007bff',
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OtpRegister;