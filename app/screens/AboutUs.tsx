import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AboutUsProps {
  // Define any props specific to this screen component
}

const AboutUs: React.FC<AboutUsProps> = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>About Us</Text>
        {/* Empty view to align the title in the center */}
        <View />
      </View>

      {/* Details */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Established in 2011, BANSAL NEWS is a leading regional satellite news
          channel of Madhya Pradesh & Chhattisgarh.
        </Text>

        <Text style={styles.paragraph}>
          It has 3 news studios strategically located in Bhopal, Indore, and
          Raipur, these being the three prominent cities of MP & Chhattisgarh
          are much more accessible and hyper-active cities of the two states.
          With a force of over 200 news stringers, Bansal News is earmarked to
          cover each activity of public significance with utmost sincerity.
        </Text>

        <Text style={styles.paragraph}>
          Bansal news is available on local cable networks and major DTH service
          providers namely Tata Sky (1162), Airtel Digital TV (365), Hathway MP
          (223), Den Network – 354, EMT – 216, ACN (MP) – 216, Digiana – 347,
          Nxt Digital-818, BCC Network – 345, Grand ACN (CG) – 164, Grand CG –
          333, Hathway (CG) - 220.
        </Text>

        <Text style={styles.paragraph}>
          Viewership: Standing strongly with the trust of 25+ lakhs viewers PAN
          India. We are the fastest and most trusted news channel of MP and CG.
        </Text>
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
  paragraph: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
});

export default AboutUs;
