import React, { useEffect } from 'react';

import Spinner from '../../components/general/Spinner';
import Fatal from '../../components/general/Fatal';
import Table from './Table';

import { connect } from  'react-redux';
import * as usersActions from '../../actions/usersActions';

const UsersApp = (props) => {
const { getAll, loading, error, users } = props

  useEffect(() => {
    if(!users.length){
      getAll();
    }
  }, [getAll, users])

  

  const putContent = () => {
    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <Fatal message={error}/>;
    }
    return <Table />;
  }
  return (
    <div>
      {putContent()}
    </div >
  );
}

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(UsersApp);
