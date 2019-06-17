import React from 'react';

import { withAuthorization } from '../Session';
import ListCreate from '../ListCreate';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <ListCreate />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);