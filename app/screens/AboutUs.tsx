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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>हमारे बारे में</Text>
        <View />
      </View>

      {/* Details */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          2011 में स्थापित, बंसल न्यूज़ मध्य प्रदेश और छत्तीसगढ़ के प्रमुख
          क्षेत्रीय सैटेलाइट न्यूज़ चैनल है, जो मध्य प्रदेश और छत्तीसगढ़ की
          प्रमुख स्थानीय समाचारों की पेशेवर दृष्टि से प्रसारण करता है।
        </Text>

        <Text style={styles.paragraph}>
          इसमें तीन समाचार स्टूडियो हैं जिन्हें ब्वॉपाल, इंदौर और रायपुर में
          रणनीतिक रूप से स्थित किया गया है, ये मप्र और छत्तीसगढ़ के तीन प्रमुख
          शहर हैं जो दो राज्यों के हायपर-एक्टिव और ज्यादा पहुंचने वाले शहर हैं।
          200 से ज्यादा समाचार स्ट्रिंगर के साथ, बंसल न्यूज़ को प्रमुखता से
          सार्वजनिक महत्व की हर गतिविधि की कवर करने का काम किया जाता है।
        </Text>

        <Text style={styles.paragraph}>
          बंसल न्यूज़ स्थानीय केबल नेटवर्क और प्रमुख डीटीएच सेवा प्रदाताओं पर
          उपलब्ध है, जैसे कि टाटा स्काई (1162), एयरटेल डिजिटल टीवी (365), हथवे
          मध्य प्रदेश (223), डेन नेटवर्क - 354, ईएमटी - 216, एसीएन (मध्य प्रदेश)
          - 216, डिजिआना - 347, नेक्स्ट डिजिटल - 818, बीसीसी नेटवर्क - 345,
          ग्रैंड एसीएन (छत्तीसगढ़) - 164, ग्रैंड छत्तीसगढ़ - 333, हथवे
          (छत्तीसगढ़) - 220।
        </Text>

        <Text style={styles.paragraph}>
          दर्शकों की संख्या: 25+ लाख दर्शकों की विश्वासपूर्णता के साथ भारत भर
          में दृढ़ता से खड़ा है। हम मध्य प्रदेश और छत्तीसगढ़ के सबसे तेज़ और
          सर्वविश्वसनीय न्यूज़ चैनल हैं।
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
