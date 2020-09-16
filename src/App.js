import Header from './components/ui/Header';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <div>Home</div>} />
          <Route exact path='/services' render={() => <div>services</div>} />
          <Route exact path='/web-development' component={() => <div>web-development</div>} />
          <Route exact path='/mobile' component={() => <div>mobile Development</div>} />
          <Route
            exact
            path='/custom-software'
            component={() => <div>custom-software Development</div>}
          />
          <Route path='/the-revolution' component={() => <div>the-revolution</div>} />
          <Route exact path='/about-us' component={() => <div>about-us</div>} />
          <Route exact path='/contact-us' component={() => <div>contact-us</div>} />
          <Route exact path='/estimate' component={() => <div>Estimate</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
