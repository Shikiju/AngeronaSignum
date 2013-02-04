var App = Em.Application.create({
});

App.User = Ember.Object.extend({
  email: 'koenvbaast25@gmail.com',
  hashedEmail: function() {
    return CryptoJS.AES.encrypt(this.get('email'), "TEMPHASH");
  },
  password: 'koen2',
  hashedPassword: function () {
    return CryptoJS.AES.encrypt(this.get('password'), "TEMPHASH");
  },
  login: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': this.get('email'),
        'AngeronaSignum-Password': this.get('password')
      },
      type: 'GET',
      contentType: 'application/json',
      dataType: "json",
      url: "http://localhost:49708/api/authentication/index",
      success: function (data) {
        $('#entity').show(500);
        $('#login').hide(500);
        $.ajax({
          headers: {
            'AngeronaSignum-Email': App.view.user.get('email'),
            'AngeronaSignum-Password': App.view.user.get('password')
          },
          type: 'GET',
          contentType: 'application/json',
          dataType: "json",
          url: "http://localhost:49708/api/entity",
          success: function (data) {
            var array = [];
            $.each(data, function (index, item) {
              array.push(App.Entity.create(item));
            });
            App.view.set('entities', array);
            $('#selectable').show();
            $('#loginout').show();
            $('#loginout').on('click', function () {
              App.view.set('entity', App.Entity.create());
              App.view.set('entities',[]);
              $('#loginout').hide(500);
              $('#login').show(500);
            });
          }
        });
      },
      error: function (error) {
        App.view.set('messages', error.responseText);
      }
    });
  }
});

App.Entity = Ember.Object.extend({
  name: '',
  login: '',
  password: '',
  passwordHash: function() {
    return CryptoJS.AES.encrypt(this.get('password'), "TEMPHASH");
  },
  save: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': App.view.user.get('email'),
        'AngeronaSignum-Password': App.view.user.get('password')
      },
      type: 'POST',
      contentType: 'application/json',
      dataType: "json",
      url: "http://localhost:49708/api/entity",
      data: JSON.stringify(this.getProperties('name', 'login', 'passwordHash')),
      success: function (data) {
        // your data should already be rendered with latest changes
        // however, you might want to change status from something to "saved" etc.
      }
    });
  },
  nameChanged: function () {
    App.view.entity.save();
  }.observes('name'),
  emailChanged: function () {
    App.view.entity.save();
  }.observes('login'),
  passwordChanged: function () {
    App.view.entity.save();
  }.observes('password')
});

App.view = Ember.View.create({
  templateName: 'mainEntity',
  entities: [],
  entity: App.Entity.create(),
  messages: 'Messages will appear here',
  user: App.User.create()
});

App.EntityListItem = Ember.View.extend({
  tagName: "li",
  templateName: "entity-listItem-view",
  click: function(e){
    // handle the view click here
    App.view.set('entity', this.get('context'));
  }
});

App.view.user.addObserver('email', function (a, b, c) {
  App.view.user.login();
})

App.view.user.addObserver('password', function (a, b, c) {
  App.view.user.login();
})

App.EntityNameField = Ember.TextField.extend({
});

App.EntityLoginField = Ember.TextField.extend({
});

App.EntityPasswordField = Ember.TextField.extend({
});

App.LoginEmailField = Ember.TextField.extend({
});

App.LoginPasswordField = Ember.TextField.extend({
});

App.Messages = Ember.TextArea.extend({
});

App.view.appendTo('#mainEntity');
