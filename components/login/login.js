/**
 * Created by Noman on 7/4/2015.
 */

angular.module("ChatApp")
.controller("LoginController", function (firebaseURL,$location,$mdDialog) {

        this.Login = function (view,ev) {
            var ref = new Firebase(firebaseURL);
            ref.authWithPassword({
                email: this.customUser.email,
                password: this.customUser.password
            }, function (error, authData) {
                if (error) {
                    console.log("error logging in");
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Hang On')
                            .content('Username or password incorrect')
                            .ok('Ok')
                            .targetEvent(ev)
                    );
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Welcome')
                            .content('Press okay to redirect to main page')
                            .ok('Ok')
                            .targetEvent(ev)
                    );
                    $location.path(view)
                }
            }, {
                remember: "sessionOnly"
            });
        }
    });