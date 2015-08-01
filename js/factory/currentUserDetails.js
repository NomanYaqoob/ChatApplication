/**
 * Created by Noman on 7/27/2015.
 */


angular.module("ChatApp")
.service("loggedInUser", function () {

        this.currentUser = "";
        this.setUser = function (user) {
            this.currentUser = user;
            console.log(this.currentUser);
        };

        this.getUser = function () {
            return this.currentUser;
        }
    });