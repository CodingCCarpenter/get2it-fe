import {
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED,
  UPDATE_TASK_START,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

} from './actions.js'

const dummyTasks = [
  {
    name: 'Go to the grocery store.',
    date: '11/13/2019',
    task_icon: '<i id="icon" className="fas fa-shopping-cart icon"></i>',
    start_time: '9am',
    end_time: '11am',
    status: false,
  },
  {
    name: 'Work out.',
    date: '11/13/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: false,
  },
  {
    name: 'Work out.',
    date: '11/9/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: false,
  },
  {
    name: 'Work out.',
    date: '11/14/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: false,
  },
  {
    name: 'Work out.',
    date: '11/8/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: true,
  },
  {
    name: 'Work out.',
    date: '11/8/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: true,
  },
  {
    name: 'This is to test out a long task name, but I am sure it will work just fine.',
    date: '11/14/2019',
    task_icon: '<i id="icon" className="fas fa-heartbeat icon"></i>',
    start_time: '1pm',
    end_time: '2pm',
    status: false,
  },

]

const initialState = {
  isLoading: false,
  error: null,
  userData: {},
  userTasks: dummyTasks,
  userID: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_USER_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
        userID: action.payload.id,
        error: null,
      }
    }
    case CREATE_USER_FAILED: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGIN_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
        userID: action.payload.id,
        error: null
      };
    }
    case LOGIN_FAILED: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case GET_TASKS_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_TASKS_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: null,
        userTasks: action.payload
      }
    }
    case GET_TASKS_FAILED: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case UPDATE_TASK_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_TASK_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: null,
        userTasks: action.payload
      }
    }
    case UPDATE_TASK_FAILED: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case UPDATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_USER_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: null,
        userData: action.payload
      }
    }
    case UPDATE_USER_FAILED: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    default:
      return state
  }
}