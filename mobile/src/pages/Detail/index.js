import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail() {

  const navigation = useNavigation();
  const route = useRoute();
  const art = route.params.art;
  const message = `Hello ${art.name}, I'm contacting because I would like to buy "${art.title}" in a value of US$ ${art.value},00`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Buying the art ${art.title}`,
      recipients: [art.email],
      body: message
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${art.sendWhatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Image source={logoImg} />
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={navigateBack}
              >
                <Feather name="arrow-left" size={28} color="#E02041" />
              </TouchableOpacity>
      </View>

      <View style={styles.art}>
        <Text style={[styles.artProperty, {marginTop: 0}]}>Artist:</Text>
  <Text style={styles.artValue}>{art.name} from {art.city}/{art.uf}</Text>

        <Text style={styles.artProperty}>Artwork:</Text>
        <Text style={styles.artValue}>{art.title}</Text>

        <Text style={styles.artProperty}>Description:</Text>
        <Text style={styles.artValue}>{art.description}</Text>

        <Text style={styles.artProperty}>Value:</Text>
        <Text style={styles.artValue}>
          {"US$ "+ art.value+ ",00"}
        </Text>
      </View>

      <View style={styles.contactBox}>
          <Text style={styles.artTitle}>Are you interested?</Text>
          <Text style={styles.artTitle}>Buy the artwork and help the artist.</Text>
          <Text style={styles.artDescription}>Keep Contact.</Text>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.action}
              onPress={sendWhatsapp}
            >
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.action}
              onPress={sendMail}
            >
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>



    </View>
  );
}