import React from 'react';
import './Dashboard.css'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import OnBoarding from '../OnBoarding/index.js'
import Home from '../Home/Home.js'
import Menu from '../Menu/Menu.js'
import NewTask from '../NewTask/NewTask.js'
import TaskList from '../TaskList/index.js'
import Profile from '../Profile/Profile.js'
import Spinner from '../Spinner/Spinner.js'
// import { getTASKS } from "../../actions.js";


class Dashboard extends React.Component {

  // componentDidMount() {
  //   this.props.getTASKS(this.props.userData.id);
  // }

  render() {
    return (
      <>
        {this.props.isLoading ? <Spinner /> :
          <div className="dashboard">
            <div className="nav">
              <Menu />
            </div>
            <div className="appRoutes">
              <Route
                path="/onboarding"
                render={props => <OnBoarding {...props} />}
              />

              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/NewTask" render={props => <NewTask {...props} />} />
              <Route path="/taskList" render={props => <TaskList {...props} />} />
              <Route path="/taskModal" render={props => <Home {...props} />} />
              <Route path="/profile" render={props => <Profile {...props} />} />
            </div>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userTasks: state.userTasks,
  userData: state.userData,
  isLoading: state.isLoading,
})

const mapDispatchToProps = {
  // getTASKS,
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));