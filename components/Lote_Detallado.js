import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,Text} from 'react-native';
import { ListItem } from 'react-native-elements'
//import firebase from '../database/firebaseDb';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");



class Lote_Detallado extends Component {

  constructor() {
    super();
    this.state = {
      cantidad:'',
      req_certificado:'',
      fecha_elaboracion:'',
      id:'',
      clave_documento:'',
      fechahora:'',
      isLoading: true,
      userArr: []
    };
  }
 
  componentDidMount() {
   
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM lote where id = ?',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              cantidad:res.cantidad,
              req_certificado: res.req_certificado,
              fecha_elaboracion:res.fecha_elaboracion,
              clave_documento: res.clave_documento,
              fechahora: res.fechahora,
              isLoading: false
            });
            
          } else {
            alert('No se encontro el numero de lote');
          //  updateAllStates('', '', '');
          }
        }
      );
    }),
    console.log(this.state.id,this.props.route.params.userkey);

    var id2= this.props.route.params.userkey;
    console.log('hola',id2);
     db.transaction((tx) => {
     
      tx.executeSql('SELECT * FROM  inspeccion where inspeccion.id_lote = ?',[this.props.route.params.key], // passing sql query and parameters:null
         (txObj, { rows: { _array } }) => this.setState({ userArr: _array , isLoading: false}), 
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }); 
  }

  deleteUser() {

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM lote where id=?',
        [this.props.route.params.userkey],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se borro el lote exitosamente',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Addlote'),
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
       <Text style={{textAlign:'center', fontSize: 25}}>
            Informacion del Lote
            {'\n','\n'}
          </Text>
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
        <Text style={{fontWeight: 'bold'}}>Fecha de Elaboracion</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Fecha de Elaboracion'}
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
        <View>

       {
            this.state.userArr.map((item, i) => {
    
           
              console.log('id='+JSON.stringify(item));
            
              return (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    this.props.navigation.navigate('InspeccionDetallada', {
                      userkey: item.id
                    });
                  }}>                 
                   <ListItem.Content>
                  <ListItem.Title>{item.id}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
                </ListItem>

              );
            })
          }
       </View>
       <Text>{'\n\n\n\n\n\n\n\n\n'}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
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

export default Lote_Detallado;