import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';




class Add_certificado extends Component {
  constructor() {
    super();

  db.exec(
  [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
  false,
  () => console.log('Foreign keys turned on'),
);

     db.transaction(tx => {
    tx.executeSql(
    'CREATE TABLE IF NOT EXISTS certificado (id INTEGER PRIMARY KEY AUTOINCREMENT,cantidad_solicitada TEXT, cant_total TEXT,numero_factura TEXT,fecha_envio TEXT,fecha_caducidad TEXT, fecha_produccion TEXT, no_inspeccion TEXT,id_cliente TEXT,fechahora TEXT,FOREIGN KEY (no_inspeccion) REFERENCES inspeccion (id), FOREIGN KEY (id_cliente) REFERENCES cliente (id))'

    );
  })


  // Check if the items table exists if not create it

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      cantidad_solicitada:'' ,
      cant_total:'' ,
      numero_factura:'' ,
      fecha_envio:'' ,
      fecha_caducidad:'' ,
      fecha_produccion:'',
      no_inspeccion:'' ,
      id_cliente:'' ,
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      cantidad_solicitada:'' ,
      cant_total:'' ,
      numero_factura:'' ,
      fecha_envio:'' ,
      fecha_caducidad:'' ,
      fecha_produccion:'',
      no_inspeccion:'' ,
      id_cliente:'' ,
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
    console.log('storeUser,this.state.name='+this.state.id_cliente);
    if(this.state.cantidad_solicitada === '')
    {
     alert('falta la cantidad solicitada')
    } 
    else if(this.state.cant_total=== '')
    {
     alert('falta la cantidad total') 
    }
    else if(this.state.numero_factura=== '')
    {
     alert('falta numero de factura') 
    }
    else if(this.state.fecha_envio=== '')
    {
     alert('falta la fecha de envio') 
    }
    else if(this.state.fecha_caducidad=== '')
    {
     alert('falta la fecha de caducidad') 
    }
    else if(this.state.no_inspeccion=== '')
    {
     alert('falta numero de la inspeccion') 
    }
    else if(this.state.fecha_produccion=== '')
    {
      alert('falta fecha de produccion')
    }
    else if(this.state.id_cliente=== '')
    {
      alert('falta el id del cliente')
    }
     else
     {
      
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO certificado (cantidad_solicitada,cant_total,numero_factura,fecha_envio,fecha_caducidad,fecha_produccion,no_inspeccion,id_cliente,fechahora) VALUES (?,?,?,?,?,?,?,?,?)',
          [this.state.cantidad_solicitada,this.state.cant_total,this.state.numero_factura,this.state.fecha_envio,this.state.fecha_produccion,this.state.fecha_caducidad,this.state.no_inspeccion, this.state.id_cliente, this.state.fechahora],
          (tx, results) => {
            alert('Results'+ results.rowsAffected);

            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se hizo el match',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('ver_certificados'),
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
            Agrega el certificado
            {'\n','\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Cantidad Solicitada</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cantidad solicitada'}
              value={this.state.cantidad_solicitada}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'cantidad_solicitada')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}} >Cantidad Total</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cantidad total'}
              value={this.state.cant_total}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'cant_total')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Numero de Factura</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero de factura'}
              value={this.state.numero_factura}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'numero_factura')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Fecha de Envio</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de envio'}
              value={this.state.fecha_envio}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_envio')}
          />
        </View>
           <Text style={{fontWeight: 'bold'}}>Fecha de Caducidad</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de caducidad'}
              value={this.state.fecha_caducidad}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_caducidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Fecha de Produccion</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de produccion'}
              value={this.state.fecha_produccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_produccion')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Numero de Insepccion</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero de inspeccion'}
              value={this.state.no_inspeccion}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'no_inspeccion')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Id del Cliente</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'id del cliente'}
              value={this.state.id_cliente}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'id_cliente')}
          />
        </View>


        <View style={styles.button}>
          <Button
            title='Agrega el certificado'
            onPress={() => this.storeUser()} 
            
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver lista de certificados'
            onPress={() =>  this.props.navigation.navigate('ver_certificados')} 
            
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Limpiar'
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

export default Add_certificado;