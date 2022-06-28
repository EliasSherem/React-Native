import * as react from 'react';
import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, TextInput, Dimensions, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Communications from 'react-native-communications';
import MapView from 'react-native-maps';


export default class Contacto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: '5552904141',
      emails: 'clientes@dominos.com',
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text>{'\n\n\n\n\n'}</Text>
        <Text style={{ color: 'red', fontSize: 50 }}>Teléfono</Text>
        <Text style={{ fontSize: 40, color: 'white' }}>5552904141</Text>
        <Text style={{ color: 'yellow', fontSize: 50 }}>Correo</Text>
        <Text style={{ fontSize: 35, color: 'white' }}>
          clientes@dominos.com
        </Text>

        <Button
          onPress={() => Communications.phonecall(this.state.telefono, true)}
          title="Llamar Ahora"
        />

        <Button
          onPress={() =>
            Communications.email(
              this.state.emails.split(','),
              null,
              null,
              'Bienvenido a Dominos',
              'Escribe tu mensaje aqui'
            )
          }
          title="Mandar Correo Electronico"
        />
      </View>
    );
  }
}