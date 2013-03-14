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
        App.view.loadEntities();
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
  saveNew: function () {
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
        App.view.set('messages', 'Entity saved!');
      }
    });
  },
  deleteEntity: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': App.view.user.get('email'),
        'AngeronaSignum-Password': App.view.user.get('password')
      },
      type: 'delete',
      contentType: 'application/json',
      dataType: "json",
      url: "http://localhost:49708/api/entity",
      data: JSON.stringify(this.getProperties('id', 'name', 'login', 'passwordHash')),
      success: function (data) {
        // your data should already be rendered with latest changes
        // however, you might want to change status from something to "saved" etc.
        App.view.set('messages', 'Entity deleted!');
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
  user: App.User.create(),
  registerButtons: function () {  
    $('#loginout').on('click', function () {
      console.log('click logout!');
      App.view.set('entity', App.Entity.create());
      App.view.set('entities', []);
      $('#loginout').hide(500);
      $('#newEntity').hide(500);
      $('#deleteEntity').hide();
      $('#entity').hide(500);
      $('#login').show(500);
    });
    $('#newEntity').on('click', function () {
      
    });
    $('#deleteEntity').on('click', function () {
      console.log('deleting entity: ', App.view.entity);
      App.view.entity.deleteEntity();
      App.view.loadEntities();
    });
  },
  loadEntities: function () {
    App.view.set('messages', 'login successfull, loading entities!');
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
        console.log('data: ', data);
        var array = [];
        $.each(data, function (index, item) {
          array.push(App.Entity.create(item));
        });
        App.view.set('entities', array);
        $('#selectable').show();
        $('#loginout').show();
        $('#newEntity').show();
        $('#deleteEntity').show();
        App.view.registerButtons();
      }
    });
  }
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
