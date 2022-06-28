import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
//import firebase from '../database/firebaseDb';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");



class InspeccionDetallada extends Component {

  constructor() {
    super();
    this.state = {
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
      fechahora:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM inspeccion where id = ?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              absorcion: res.absorcion,
              tiempo_desarrollo: res.tiempo_desarrollo,
              estabilidad: res.estabilidad,
              reblandecimiento: res.reblandecimiento,
              qnumber: res.qnumber,
              tenacidad: res.tenacidad,
              extensebilidad: res.extensebilidad,
              configuracion_curva: res.configuracion_curva,
              indice_elasticidad: res.indice_elasticidad,
              fuerza_panadera: res.fuerza_panadera,
              fechahora:res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se encontro la inspeccion');
          //  updateAllStates('', '', '');
          }
        }
      );
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

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
      <Text style={{textAlign:'center', fontSize: 25}}>
            Informacion de la Inspeccion
            {'\n','\n'}
          </Text>
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

       <View>
    <Text>Fecha Registro/Actualización {this.state.fechahora} {'\n\n\n\n\n'}</Text>
       </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
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
export default InspeccionDetallada;