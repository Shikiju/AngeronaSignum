<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>AngeronaSignum</title>
    <link rel="stylesheet" type="text/css" href="Content/Site.css" />
    <script src="Scripts/jquery-1.7.1.js"></script>
    <script src="Scripts/handlebars-1.0.0.beta.6.js"></script>
    <script src="Scripts/ember-1.0.pre.js"></script>
    <script src="Scripts/cryptjsaes.js"></script>
    <style>
        #feedback { font-size: 1.4em; }
        .ember-text-area { height:250px }
    </style>
    <script type="text/x-handlebars" data-template-name="mainEntity">
        <fieldset style="float:left">
        <legend>
            <span>Login</span>
        </legend>

        <form action="" method="post" name="loginform" id="login">
            <label for="mail">Email<span> (required)</span></label><a name="add"></a>
            {{view App.LoginEmailField name="loginEmail" 
                id="loginEmail" 
                valueBinding="user.email" }} 
            <label for="phone">Password<span> (required)</span></label>
            {{view App.LoginPasswordField name="loginPassword" 
                id="loginPassword" 
                valueBinding="user.password"}} 
        </form>
        <button tabindex="5" class="button" type="submit" name="submit" id="loginout" style="display:none">Logout</button>

        </fieldset>

        <fieldset style="float:left">
        <legend>
            <span>Entities</span>
        </legend>      
        
        <ul class="rounded-list">
        {{#each App.view.entities contentBinding="App.view.entity"}}
            {{view App.EntityListItem contentBinding="App.view.entity"}}
        {{/each}}
        </ul>
        </fieldset>

        <fieldset style="float:left">
        <legend>
            <span>AngeronaSignum</span>
        </legend>

        <form action="" method="post" name="entityform" id="entity" style="display:none">
            <label for="Name">Name <span>(required)</span></label><a name="name"></a>
            {{view App.EntityNameField name="Name" 
                                   id="Name" 
                                   valueBinding="App.view.entity.name" }} 
            <label for="login">Login <span>(required)</span></label><a name="login"></a>
            {{view App.EntityLoginField name="Login" 
                                    id="Login" 
                                    valueBinding="App.view.entity.login" }} 
            <label for="phone">Password</label>
            {{view App.EntityPasswordField name="Password" 
                                    id="Password" 
                                    valueBinding="App.view.entity.password" }} 
            <!--<button tabindex="5" class="button" type="submit" name="submit" id="send">Save</button>-->
        </form>
        </fieldset>

        <fieldset style="float:left">
        <legend>
            <span>Messages</span>
        </legend>

        {{view App.Messages name="messages" 
            id="messages" 
            valueBinding="App.view.messages" }} 
    </script>
    <script data-template-name="entity-listItem-view" type="text/x-handlebars">
      <a><span class="name">{{name}}</span></a>
    </script>

    <script src="/Scripts/entity.js"></script>
</head>
<body>
    <div id="mainEntity">
    </div>
</body>
</html>

 