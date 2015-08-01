/**
 * Created by Noman on 7/4/2015.
 */

angular.module("ChatApp")
.controller("LoginController", function (firebaseURL,$location,$mdDialog,loggedInUser,$firebaseArray) {

        var ref = new Firebase(firebaseURL).child("customUser");
        this.users = $firebaseArray(ref);
        var invalidEORP = false;
        this.Login = function (view,ev) {
                    angular.forEach(this.users, function (user,key) {
                        console.log(key,user.firstName);
                        if(user.email == this.currentUser.email && user.password == this.currentUser.password) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Welcome')
                                    .content('Press okay to redirect to main page')
                                    .ok('Ok')
                                    .targetEvent(ev)
                            );
                            invalidEORP = false;
                            loggedInUser.setUser(user);
                            //console.log(loggedInUser);
                            $location.path(view);

                        }
                        else {
                            invalidEORP = true;
                        }
                    },this);
            if(invalidEORP) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Alert')
                        .content('Email or password is incorrect')
                        .ok('Ok')
                        .targetEvent(ev)
                );
            }
        }
    });