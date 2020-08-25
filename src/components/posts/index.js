import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';


const { getAll: getAllUsers} = usersActions;
const { getById: getPostById} = postsActions;

class Posts extends Component {
    async componentDidMount() {
        const {
            getAllUsers,
            getPostById,
            match: { params: { key } }
        } = this.props;

        //Si no hay usuarios entonces los trae
        if(!this.props.usersReducer.users.length){
            await getAllUsers();
        }

        if(this.props.usersReducer.error){
            return
        }
        //Si no hay un usuarios con comentarios de dicha key lo manda llamar
        if(!('posts_key' in this.props.usersReducer.users[key])){
            getPostById(key) 
        }  
    }

    putUser = () => {
        const { 
            usersReducer,
            match: { params: { key } }
        } = this.props

        if(usersReducer.error){
            return <Fatal message={usersReducer.error}/>
        }

        if(!usersReducer.users.length || usersReducer.loading) { 
            return <Spinner />
        }

        const name = usersReducer.users[key].name

        return(
            <h1>
                Publicaciones de {name}
            </h1>  
        )
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.putUser()}
            </div>
        );
    }
}

const mapStateToProps = ({ usersReducer, postsReducer }) => {
    return {
        usersReducer,
        postsReducer
    };
}

const mapDispatchToProps = {
    getAllUsers,
    getPostById
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);