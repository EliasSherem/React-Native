import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';




class Addinspeccion extends Component {
  constructor() {
    super();

    db.exec(
  [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
  false,
  () => console.log('Foreign keys turned on'),
);
  // Check if the items table exists if not create it
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS inspeccion (id INTEGER PRIMARY KEY AUTOINCREMENT, id_lote TEXT, absorcion TEXT, tiempo_desarrollo TEXT,estabilidad TEXT,reblandecimiento TEXT, qnumber TEXT,tenacidad TEXT,extensebilidad TEXT,configuracion_curva TEXT,indice_elasticidad TEXT,fuerza_panadera TEXT, fechahora TEXT, FOREIGN KEY (id_lote) REFERENCES lote(id))'
    )
  })
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    
    this.state = {
      id_lote: '',
      absorcion: '',
      tiempo_desarrollo: '',
      estabilidad: '',
      reblandecimiento: '',
      qnumber: '',
      tenacidad: '',
      extensebilidad: '',
      configuracion_curva: '',
      indice_elasticidad: '',
      fuerza_panadera: '',
      fechahora: date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec,
      isLoading: false
    };
  }


  limpia()
  {
    this.setState({
      id_lote: '',
      absorcion: '',
      tiempo_desarrollo: '',
      estabilidad: '',
      reblandecimiento: '',
      qnumber: '',
      tenacidad: '',
      extensebilidad: '',
      configuracion_curva: '',
      indice_elasticidad: '',
      fuerza_panadera: '',
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
    if(this.state.absorcion === '')
    {
     alert('Te falto la absorcion!')
    } 
    else if(this.state.tiempo_tiempo_desarrollo === ''){
      alert('Te falto el tiempo de desarrollo!')
    }
    else if(this.state.estabilidad === ''){
      alert('Te falto la estabilidad!')
    }else if(this.state.reblandecimiento === ''){
      alert('Te falto el reblandecimiento!')
    }else if(this.state.qnumber === ''){
      alert('Te falto el Quality number!')
    }else if(this.state.tenacidad === ''){
      alert('Te falto la tenacidad!')
    }else if(this.state.extensebilidad === ''){
      alert('Te falto la extensibilidad!')
    }else if(this.state.configuracion_curva === ''){
      alert('Te falto la configuracion de la curva!')
    }else if(this.state.indice_elasticidad === ''){
      alert('Te falto el indice de elasticidad!')
    }else if(this.state.fuerza_panadera === ''){
      alert('Te falto la fuerza panadera!')
    }else if(this.state.id_lote === ''){
      alert('Te falto el numero de lote!')
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
          'INSERT INTO inspeccion (id_lote,absorcion, tiempo_desarrollo,estabilidad,reblandecimiento, qnumber,tenacidad,extensebilidad,configuracion_curva,indice_elasticidad,fuerza_panadera,fechahora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [this.state.id_lote,this.state.absorcion, this.state.tiempo_desarrollo,this.state.estabilidad, this.state.reblandecimiento, this.state.qnumber,this.state.tenacidad,this.state.extensebilidad,this.state.configuracion_curva,this.state.indice_elasticidad,this.state.fuerza_panadera,this.state.fechahora],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Se inserto correctamente la inspeccion',
                [
                  {
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('Verinspeccion'),
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
            Agregar Inspeccion
            {'\n','\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Num. de Lote</Text>
        <View style={styles.inputGroup}>
        <TextInput
              placeholder={'Numero de Lote'}
              value={this.state.id_lote}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'id_lote')}
          />
        </View>
 <View>
          <Text style={{textAlign:'center', fontSize: 20}}>
            Farinograma
            {'\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Absorcion</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Absorcion'}
              value={this.state.absorcion}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'absorcion')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Tiempo de Desarrollo</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tiempo de Desarrollo'}
              value={this.state.tiempo_desarrollo}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'tiempo_desarrollo')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Estabilidad</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Estabilidad'}
              value={this.state.estabilidad}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'estabilidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Reblandecimiento</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Reblandecimiento'}
              value={this.state.reblandecimiento}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'reblandecimiento')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Quality Number</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Quality Number'}
              value={this.state.qnumber}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'qnumber')}
          />
        </View>

         <View>
          <Text style={{textAlign:'center', fontSize: 20}}>
            Alveógrafo
            {'\n'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Tenacidad</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tenacidad'}
              value={this.state.tenacidad}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'tenacidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Extensibilidad</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Extensibilidad'}
              value={this.state.extensebilidad}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'extensebilidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Configuracion de la Curva</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Configuracion de la Curva'}
              value={this.state.configuracion_curva}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'configuracion_curva')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Elasticidad</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Indice de Elasticidad'}
              value={this.state.indice_elasticidad}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'indice_elasticidad')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Fuerza Panadera</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fuerza Panadera'}
              value={this.state.fuerza_panadera}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'fuerza_panadera')}
          />
        </View>
       
        <View style={styles.button}>
          <Button
            title='Agregar Inspeccion'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Ver registro de inspecciones'
            onPress={() =>  this.props.navigation.navigate('Verinspecciones')} 
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
        <Text>
            
            {'\n','\n','\n'}
          </Text>
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

export default Addinspeccion;