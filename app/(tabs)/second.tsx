import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SetStateAction, useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function Second() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const router = useRouter();

  const isFormComplete = height.trim() !== '' && weight.trim() !== '' && skinTone !== '';

  const skinTones = [
    { label: 'Select your skin tone...', value: '' },
    { label: 'Very Fair (Porcelain)', value: 'very_fair' },
    { label: 'Fair (Ivory)', value: 'fair' },
    { label: 'Light (Beige)', value: 'light' },
    { label: 'Light Medium (Sand)', value: 'light_medium' },
    { label: 'Medium (Honey)', value: 'medium' },
    { label: 'Medium Tan (Caramel)', value: 'medium_tan' },
    { label: 'Tan (Bronze)', value: 'tan' },
    { label: 'Deep (Espresso)', value: 'deep' },
    { label: 'Very Deep (Ebony)', value: 'very_deep' },
  ];

  const handleContinue = () => {
    router.push({
      pathname: '/third',
      params: { height, weight, skinTone }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Height in centimeters"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Text style={styles.unit}>cm</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Weight in kilograms"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={styles.unit}>kg</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Skin Tone</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={skinTone}
            onValueChange={(itemValue: SetStateAction<string>) => setSkinTone(itemValue)}
            style={styles.picker}
          >
            {skinTones.map((tone, index) => (
              <Picker.Item 
                key={index} 
                label={tone.label} 
                value={tone.value}
                color={tone.value === '' ? '#999' : '#000'}
              />
            ))}
          </Picker>
        </View>
      </View>
      
      {!isFormComplete ? (
        <View style={[styles.button, styles.buttonDisabled]}>
          <Text style={[styles.buttonText, styles.buttonTextDisabled]}>
            Continue
          </Text>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },
  unit: {
    fontSize: 18,
    marginLeft: 10,
    color: '#666',
    fontWeight: '600',
  },
  pickerContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#888',
  },
});