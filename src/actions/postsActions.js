import Axios from 'axios';
import { GET_POSTS_PER_USER , LOADING, ERROR} from '../types/postsTypes';

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

    
    dispatch({
        type: GET_POSTS_PER_USER,
        payload: posts_updated,
    })

}