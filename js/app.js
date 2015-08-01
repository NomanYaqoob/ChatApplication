/**
 * Created by Noman on 7/2/2015.
 */



angular.module("ChatApp",['ngNewRouter','ngMdIcons','ngMaterial','firebase'])
    .constant("firebaseURL","https://netchat.firebaseio.com/")
    .value("loggedInUser","")
.controller("MainCtrl", function ($router,loggedInUser ) {

        this.currentUserLogged = loggedInUser.getUser();
        console.log(this.currentUserLogged);
        this.customUser = {};
        //this.homeFunc = function () {
        //    console.log($router);
            $router.config([
                {path:"/",redirectTo:"/signup"},
                {path:"/home",component:"home"},
                {path:"/login",component:"login"},
                {path:"/signup",component:"signup"},
                {path:"/findfriend",component:"findfriend"}
                //{path:"/edit",component:"edit"}
            ]);
        //}



    });