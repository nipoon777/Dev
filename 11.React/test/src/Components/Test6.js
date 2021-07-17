
ReactDOM.render((
    <Router>
    <div>
    <Route path="/" render={Home} />
    <Route path="/login" render={Login} />
    </div>
    </Router>),
    document.getElementById('root')
    );

    // Home and Login Page because we didnt apply any check and it will do pattern matching