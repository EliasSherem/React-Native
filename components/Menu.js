import * as React from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function PantallaContactos({navigation})
{

return(
  <View style={styles.container}>
  <Text style={{  color:'black',  textAlign:'center' , fontSize: 40, textDecorationLine: 'underline'}}>Menu{'\n'}</Text>
  <Button 
  title="Agregar Cliente" 
  onPress ={ () => navigation.navigate('Addcliente')}
  />
  <Button 
  title="Agregar Equipo" 
  onPress ={ () => navigation.navigate('Addequipo')}
  />
  <Button 
  title="Agregar Inspeccion" 
  onPress ={ () => navigation.navigate('Addinspeccion')}
  />
  <Button 
  title="Agregar Lote" 
  onPress ={ () => navigation.navigate('Addlote')}
  />

  <Button 
  title="Agregar Certificado" 
  onPress ={ () => navigation.navigate('Add_certificado')}
  />
  <Button 
  title="Cerrar Sesion" 
  onPress ={ () => navigation.navigate('Login')}
  />
  </View>);
  }
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
    paddingBottom: 22
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})