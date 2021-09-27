import { GET_VOITURES,VOITURE_ADD,VOITURE_REMOVE, VOITURE_EDIT,VOITURE_LOADING, VOITURE_ERROR, ADD_COMMENT, GET_VOITURE} from '../actions/types'

const initState={
    voitures:[],
    voiture:null,
    loading:true,
    error:{}
    
}
 
export default function (state=initState,action){

    switch(action.type){
        case GET_VOITURES:
            
            return{
            ...state,
            voitures: action.payload,
            loading:false
            };

        case GET_VOITURE:
           return {
            ...state,
            voiture: action.payload,
            loading: false
         };

        case VOITURE_ADD:
            
            return{
            ...state,
            voitures:[...state.voitures,action.payload],
            loading: false
        }
            
        case VOITURE_REMOVE:
            
            return{
                ...state,
                voitures:state.voitures.filter(el=>(el._id!==action.payload)),
                loading: false

             }
        case VOITURE_ERROR:
            return {
                     
            ...state,
            error: action.payload,
            loading: false
        };        
                    
        case VOITURE_EDIT:
            
           return{
            ...state,
            voitures:[...state.voitures.map(el=>el._id===action.payload.id?
                     {...el,...action.payload.newVoiture}
                     :el)]}
                     
         case VOITURE_LOADING:
                        
                    return{...state,
                    loading:true
                }

         case ADD_COMMENT:
             return {
             ...state,
             voiture: { ...state.voiture, comment: action.payload },
             loading: false

             };
         

        default: return state
        }}