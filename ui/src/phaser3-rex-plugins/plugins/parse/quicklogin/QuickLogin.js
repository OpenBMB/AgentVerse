var QuickLogin = function (userName, password) {
    return Parse.User.logOut() // // Log-out first
        .then(function () {
            return Parse.User.logIn(userName, password); // Try login
        })
        .catch(function () {  // Login fail, try sign-up, then login again
            return SignUpThenLogin(userName, password);
        })
}

var SignUpThenLogin = function (userName, password) {
    var user = new Parse.User();
    user
        .set('username', userName)
        .set('password', password);

    return user.signUp()
        .then(function () {  // Sign up success, try login again                        
            return Parse.User.logIn(userName, password);
        })
}

export default QuickLogin;