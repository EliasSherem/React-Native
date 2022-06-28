import React, { PureComponent } from 'react';
//import jsPDF from 'jspdf';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
//import HTMLAnchorElement from 'download'
const db = SQLite.openDatabase("BASE1Database.db");



class certificado_detallado extends PureComponent {

  constructor() {
    super();
    this.state = {
      id:'' ,
     cantidad_solicitada:'' ,
      cant_total:'' ,
      numero_factura:'' ,
      fecha_envio:'' ,
      fecha_caducidad:'' ,
      fecha_produccion:'',
      no_inspeccion:'' ,
      id_cliente:'' ,
      fechahora:'',
      isLoading: true
    };
  }


 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM certificado where id =?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              cantidad_solicitada:res.cantidad_solicitada,
              cant_total:res.cant_total,
              numero_factura:res.numero_factura,
              fecha_envio:res.fecha_envio,
              fecha_caducidad:res.fecha_caducidad,
              fecha_produccion:res.fecha_produccion,
              no_inspeccion:res.no_inspeccion,
              id_cliente:res.id_cliente,
              fechahora: res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se enconctro ese match');
          //  updateAllStates('', '', '');
          }
        }
      );
    }),
    db.transaction(tx => {
     
      tx.executeSql('SELECT * FROM inspeccion', [this.props.route.params.userkey], // passing sql query and parameters:null
         (txObj, { rows: { _array } }) => this.setState({ userArr: _array , isLoading: false}), 
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    })

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
        'UPDATE certificado set cantidad_solicitada=?,cant_total=?,numero_factura=?,fecha_envio=?,fecha_caducidad=?,fecha_produccion=?,no_inspeccion=?,id_cliente=?, fechahora=? where id=?',
        [this.state.cantidad_solicitada,this.state.cant_total,this.state.numero_factura,this.state.fecha_envio,this.state.fecha_caducidad,this.state.fecha_produccion,this.state.no_inspeccion,this.state.id_cliente, date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec,this.state.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'certificado updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Add_certificado'),
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
        'DELETE FROM certificado where id=?',
        [this.props.route.params.userkey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'certificado deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Add_certificado'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });


  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Borrar certificado',
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
          
        <View>
          <Text style={{textAlign:'center', fontSize: 25}}>
            Informacion del Certificado
            {'\n','\n'}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cantidad solicitada'}
              value={this.state.cantidad_solicitada}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'cantidad_solicitada')}
          />
        </View>
         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cantidad total'}
              value={this.state.cant_total}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'cant_total')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero de factura'}
              value={this.state.numero_factura}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'numero_factura')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de envio'}
              value={this.state.fecha_envio}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_envio')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de caducidad'}
              value={this.state.fecha_caducidad}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_caducidad')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de produccion'}
              value={this.state.fecha_produccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'fecha_produccion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero de inspeccion'}
              value={this.state.no_inspeccion}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'no_inspeccion')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'id del cliente'}
              value={this.state.id_cliente}
               keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'id_cliente')}
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

          <View>
          <Button
            title='Convertir a PDF y enviar'
             onPress={() => this.props.navigation.navigate('PDF')}
            color="#E37399"
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

export default certificado_detallado;



