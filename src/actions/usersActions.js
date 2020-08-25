import Axios from "axios";
import { GET_ALL, LOADING , ERROR} from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
        
        dispatch({
            type: GET_ALL,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Algo salió mal intente más tarde'
        })
    }
}