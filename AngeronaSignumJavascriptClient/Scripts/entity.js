var App = Em.Application.create({
});

App.User = Ember.Object.extend({
  email: 'koenvbaast25@gmail.com',
  hashedEmail: function() {
    return CryptoJS.AES.encrypt(this.get('email'), "TEMPHASH");
  },
  password: '',
  hashedPassword: function () {
    return CryptoJS.AES.encrypt(this.get('password'), "TEMPHASH");
  },
  login: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': this.get('email'),
        'AngeronaSignum-Password': this.get('password')
      },
      type: 'POST',
      contentType: 'application/json',
      dataType: "json",
      url: "http://localhost:49708/api/authentication",
      success: function (data) {
        $('#entity').show(500);
      }
    });
  }
});

App.Entity = Ember.Object.extend({
  name: 'Koen',
  email: 'koenvbaast25@gmail.com',
  password: 'koen25',
  passwordHash: function() {
    return CryptoJS.AES.encrypt(this.get('password'), "TEMPHASH");
  },
  save: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': this.get('email'),
        'AngeronaSignum-Password': this.get('password')
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

var view = Ember.View.create({
  templateName: 'mainEntity',
  entity: App.Entity.create(),
  user: App.User.create()
});

view.entity.addObserver('name', function (a, b, c) {
  view.entity.save();
});

view.entity.addObserver('email', function (a, b, c) {
  view.entity.save();
});

view.user.addObserver('email', function (a, b, c) {
  console.log('email changed!');
  view.user.login();
})

view.user.addObserver('password', function (a, b, c) {
  console.log('password changed!');
  view.user.login();
})

App.MyNameField = Ember.TextField.extend({
});

App.MyEmailField = Ember.TextField.extend({
});

App.LoginEmailField = Ember.TextField.extend({
});

App.LoginPasswordField = Ember.TextField.extend({
});

view.appendTo('#mainEntity');


