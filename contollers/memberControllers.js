let memberController = module.exports;

memberController.home = (req, res) => {
    console.log("Get cont.home");
    res.send("home page");
};

memberController.signup = (req, res) => {
    console.log("Post cont.signup");
    res.send("signup page");
};

memberController.login = (req, res) => {
    console.log("Post cont.login");
    res.send("login page");
};

memberController.logout = (req, res) => {
    console.log("Get cont.logout");
    res.send("logout page");
};