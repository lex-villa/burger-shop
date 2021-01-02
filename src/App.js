import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';


function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path='/checkout' render={() => <Checkout />} />
            <Route path='/orders' render={() => <Orders />} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;