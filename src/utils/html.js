import {createHTML,copyFromAssets,pickImage,processLocalImage,} from "./helpers";
import { COLORS } from "./constants";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("BASE1Database.db");
import React, { Component } from 'react';

//inspeccion
global.absorcion1=56
global.tiempo_desarrollo1=6.4
global.estabilidad1=11.4
global.reblandecimiento1=58
global.qnumber1=114
global.tenacidad1=93
global.extensebilidad1=0.67
global.configuracion_curva1=61
global.indice_elasticidad1=54
global.fuerza_panadera1=0.84

//cliente
global.inf_absorcion1=54
global.sup_absorcion1=60.2
global.inf_tiempo1=6.1
global.sup_tiempo1=7
global.inf_estabilidad1=10.2
global.sup_estabilidad1=13
global.inf_reblandecimiento1=55
global.sup_reblandecimiento1=66
global.inf_qnumber1=111
global.sup_qnumber1=145
global.inf_tenacidad1=86
global.sup_tenacidad1=97
global.inf_extensibilidad1=0.42
global.sup_extensibilidad1=
global.inf_confcurva1=25
global.sup_confcurva1=167
global.inf_elasticidad1=54
global.sup_elasticidad1=68
global.inf_fuerzapan1=0.74
global.sup_fuerzapan1=0.92

export default class PDF extends Component {

  constructor(props) {
    super(props);
     this.simpleHtml = this.simpleHtml.bind(this);
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
      fechahora:'',
      isLoading: true
      
    };
  }

 
  componentDidMount() {
    
    console.log(this.props.route.params.userkey);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM inspeccion where id = 1',
        [this.props.route.params.userkey],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            //updateAllStates(res.user_name, res.user_contact, res.user_address);
            this.setState({
              id: res.id,
              id_lote:res.id_lote,
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
            global.absorcion1=this.state.absorcion
        }
    
      );
           
    });
  
  }
  
  render(){
    return(
      global.absorcion1=this.state.absorcion 
    )
  }

}
//absorcion1=this.state.absorcion

export const simpleHtml = (sholudRemovePageMargin = false,props) => () =>
  createHTML({
    content: `
    <h1>Certificado de Calidad</h1>
   <h3>Nombre del fabricante: HARINAS MEXICANAS</h3> 
  <h3>Numero de NIT: 802.0001</h3> 
    <h3>Nombre comercial del alimento: Harina mexicana</h3> 
      <h3>Numero del registro sanitario: 5848390</h3> 
        <p>Descripcion del alimento: Harina fabricada en Mexico  que se obtiene de la molienda gradual y metódica del endospermo del trigo, con una extracción variable entre el 70 y el 80% del grano limpio. </p>
        <h2>Datos proporcinados por el cliente:</h2> 
        <br>
        <h2>Farinograma:</h2>
        <p>Absorcion: ${global.inf_absorcion1} - ${global.sup_absorcion1}</p> 
        <p>Tiempo de desarrollo: ${global.inf_tiempo1} - ${global.sup_tiempo1}</p> 
        <p>Estabilidad(L): ${global.inf_estabilidad1} - ${global.sup_estabilidad1}</p> 
        <p>Reblandecimiento: ${global.inf_reblandecimiento1} - ${global.sup_reblandecimiento1}</p> 
        <p>Numero de calidad:${global.inf_qnumber1} - ${global.sup_qnumber1}</p> 
        <p>Alveógrafo: </p> 
        <p>Tenacidad (P): ${global.inf_tenacidad1} - ${global.sup_tenacidad1}</p> 
        <p>Extensibilidad: ${global.inf_extensibilidad1} - ${global.sup_extensibilidad1}</p> 
        <p>Configuracion de la curva: ${global.inf_confcurva1} - ${global.sup_confcurva1}</p> 
        <p>Indice de elasticidad: ${global.inf_elasticidad1} - ${global.sup_elasticidad1}</p> 
        <p>Fuerza panadera: ${global.inf_fuerzapan1} - ${global.sup_fuerzapan1}</p>
          <br>

        <br> 
<table class="egt">
  <tr>
    <th>Farinografo</th>
    <th>Valor Minimo</th>
    <th>Valor Maximo</th>
    <th>Valor de la inspección</th>
  </tr>
  <tr>
    <td>Absorcion</td>
    <td>56.1</td>
    <td>58.1</td>
     <td>${global.absorcion1}</td>
  </tr>
  <tr>
    <td>Tiempo de desarrollo</td>
    <td>6.2</td>
    <td>6.9</td>
     <td>${global.tiempo_desarrollo1}</td>
  </tr>
  <tr>
    <td>Estabilidad</td>
    <td>11.5</td>
    <td>12.1</td>
      <td>${global.estabilidad1}</td>
  </tr>
   <tr>
    <td>Reblandecimiento</td>
    <td>51</td>
    <td>59</td>
      <td>${global.reblandecimiento1}</td>
  </tr>
   <tr>
    <td>Numero de calidad</td>
    <td>128</td>
    <td>131</td>
    <td>${global.qnumber1}</td>
  </tr>
</table>

<br></br>

<table class="egt">
  <tr>
    <th>Alveógrafo</th>
    <th>Valor Minimo</th>
    <th>Valor Maximo</th>
    <th>Valor de la inspección</th>
  </tr>
  <tr>
    <td>Tenacidad</td>
    <td>80</td>
    <td>100</td>
     <td>${global.tenacidad1}</td>
  </tr>
  <tr>
    <td>Extensibilidad</td>
    <td>0.5</td>
    <td>0.84</td>
     <td>${global.extensebilidad1}</td>
  </tr>
  <tr>
    <td>Configuración de la curva</td>
    <td>23</td>
    <td>180</td>
      <td>${global.configuracion_curva1}</td>
  </tr>
   <tr>
    <td>Indice de elasticidad</td>
    <td>45</td>
    <td>60</td>
      <td>${global.indice_elasticidad1}</td>
  </tr>
   <tr>
    <td>Fuerza panadera</td>
    <td>0.5</td>
    <td>0.84</td>
    <td>${global.fuerza_panadera1}</td>
  </tr>
</table>
  `,
  
  
    sholudRemovePageMargin,
    styles: `
      body {
        background: ${COLORS.white};
      },
       table {
   width: 100%;
  border: 1px solid #000;
   border-collapse: separate;
   border-spacing: 5px;
   background: #000 url("gradient.gif") bottom left repeat-x;
}
th, td {
   width: 25%;
   text-align: left;
   vertical-align: top;
   border: 1px solid #000;
}
    `,
  });

const sectionStyle = `
  section {
    background-color: ${COLORS.grey};
    height: 65vh;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  table {
   width: 100%;
  border: 1px solid #000;
   border-collapse: separate;
   border-spacing: 5px;
   background: #000 url("gradient.gif") bottom left repeat-x;
}
th, td {
   width: 25%;
   text-align: left;
   vertical-align: top;
   border: 1px solid #000;
}
`;


const createSections = (
  secondText = "Hello, Upplabs! I'm a broken section!"
) => `
<section>
  <h1>Hello, Upplabs! I'm a first section!</h1>
</section>
<section>
  <h1>${secondText}</h1>
</section>
`;
