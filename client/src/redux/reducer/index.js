/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */

const initialState = {
    dogs : [],
    allDogs: [], //  para que siempre tenga todos los personajes
    allTemperament:[],
    detail:[],
    deleteDog:[]
}
function rootReducer (state=initialState, action){
    switch(action.type){
        case 'GET_DOGS':
           return{
            ...state,
            // cuando dispare la accion me guarda en los dos : dogs y allDogs
            dogs: action.payload,
            allDogs: action.payload // guardo todos los personajes
           }
        case 'FILTER_CREATED':
            const allDogs =state.allDogs
            const createdFilter = action.payload === 'exis' ? allDogs.filter(el =>el.createInDb): allDogs.filter(el=> !el.createInDb)
            return{
                ...state,
                dogs: action.payload ==='All' ? state.allDogs: createdFilter
            }
        case 'GET_NAME':
            let filterNombre = action.payload === "" ? state.allDogs : 
            state.allDogs.filter((poke) => poke.name.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,
                // dogs:action.payload
                dogs: filterNombre
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                allTemperament:action.payload
            }
        case 'FILTER_TEMPERAMENT':
         
            const temperamentAll = state.allDogs
             console.log(state)
                const temperamentFiltered = action.payload === 'Todos' ? temperamentAll :
                temperamentAll.filter(el =>{
                    // el.temperament.includes(action.payload ))
                    if(el.temperament){
                        if( el.temperament.includes(action.payload)){
                            return el
                        }
                }return false;
                })
                console.log(temperamentFiltered)
            return{
                ...state,
                dogs:temperamentFiltered
            }
        case 'ORDER_BY_NAME':
            let sortedArr=action.payload ==="Asc" ?
                state.dogs.sort(function(a,b){// sort metodo de ordenamiento me compara sin son mayores
                    if(a.name > b.name){
                        return 1; 
                        }
                    if(b.name > a.name){
                        return -1;
                        }
                        return 0 ; // si son iguales los retorna =
                    }) :
                    // eslint-disable-next-line array-callback-return
                    state.dogs.sort(function (a,b){
                        if (a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                       return 0;
                    })
                    return{
                        ...state,
                        dogs: sortedArr
                    }
        case 'ORDER_PESO':
                const arrayOrden = action.payload ==='small' ?
                state.dogs.sort(function(a,b){
                    if(parseInt(a.weight) > parseInt(b.weight)){
                        return 1
                    }
                    if(parseInt(a.weight)< parseInt(b.weight)){
                        return -1
                    }
                    return 0
                }):
                state.dogs.sort(function(a,b){
                    if(parseInt(a.weight)> parseInt(b.weight)){
                        return -1
                    }
                    if(parseInt(a.weight)< parseInt(b.weight)){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    dogs:arrayOrden
                }
        case 'POSTDOGS':
            return{
                ...state,
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail:action.payload
            } 
        case 'GET_DELETE':
            //const eliminarDog = state.dogs.filter(el=>el.id !==action.payload)
            return {
                ...state,
                //allDogs:eliminarDog
            }
        case 'CLEAR':
            return{
                ...state,
                detail:action.payload
            }
       
           default:
           return state;
    }
}
export default rootReducer;