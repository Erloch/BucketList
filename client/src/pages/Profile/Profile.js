import React, { Component } from "react";
import "./Profile.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import yourList from "../YourList"


class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
        userID: this.props.userID

    }

    
    componentDidMount() {
        console.log(this.state);

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                }, () => {
                    API.getUserBucket(this.state.user._id).then(
                        res => this.setState({
                            user: res.data
                        })
                    ).catch(err => console.log(err));

                });
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props.userID)
    }

    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                    </div>
                   
                ) : (
                        <div className="noUser">
                            {!this.state.loading ? (
                                <>
                                    <h1>please log in</h1>
                                    <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                                </>
                            ) : (
                                    <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                                )}
                        </div>
                    )}
            </div>
        )
    }
}


export default Profile;