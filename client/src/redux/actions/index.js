// conexion back y front

import axios from 'axios';


// export function getDogs(){
//     return async function(dispacth){
//         var json = await axios.get("http://localhost:3001/dogs");
//         return dispacth({
//             type:'GET_DOGS',
//             payload: json.data
//         })
//     }
// }

// promesas
export function getDogs(){
    return async function(dispacth){
        try {
        axios.get("http://localhost:3001/dogs")
        .then((res)=>{
            return dispacth ({
                type:'GET_DOGS',
                payload: res.data
            })
        })
        } catch (error) {
            console.log(error)    
        }
        
    }
}
export function getTemperament(){
    return async function(dispacth){
        try {
            var info = await axios.get("http://localhost:3001/temperament")
            return dispacth({
                type: 'GET_TEMPERAMENTS',
                payload: info.data
            })
        } catch (error) {
            
        }
    }
}
export const filterTemperament = (temperament) => {
    return {
        type: 'FILTER_TEMPERAMENT',
        payload: temperament
    }
}
export function getNameDogs(name){
    try {
            
        return ({
            type:'GET_NAME',
            payload: name
        })
    } catch (error) {
        console.log(error)
    }
   
}
export function filterCreated(payload){
    console.log(payload)
    return {
        type:'FILTER_CREATED',
        payload
    }
}
export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}
export function postDogs(payload){
    return async function(dispatch){
        var response = await axios.post("http://localhost:3001/dogsCreate", payload);
        console.log(response)
        return response;
          
      } 
}
export function getDetail(id){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/dogs/'+id)
        return dispatch({
            type:"GET_DETAIL",
            payload: json.data,
        })
    }   
}
export function orderPeso(payload){
    return{
        type:'ORDER_PESO',
        payload
    }
}
export function deleteDog (id) {
    return async function (dispatch) {
      var res = await axios.delete(`http://localhost:3001/dogs/${id}`)
      return (
        dispatch({
          type: 'DELETE_DOG',
          payload: res.data
        })
      )
    }
  }
export function Clear(){
    return {
        type: "CLEAR",
        payload: []
    }
  }
  