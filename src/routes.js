


class Base extends Component {
    render() {
        return (
          <Router>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/topics">Topics</Link></li>
              </ul>

            <hr/>

            <Route exact path="/" component={Main}/>
          <MuiThemeProvider>
            <Route path="/login" component={Login}/>
          </MuiThemeProvider>
          </div>
        </Router>
        );
    }
}
