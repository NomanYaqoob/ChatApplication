/**
 * Created by Noman on 7/4/2015.
 */


angular.module("ChatApp")
.controller("HomeController", function ($firebaseArray,firebaseURL,$firebaseObject,loggedInUser,$timeout) {
        var refChatOfSender = "";
        this.userIsFromFacebook = false;
        var ref = new Firebase(firebaseURL).child('customUser');
        this.enableChatStart = true;
        var refChat = new Firebase(firebaseURL).child("messages");
        var ref2 = new Firebase(firebaseURL).child('users');
        this.userFromCustomLogin = $firebaseArray(ref);
        this.userFromFacebook =  $firebaseObject(ref2);
        var generalRef = new Firebase(firebaseURL);
        this.msgs = [];
        this.myUser = loggedInUser.getUser();
        var currentChatId;

        this.startChat = function (newFriendId) {
            //console.log(newFriendId);
            //this.chatNode = $firebaseArray(refChat);



            if(this.myUser.uid != undefined)
                generalRef = generalRef.child("message-ref").child(this.myUser.uid).child(newFriendId);
            else
                generalRef = generalRef.child("message-ref").child(this.myUser.$id).child(newFriendId);

            generalRef.once("value", function (snapshot) {
                if(snapshot.exists()) {
                    alert("exists");
                    currentChatId = snapshot.val();
                    for(var obj in currentChatId){
                        currentChatId = currentChatId[obj];
                        console.log(currentChatId);
                    }
                    this.msgs = $firebaseArray(refChat.child(currentChatId));
                }
                else {
                    alert("not exists");
                    var abc = refChat.push({abc:"abc"});
                    currentChatId = abc.key();
                    console.log(currentChatId);
                    generalRef.push(currentChatId)
                }
                //console.log(snapshot.val())
            },this);
            /*
            this.chatNode.$add({abc: "xyz"}).then(function (ref) {
                currentChatId = ref.key();
            });*/
            console.log(currentChatId);
           /* if(this.myUser.uid != undefined){
                refChatOfSender = new Firebase(firebaseURL).child("messagesRef").child(this.myUser.uid);
                this.userIsFromFacebook = true;
            }
            else {
                refChatOfSender = new Firebase(firebaseURL).child("messagesRef").child(this.myUser.$id);
                this.userIsFromFacebook = false;
            }
            var refChatOfReceiver = new Firebase(firebaseURL).child("messagesRef").child(newFriendId);


            this.msgRef = $firebaseArray(refChatOfSender);

            //this.msgRef.friends = newFriendId;
            //this.msgRef.$save();
            this.msgRef.$add({friendId: newFriendId});
            this.refReceiver = $firebaseArray(refChatOfReceiver);
            if(this.userIsFromFacebook) {
                //this.refReceiver.friends = myUser.uid;
                this.refReceiver.$add({friendId: this.myUser.uid});
            }
            else {
                this.refReceiver.$add({friendId: this.myUser.$id});
            }*/

            //this.refReceiver.$save();
            //this.msgs = $firebaseArray(refChat.child(currentChatId));
            this.enableChatStart = false;
        };





        this.push = function () {
            //this.chatNode[currentChatId].members.push({msg:this.msg,time: new Date()});



            refChat.child(currentChatId).push({
                msg:this.msg,
                time: new Date().toString()
            });

            //this.msgArray = $firebaseArray(refChat.child(currentChatId));
            //this.msgArray.$add({msg:this.msg,time: new Date()});
               /* var d = new Date();
            var refNewChat = new Firebase(firebaseURL).child("chatBox");
            this.chatId = $firebaseArray(refNewChat);


             angular.forEach(this.chatId, function (chat,key) {
             var msgNew = this.baseUrl + "messages/" + chat.$id + "/";
             console.log(msg);
                 if(this.chatId == chat.$id) {
                     var messagesNode = $firebaseArray(new Firebase(msgNew));
                     //messagesNode.$loaded().then(function () {
                     if(this.userFromFacebook)
                     {
                         messagesNode.$add({
                             uid: loggedInUser.getUser().email,
                             message: this.msg,
                             timeStamp : d.toTimeString(),
                             image: myUser.facebook.cachedUserProfile.picture.data.url
                         });
                     }
                     else {
                         messagesNode.$add({
                             uid: loggedInUser.getUser().email,
                             message: this.msg,
                             timeStamp : d.toTimeString(),
                             image: "http://www.funddreamsindia.com/images/avatar.jpg"
                         });
                     }
                 }
             //});
             },this);
            this.msgs = "";



            if(this.userFromFacebook)
            {
                this.msgs.push({
                        uid: loggedInUser.getUser().email,
                        message: this.msg,
                        timeStamp : d.toTimeString(),
                        image: myUser.facebook.cachedUserProfile.picture.data.url
                });
                this.msg = "";
            }
            else {
                this.msgs.push({
                    uid: loggedInUser.getUser().email,
                    message: this.msg,
                    timeStamp : d.toTimeString(),
                    image: "http://www.funddreamsindia.com/images/avatar.jpg"
                });
                this.msg = "";
            }*/
        };
    });