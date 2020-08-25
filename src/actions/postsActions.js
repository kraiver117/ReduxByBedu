import Axios from 'axios';
import { GET_POSTS_PER_USER , LOADING, ERROR} from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: getAllUsers } = usersTypes;

export const getById  = (key) => async(dispatch, getState) => {
    //Get all users from the reducer
    const { users } = getState().usersReducer;
    const { posts } = getState().postsReducer;
    const user_id = users[key].id ;


    const response = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

    const posts_updated = [
        //A las publicaciones que existen le vamos añadiendo las que vamos consiguiendo
        ...posts, 
        response.data
    ];

    //Se obtiene el key de cada posts 
    const posts_key = posts_updated.length - 1;

    //Se crea un nuevo arreglo con ...users
    const users_updated = [...users];

    users_updated[key] = {
        ...users[key],
        posts_key
    }

    dispatch({
        type: getAllUsers,
        payload:users_updated
    })
    
    dispatch({
        type: GET_POSTS_PER_USER,
        payload: posts_updated,
    })

}