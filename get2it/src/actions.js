import axios from 'axios'

export const CREATE_USER_START = 'CREATE_USER_START'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const GET_TASKS_START = 'GET_TASKS_START'
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const GET_TASKS_FAILED = 'GET_TASKS_FAILED'

export const UPDATE_TASK_START = 'UPDATE_TASK_START'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED'

export const UPDATE_USER_START = 'UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'


export function createUser(username, password) {
  return (dispatch) => {
    dispatch({ type: CREATE_USER_START })

    return axios.post('https://get2it.herokuapp.com/api/auth/register', { username, password })
      .then((res) => {
        setTimeout(() => {
          localStorage.setItem('token', res.data.token)
          dispatch({ type: CREATE_USER_SUCCESS, payload: res.data.user })
        }, 2000);
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: CREATE_USER_FAILED, payload })
      })
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_START })

    return axios.post('https://get2it.herokuapp.com/api/auth/login', { username, password })
      .then((res) => {
        setTimeout(() => {
          localStorage.setItem('token', res.data.token)
          dispatch({ type: LOGIN_SUCCESS, payload: res.data.user })
        }, 2000);
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

export function getTASKS(id) {
  return (dispatch) => {
    dispatch({ type: GET_TASKS_START })

    const headers = {
      Authorization: localStorage.getItem('token'),
    }
    console.log(headers);

    axios.get(`https://get2it.herokuapp.com/api/users/${id}/tasks`, { headers })
      .then((res) => {
        console.log(res)
        dispatch({ type: GET_TASKS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: GET_TASKS_FAILED, payload: err.response.data })
      })
  }
}

export function updateTask(payload, id){
  return (dispatch) => {
    dispatch({ type: UPDATE_TASK_START })

    const headers = {
      Authorization: localStorage.getItem('token'),
    }

    axios.put(`https://get2it.herokuapp.com/api/users/tasks/${id}`, payload, { headers })
      .then((res) => {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: UPDATE_TASK_FAILED, payload: err.response.data })
      })
  }
}

export function updateUser(payload, id) {
  return dispatch => {
    dispatch({ type: UPDATE_USER_START });

    const headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .put(`https://get2it.herokuapp.com/api/auth/edit-profile/${id}`, payload, { headers })
      .then(res => {
        setTimeout(() => {
          dispatch({ type: UPDATE_USER_SUCCESS, payload: payload, id: id });
        },2000)
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_USER_FAILED, payload: err.response.data });
      });
  };
}
