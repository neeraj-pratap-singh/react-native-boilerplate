import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ContactUsProps {
  // Define any props specific to this screen component
}

const ContactUs: React.FC<ContactUsProps> = () => {
  const navigation = useNavigation();

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (emailAddress: string) => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>हमसे संपर्क करें</Text>
        <View />
      </View>
      <ScrollView>
        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.title}>पता:</Text>
          <Text style={styles.paragraph}>मध्य प्रदेश (भोपाल)</Text>
          <Text style={styles.paragraph}>
            ई-3 / 67, अरेरा कालोनी, भोपाल, मध्य प्रदेश 462016
          </Text>

          <Text style={styles.subTitle}>छत्तीसगढ़ (रायपुर)</Text>
          <Text style={styles.paragraph}>
            14, क्रिस्टल आर्केड, लोधी पारा चौक, शंकर नगर रोड, रायपुर (छत्तीसगढ़)
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.title}>संपर्क:</Text>
          <TouchableOpacity onPress={() => handleCall('+917556747000')}>
            <Text style={styles.paragraph}>+91-755-6747000 से 99 तक</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEmail('bansal@gmail.com')}>
            <Text style={styles.paragraph}>ईमेल: bansal@gmail.com</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Person */}
        <View style={styles.section}>
          <Text style={styles.title}>संपर्क व्यक्ति:</Text>
          <Text style={styles.paragraph}>शरद द्विवेदी</Text>
          <Text style={styles.paragraph}>संपादक मुख्य</Text>
          <TouchableOpacity onPress={() => handleEmail('sharadneel@gmail.com')}>
            <Text style={styles.paragraph}>ईमेल: sharadneel@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEmail('sharad.dwivedi@bansalnews.com')}>
            <Text style={styles.paragraph}>sharad.dwivedi@bansalnews.com</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Contacts */}
        <View style={styles.section}>
          <Text style={styles.title}>अतिरिक्त संपर्क:</Text>
          <Text style={styles.paragraph}>
            आशीष महेंद्रू (केवल विज्ञापन के लिए)
          </Text>
          <Text style={styles.paragraph}>हेड बिजनेस - कॉर्पोरेट और राज्य</Text>
          <TouchableOpacity
            onPress={() => handleEmail('ashish.mahendru@bansalnews.org')}>
            <Text style={styles.paragraph}>
              ईमेल - ashish.mahendru@bansalnews.org
            </Text>
          </TouchableOpacity>

          <Text style={styles.paragraph}>
            अशोक सितोके (केवल सरकारी विज्ञापन के लिए)
          </Text>
          <Text style={styles.paragraph}>
            सरकारी विज्ञापन बिक्री, लेखा और प्रशासन प्रमुख
          </Text>
          <TouchableOpacity
            onPress={() => handleEmail('bansalnewsmarketing@gmail.com')}>
            <Text style={styles.paragraph}>
              ईमेल - bansalnewsmarketing@gmail.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* Website */}
        <View style={styles.section}>
          <Text style={styles.title}>वेबसाइट:</Text>
          <TouchableOpacity
            onPress={() => handleWebsite('https://www.bansalnews.com')}>
            <Text style={styles.paragraph}>www.bansalnews.com</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
});

export default ContactUs;
