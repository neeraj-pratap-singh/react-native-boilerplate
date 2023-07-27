import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
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
      {/* Header */}
      <View style={styles.header}>
        {/* Back arrow icon (assuming you have a component for the back button) */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        {/* Empty view to align the title in the center */}
        <View />
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.title}>Address:</Text>
        <Text style={styles.paragraph}>Madhya Pradesh (Bhopal)</Text>
        <Text style={styles.paragraph}>
          E-3 / 67, Arera Colony, Bhopal, Madhya Pradesh 462016
        </Text>

        <Text style={styles.subTitle}>Chhattisgarh (Raipur)</Text>
        <Text style={styles.paragraph}>
          14, Cristal Arcade, Lodhi Para Chowk, Shankar Nagar Road, Raipur
          (Chhattisgarh)
        </Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.title}>Contact:</Text>
        <TouchableOpacity onPress={() => handleCall('+917556747000')}>
          <Text style={styles.paragraph}>+91-755-6747000 to 99</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEmail('bansal@gmail.com')}>
          <Text style={styles.paragraph}>Email: bansal@gmail.com</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Person */}
      <View style={styles.section}>
        <Text style={styles.title}>Contact Person:</Text>
        <Text style={styles.paragraph}>Sharad Dwivedi</Text>
        <Text style={styles.paragraph}>Editor in Chief</Text>
        <TouchableOpacity onPress={() => handleEmail('sharadneel@gmail.com')}>
          <Text style={styles.paragraph}>E-Mail: sharadneel@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEmail('sharad.dwivedi@bansalnews.com')}>
          <Text style={styles.paragraph}>sharad.dwivedi@bansalnews.com</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Contacts */}
      <View style={styles.section}>
        <Text style={styles.title}>Additional Contacts:</Text>
        <Text style={styles.paragraph}>
          Ashish Mahendru (For Advertisement Only)
        </Text>
        <Text style={styles.paragraph}>Head Business – Corporate & State</Text>
        <TouchableOpacity
          onPress={() => handleEmail('ashish.mahendru@bansalnews.org')}>
          <Text style={styles.paragraph}>
            E-Mail – ashish.mahendru@bansalnews.org
          </Text>
        </TouchableOpacity>

        <Text>Ashok Sitoke (For Govt. Advertisement Only)</Text>
        <Text>Govt. Advertisement Sales, Accounts and Administration Head</Text>
        <TouchableOpacity
          onPress={() => handleEmail('bansalnewsmarketing@gmail.com')}>
          <Text style={styles.paragraph}>
            E-Mail – bansalnewsmarketing@gmail.com
          </Text>
        </TouchableOpacity>
      </View>

      {/* Website */}
      <View style={styles.section}>
        <Text style={styles.title}>Website:</Text>
        <TouchableOpacity
          onPress={() => handleWebsite('https://www.bansalnews.com')}>
          <Text style={styles.paragraph}>www.bansalnews.com</Text>
        </TouchableOpacity>
      </View>
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
