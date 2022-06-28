import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
//import firebase from '../database/firebaseDb';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");



class Equipo_detallado extends Component {

  constructor() {
    super();
    this.state = {
     marca: '',
      modelo: '',
      descripcionl: '',
      descripcionc: '',
      serie: '',
      proveedor: '',
      fecha_adq: '',
       garantia: '',
      ubicacion: '',
       mantenimiento: '',
        medida_factorA: '',
         lim_supA: '',
        lim_infA: '',
        medida_factorTD: '',
        medida_factorE: '',
         lim_supE: '',
        lim_infE: '',
        medida_factorR: '',
         lim_supR: '',
        lim_infR: '',
        medida_factorQN: '',
         lim_supQN: '',
        lim_infQN: '',
        medida_factorT: '',
         lim_supT: '',
        lim_infT: '',
        medida_factorEX: '',
         lim_supEX: '',
        lim_infEX: '',
        medida_factorIE: '',
         lim_supIE: '',
        lim_infIE: '',
        medida_factorFP: '',
         lim_supFP: '',
        lim_infFP: '',
         especificacion: '',
        tipo: '',
      isLoading: true,
      fechahora : '',
    };
  }
 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM EquipoLab where id = ?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              marca: res.marca,
              modelo: res.modelo,
              descripcionl: res.descripcionl,
              descripcionc: res.descripcionc,
              serie: res.serie,
              proveedor: res.proveedor,
              fecha_adq: res.fecha_adq,
              garantia: res.garantia,
              ubicacion: res.ubicacion,
              mantenimiento: res.mantenimiento,
              medida_factorA: res.medida_factorA,
              lim_supA: res.lim_supA,
              lim_infA: res.lim_infA,
              medida_factorTD: res.medida_factorTD,
              medida_factorE: res.medida_factorE,
              lim_supE: res.lim_supE,
              lim_infE: res.lim_infE,
              medida_factorR: res.medida_factorR,
              lim_supR: res.lim_supR,
              lim_infR: res.lim_infR,
              medida_factorQN: res.medida_factorQN,
              lim_supQN: res.lim_supQN,
              lim_infQN: res.lim_infQN,
              medida_factorT: res.medida_factorT,
               lim_supT: res.lim_supT,
              lim_infT: res.lim_infT,
              medida_factorEX: res.medida_factorEX,
              lim_supEX: res.lim_supEX,
               lim_infEX: res.lim_infEX,
              medida_factorIE: res.medida_factorIE,
              lim_supIE: res.lim_supIE,
              lim_infIE: res.lim_infIE,
              medida_factorFP: res.medida_factorFP,
              lim_supFP: res.lim_supFP,
             lim_infFP: res.lim_infFP, 
              tipo: res.tipo,
              fechahora: res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se encontro el equipo de laboratorio');
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



    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE EquipoLab set marca=?,modelo=?,descripcionl=?,descripcionc=?,serie=?,proveedor=?,fecha_adq=?,garantia=?,ubicacion=?,mantenimiento=?,medida_factorA=?,lim_supA=?,lim_infA=?,medida_factorTD=?, medida_factorE=?,lim_supE=?, lim_infE=?, medida_factorR=?, lim_supR=?, lim_infR=?, medida_factorQN=?,lim_supQN=?,lim_infQN=?,medida_factorT=?,lim_supT=?,lim_infT=?,medida_factorEX=?,lim_supEX=?,lim_infEX=?,medida_factorIE=?,lim_supIE=?,lim_infIE=?,medida_factorFP=?,lim_supFP=?,lim_infFP=?,especificacion=?,tipo=?,fechahora=? where id=?',
        [this.state.marca, this.state.modelo,this.state.descripcionl, this.state.descripcionc, this.state.serie,this.state.proveedor,this.state.fecha_adq,this.state.garantia,this.state.ubicacion,this.state.mantenimiento,this.state.medida_factorA,this.state.lim_supA,this.state.lim_supA,this.state.medida_factorTD, this.state.medida_factorE, this.state.lim_supE, this.state.lim_infE, this.state.medida_factorR, this.state.lim_supR, this.state.lim_infR, this.state.medida_factorQN, this.state.lim_supQN, this.state.lim_infQN, this.state.medida_factorT, this.state.lim_supT, this.state.lim_infT, this.state.medida_factorEX, this.state.lim_supEX, this.state.lim_infEX, this.state.medida_factorIE, this.state.lim_supIE, this.state.lim_infIE, this.state.medida_factorFP, this.state.lim_supFP, this.state.lim_infFP, this.state.especificacion,this.state.tipo, date + '/' + month + '/' + year  + ' ' + hours + ':' + min + ':' + sec,this.state.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se modifico el equipo existosamente',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Addequipo'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Update Failed');
        }
      );
    });
  }

  deleteUser() {

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM EquipoLab where id=?',
        [this.props.route.params.userkey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se borro el equipo exitosamente',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Addequipo'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Inserta un id valido');
          }
        }
      );
    });

  /*
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item eliminado de la base de datos')
          this.props.navigation.navigate('UserScreen');
      })
*/

  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Borrar seguro',
      'Estas seguro?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No se elimino'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
  <View style={styles.inputGroup}>
  <Text style={{textAlign:'center', fontSize: 25}}>
            Informacion del Equipo
            {'\n','\n'}
          </Text>
          <Text style={{fontWeight: 'bold'}}>Marca</Text>
          <TextInput
              placeholder={'Marca'}
              value={this.state.marca}
              onChangeText={(val) => this.inputValueUpdate(val, 'marca')}
          />
        </View>
        <View style={styles.inputGroup}>
        <Text style={{fontWeight: 'bold'}}>Modelo</Text>
          <TextInput
              placeholder={'Modelo'}
              value={this.state.modelo}
              onChangeText={(val) => this.inputValueUpdate(val, 'modelo')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Descripcion Larga</Text>
         <View style={styles.inputGroup}>

          <TextInput
              placeholder={'Descripcion larga'}
              value={this.state.descripcionl}
              onChangeText={(val) => this.inputValueUpdate(val, 'descripcionl')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Descripcion Corta</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Descripcion corta'}
              value={this.state.descripcionc}
              onChangeText={(val) => this.inputValueUpdate(val, 'descripcionc')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Numero de Serie</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'XXX-XXX-XXX'}
              value={this.state.serie}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'serie')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Proveedor</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Proveedor'}
              value={this.state.proveedor}
              onChangeText={(val) => this.inputValueUpdate(val, 'proveedor')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Fecha Adquisicion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'dd-month-yyyy'}
              value={this.state.fecha_adq}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_adq')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Garantia</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Garantia'}
              value={this.state.garantia}
              onChangeText={(val) => this.inputValueUpdate(val, 'garantia')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Ubicacion del Equipo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Ubicacion del Equipo'}
              value={this.state.ubicacion}
              onChangeText={(val) => this.inputValueUpdate(val, 'ubicacion')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Mantenimiento</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mantenimiento'}
              value={this.state.mantenimiento}
              onChangeText={(val) => this.inputValueUpdate(val, 'mantenimiento')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Absorcion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Factor de absorcion'}
              value={this.state.medida_factorA}
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supA}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf. de Absorcion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infA}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infA')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Tiempo de Desarrollo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'hh:mm'}
              value={this.state.medida_factorTD}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorTD')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Estabilidad </Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida de estabilidad'}
              value={this.state.medida_factorE}
          keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supE}
              keyboardType ='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Medida de Reblandecimiento</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida de reblandecimiento'}
              value={this.state.medida_factorR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorR')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite superior'}
              value={this.state.lim_supR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supR')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite inferior'}
              value={this.state.lim_infR}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infR')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Factor de Quality Number</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorQN')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>       
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supQN')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infQN}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infQN')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Tenacidad</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infT}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infT')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Extensibilidad</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorEX')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supEX')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infEX}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infEX')}
          />
        </View>
         <View style={styles.inputGroup}>
         <Text style={{fontWeight: 'bold'}}>Indice de Elasticidad</Text>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infIE}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infIE')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Factor de Fuerza Panadera</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medida Factor'}
              value={this.state.medida_factorFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'medida_factorFP')}
          />
        </View>
        <Text style={{fontWeight: 'bold'}}>Limite Sup.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Superior'}
              value={this.state.lim_supFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_supFP')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Limite Inf.</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Limite Inferior'}
              value={this.state.lim_infFP}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'lim_infFP')}
          />
        </View>
          <Text style={{fontWeight: 'bold'}}>Especificacion</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Especificacion'}
              value={this.state.especificacion}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'especificacion')}
          />
        </View>
         <Text style={{fontWeight: 'bold'}}>Tipo de Equipo</Text>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'1=Farinografo 2=Alveografo'}
              value={this.state.tipo}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'tipo')}
          />
        </View>


       <View>
    <Text>Fecha Registro/Actualización {this.state.fechahora}</Text>
       </View>
        <View style={styles.button}>
          <Button
            title='Actualizar'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Borrar'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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

export default Equipo_detallado;