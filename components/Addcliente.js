import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';




class Addcliente extends Component {
  constructor() {
    super();
  // Check if the items table exists if not create it
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT,rfc TEXT,domicilio TEXT, ncontacto TEXT,absorcionMin TEXT, absorcionMax TEXT, tiempoMax TEXT, tiempoMin TEXT, estabilidadMax TEXT, estabilidadMin TEXT, calidadMax TEXT, calidadMin TEXT, tenacidadMax TEXT, tenacidadMin TEXT, extensibilidadMax TEXT, extensibilidadMin TEXT, plMax TEXT, plMin TEXT, elasticidadMax TEXT, elasticidadMin TEXT, gradoWMax TEXT, gradoWMin TEXT, activado TEXT, fechahora TEXT)'
    )
  })
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      name: '',
      email: '',
      rfc: '',
      domicilio: '',
      ncontacto: '',
      absorcionMin:'',
absorcionMax:'',
tiempoMax:'',
tiempoMin:'' ,
estabilidadMax:'',
estabilidadMin:'' ,
calidadMax:'' ,
calidadMin:'' ,
tenacidadMax:'' ,
tenacidadMin:'' ,
extensibilidadMax:'' ,
extensibilidadMin:'' ,
plMax:'' ,
plMin:'' ,
elasticidadMax:'' ,
elasticidadMin:'' ,
gradoWMax:'' ,
gradoWMin:'' ,
      activado:'1' ,
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      name: '',
      email: '',
      rfc: '',
      domicilio: '',
      ncontacto: '',
      isLoading: false,
      fechahora : '',
    });

  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() 
  {
    console.log('storeUser,this.state.name='+this.state.name);
    if(this.state.name === '')
    {
     alert('Te falto tu nombre es obligatorio!')
    } 
    else if(this.state.domicilio === ''){
      alert('Te falto tu domicilio!')
    }
    else if(this.state.email === ''){
      alert('Te falto tu correo!')
    }
    else
    {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO cliente (name,email,rfc,domicilio,ncontacto,absorcionMin,absorcionMax,tiempoMax,tiempoMin,estabilidadMax,estabilidadMin,calidadMax,calidadMin,tenacidadMax,tenacidadMin,extensibilidadMax, extensibilidadMin,plMax,plMin,elasticidadMax,elasticidadMin,gradoWMax,gradoWMin,activado,fechahora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
[this.state.name, this.state.email,this.state.rfc, this.state.domicilio, this.state.ncontacto,this.state.absorcionMin,this.state.absorcionMax,this.state.tiempoMax ,this.state.tiempoMin,this.state.estabilidadMax,this.state.estabilidadMin ,this.state.calidadMax ,this.state.calidadMin , this.state.tenacidadMax ,this.state.tenacidadMin ,this.state.extensibilidadMax ,this.state.extensibilidadMin ,
this.state.plMax ,this.state.plMin ,this.state.elasticidadMax ,this.state.elasticidadMin,this.state.gradoWMax,this.state.gradoWMin,this.state.activado,this.state.fechahora],

          (tx, results) => {
            console.log('Results', results.rowsAffected);
            console.log('tabla creada');
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se inserto correctamente el cliente',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('ClienteScreen'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Insert Failed');
          }
        );
      });


    }
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      
      <ScrollView style={styles.container}>
          
        <View>
          <Text style={{textAlign:'center', fontSize: 25}}>
            Alta de cliente
            {'\n','\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Nombre{'\n'}</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Email{'\n'}</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>RFC{'\n'}</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'RFC'}
              value={this.state.rfc}
              onChangeText={(val) => this.inputValueUpdate(val, 'rfc')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Domicilio{'\n'}</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Domicilio'}
              value={this.state.domicilio}
              onChangeText={(val) => this.inputValueUpdate(val, 'domicilio')}
          />
        </View>
        <Text  style={{fontWeight: 'bold'}}>Contacto Factura{'\n'}</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Contacto al cual se facturara'}
              value={this.state.ncontacto}
              onChangeText={(val) => this.inputValueUpdate(val, 'ncontacto')}
          />
        </View>
       

          <View style={styles.inputGroup}>
          <TextInput
              placeholder={'El cliente se activará de manera automatica'}
              value={this.state.activado}
              //onChangeText={(val) => this.inputValueUpdate(val, 'activado')}
          />
        </View>

        <View style={styles.button}>
          
          <Button
              title='Cliente con parametros'
            onPress={() =>  this.props.navigation.navigate('Addcliente_parametros')} 
            

            
          />
   
          <Button
            title='Agrega cliente'
            onPress={() => this.storeUser()} 
            
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver Clientes'
            onPress={() =>  this.props.navigation.navigate('ClienteScreen')} 
            
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Limpiar Datos'
            onPress={() =>  this.limpia()} 
            
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35, 
    backgroundColor: '#C0C0C0'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default Addcliente;