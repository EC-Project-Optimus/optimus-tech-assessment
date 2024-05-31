import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '123',
      userData: null,
      loading: true
    };
  }

  componentDidMount() {
    fetch(`https://api.example.com/users/${this.state.userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data, loading: false });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, userData } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>User Profile</h1>
        {userData ? (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    );
  }
}

export default UserProfile;
