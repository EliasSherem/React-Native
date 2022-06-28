import * as react from 'react';
import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, TextInput, Dimensions, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { createStackNavigator } from '@react-navigation/stack';
import MapView from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
//@

import Addcliente from './components/Addcliente';
import ClienteScreen from './components/ClienteScreen';
import Cliente_Detallado from './components/Cliente_Detallado.js';

import Addequipo from './components/Addequipo';
import Verequipos from './components/Verequipos';
import Equipo_Detallado from './components/Equipo_Detallado.js';

import Addinspeccion from './components/Addinspeccion.js';

import Contacto from './components/Contacto';

import Verinspecciones from './components/Verinspecciones';
import InspeccionDetallada from './components/InspeccionDetallada';
import Addlote from './components/Addlote';
import Verlote from './components/Verlote';
import Lote_Detallado from './components/Lote_Detallado';

import Add_lote_inspeccion from './components/Add_lote_inspeccion';
import ver_lote_inspeccion from './components/ver_lote_inspeccion';
import inspeccion_lote_detallado from './components/inspeccion_lote_detallado';

import Add_certificado from './components/Add_certificado';
import ver_certificados from './components/ver_certificados';
import certificado_detallado from './components/certificado_detallado';
import PDF from './components/PDF';
import Addcliente_parametros from './components/Addcliente_parametros';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Loading from './components/Loading'
import Menu from './components/Menu'

const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
       <Stack.Navigator
           screenOptions={{
        headerStyle: {
          backgroundColor: '#FFD700',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
           >
    <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Menu" 
        component={Menu} 
        options={{ title: 'Menu' }}
      />

      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ title: 'Sign UP' }}
      />
      <Stack.Screen 
        name="Loading" 
        component={Loading} 
        options={{ title: 'Loading' }}
      />
      <Stack.Screen 
        name="Addcliente" 
        component={Addcliente} 
        options={{ title: 'Alta de cliente' }}
      />
      <Stack.Screen 
        name="Addcliente_parametros" 
        component={Addcliente_parametros} 
        options={{ title: 'Alta de cliente con parametros personalizados' }}
      />
      <Stack.Screen 
        name="ClienteScreen" 
        component={ClienteScreen} 
        options={{ title: 'Lista de Clientes' }}
      />
      <Stack.Screen 
       name="Cliente_Detallado" 
       component={Cliente_Detallado} 
       options={{ title: 'Detalle del cliente' }}
      />
      <Stack.Screen 
        name="Addequipo" 
        component={Addequipo} 
        options={{ title: 'Alta de Equipo de Lab' }}
      />
      <Stack.Screen 
        name="Verequipos" 
        component={Verequipos} 
        options={{ title: 'Lista de Equipos' }}
      />
      <Stack.Screen 
       name="Equipo_Detallado" 
       component={Equipo_Detallado} 
       options={{ title: 'Equipo Detallado' }}
      />
      <Stack.Screen 
        name="Addinspeccion" 
        component={Addinspeccion} 
        options={{ title: 'Agregar inspeccion' }}
      />
      <Stack.Screen 
        name="Verinspecciones" 
        component={Verinspecciones} 
        options={{ title: 'Lista de Inspecciones' }}
      />
      <Stack.Screen 
       name="InspeccionDetallada" 
       component={InspeccionDetallada} 
       options={{ title: 'Inspeccion Detallada' }}
      />
      <Stack.Screen 
        name="Addlote" 
        component={Addlote} 
        options={{ title: 'Agregar Lote' }}
      />
      <Stack.Screen 
        name="Verlote" 
        component={Verlote} 
        options={{ title: 'Lista de lotes' }}
      />
      <Stack.Screen 
        name="Lote_Detallado" 
        component={Lote_Detallado} 
        options={{ title: 'Info lote ' }}
      />
      <Stack.Screen 
        name="Add_lote_inspeccion" 
        component={Add_lote_inspeccion} 
        options={{ title: 'Agregar Lote-Inspeccion' }}
      />
      <Stack.Screen 
        name="ver_lote_inspeccion" 
        component={ver_lote_inspeccion} 
        options={{ title: 'Ver Lote-Inspeccion' }}
      />
      <Stack.Screen 
        name="inspeccion_lote_detallado" 
        component={inspeccion_lote_detallado} 
        options={{ title: 'Inspeccion Lote-Detallado ' }}
      />
       <Stack.Screen 
        name="Add_certificado" 
        component={Add_certificado} 
        options={{ title: 'Agregar Certificado' }}
      />
      <Stack.Screen 
        name="ver_certificados" 
        component={ver_certificados} 
        options={{ title: 'Ver Certificados' }}
      />
      <Stack.Screen 
        name="certificado_detallado" 
        component={certificado_detallado} 
        options={{ title: 'Certificado Detallado' }}
      />
       <Stack.Screen 
        name="PDF" 
        component={PDF} 
        options={{ title: 'PDF' }}
      />
            
            </Stack.Navigator>
      
    </NavigationContainer>      
  );
}



