import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';




class Add_lote_inspeccion extends Component {
  constructor() {
    super();

  db.exec(
  [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
  false,
  () => console.log('Foreign keys turned on'),
);

     db.transaction(tx => {
    tx.executeSql(
    'CREATE TABLE IF NOT EXISTS inspeccion_lote (id INTEGER PRIMARY KEY AUTOINCREMENT,id_inspeccion INTEGER, id_lote INTEGER,fechahora TEXT,FOREIGN KEY (id_inspeccion) REFERENCES inspeccion (id),FOREIGN KEY (id_lote) REFERENCES lote(id))'

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
      id_inspeccion:'' ,
      id_lote:'' ,
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      id_inspeccion: '',
      id_lote: '',
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
    if(this.state.id_inspeccion === '')
    {
     alert('El id de la inspeccion es obligatorio')
    } 
    else if(this.state.id_lote=== '')
    {
     alert('El id del lote es obligatorio') 
    }
     else
     {
      
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO inspeccion_lote (id_inspeccion,id_lote,fechahora) VALUES (?,?,?)',
          [this.state.id_inspeccion,this.state.id_lote, this.state.fechahora],
          (tx, results) => {
            alert('Results'+ results.rowsAffected);

            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se hizo el match',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('ver_lote_inspeccion'),
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
          <Text>
            INSERTA LA INSPECCION DEL LOTE
            {'\n','\n'}
          </Text>
        </View>
        <Text>Id Inspeccion</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ID_inspeccion'}
              value={this.state.id_inspeccion}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'id_inspeccion')}
          />
        </View>
        <Text>Id Lote</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ID_lote'}
              value={this.state.id_lote}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'id_lote')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agrega la inspeccion del lote'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver lista de inspecciones con lote'
            onPress={() =>  this.props.navigation.navigate('ver_lote_inspeccion')} 
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

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
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

export default Add_lote_inspeccion;