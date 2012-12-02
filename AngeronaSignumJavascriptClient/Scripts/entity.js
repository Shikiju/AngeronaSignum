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
      url: "http://localhost:49708/api/authentication",
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
            console.log(data);
            App.view.set('entities', data);
            $('#selectable').show();
            $('#loginout').show();
            //console.log(App.view.get("entities"));
            console.log(App.view.get("entity"));
          }
        });
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
      data: JSON.stringify(this.getProperties('name', 'email', 'passwordHash')),
      success: function (data) {
        // your data should already be rendered with latest changes
        // however, you might want to change status from something to "saved" etc.
      }
    });
  }
});

App.view = Ember.View.create({
  templateName: 'mainEntity',
  entities: [],
  entity: App.Entity.create(),
  user: App.User.create()
});

App.view.entity.addObserver('name', function (a, b, c) {
  App.view.entity.save();
});

App.view.entity.addObserver('email', function (a, b, c) {
  App.view.entity.save();
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

App.LoginEmailField = Ember.TextField.extend({
});

App.LoginPasswordField = Ember.TextField.extend({
});

App.view.appendTo('#mainEntity');


