import api from "./examination_api";



export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL',
}

export const fetchAll = () => {
    return dispatch => {
        api.examination().fetchAll()
        .then(
            response => {
                console.log(response)
                dispatch({
                    type:ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        ).catch(err => console.log(err))
        //..
    }
}

export const create = (data, onSuccess) => dispatch => {
    api.examination().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const update = (id, data, onSuccess) => dispatch => {
    api.examination().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: {id:id, ...data}
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const delete_exam = (id, onSuccess) => dispatch => {
    api.examination().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}





