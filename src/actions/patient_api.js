import  axious from 'axios';

const baseUrl = "http://localhost:5118/api/";


export default { 
    patient(url=baseUrl + 'patient/'){
        return {
            fetchAll : () => axious.get(url),
            fetchById : id => axious.get(url + id),
            create : newRecord => axious.post(url, newRecord),
            update : (id, updatedRecord)  => axious.put(url + id, updatedRecord),
            delete : id => axious.delete(url+id)
        }
    }
}