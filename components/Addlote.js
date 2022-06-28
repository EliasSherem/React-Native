import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';




class Addlote extends Component {
  constructor() {
    super();

  
  // Check if the items table exists if not create it
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS lote (id INTEGER PRIMARY KEY AUTOINCREMENT ,cantidad TEXT,req_certificado TEXT,fecha_elaboracion TEXT,clave_documento TEXT, fechahora TEXT)'
      
    )
  })
 // console.log('tabla creada');
  
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      id: '',
      cantidad:'',
      req_certificado:'',
      fecha_elaboracion:'',
      clave_documento:'',
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      id:'',
      cantidad:'',
      req_certificado:'',
      fecha_elaboracion:'',
      clave_documento:'',
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
     
 if(this.state.cantidad === ''){
      alert('Te falto la cantidad!')
    }
    else if(this.state.req_certificado === ''){
      alert('No se sabe si requiere certificado!')
    }
    else if (this.state.fecha_elaboracion=== ''){
      alert('Se requiere la fecha de elaboracion')
    }else if (this.state.clave_documento=== ''){
      alert('Se requiere la clave del documento')
    }
    else
    {
      
      /*
      this.setState({
        isLoading: true,
      });      
      
    */
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO lote (cantidad,req_certificado,fecha_elaboracion,clave_documento, fechahora) VALUES (?,?,?,?,?,?,?,?,?,?)',
          [this.state.cantidad,this.state.req_certificado,this.state.fecha_elaboracion,this.state.clave_documento,this.state.fechahora],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se inserto correctamente el Lote',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('Verlote'),
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
            Alta de Lote
            {'\n','\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Cantidad</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cantidad'}
              value={this.state.cantidad}
              onChangeText={(val) => this.inputValueUpdate(val, 'cantidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Certificado</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Requiere certificado? 1=si 2=no'}
              value={this.state.req_certificado}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'req_certificado')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Fecha de producción</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de producción'}
              value={this.state.fecha_elaboracion}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_elaboracion')}
          />
        </View>
        
        <Text style={{fontWeight: 'bold'}}>Clave del documento</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Clave del documento'}
              value={this.state.clave_documento}
              onChangeText={(val) => this.inputValueUpdate(val, 'clave_documento')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agrega Lote'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver lotes'
            onPress={() =>  this.props.navigation.navigate('Verlote')} 
            color="#19AC52"
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Limpiar'
            onPress={() =>  this.limpia()} 
            color="#19AC52"
          />
        </View>
        <Text>{'\n\n\n'}</Text>

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

export default Addlote;