var App = Em.Application.create({
  //rootElement: '#mainEntity'
});

var textArea = Ember.TextArea.create({
  valueBinding: 'Person.fullname'
});

Person = Ember.Object.extend({
  name: 'Koen',
  email: 'koenvbaast25@gmail.com',
  password: 'koen25',
  passwordHash: function() {
    return CryptoJS.AES.encrypt(this.get('password'), "TEMPHASH");
  },
  save: function () {
    $.ajax({
      headers: {
        'AngeronaSignum-Email': 'koenvbaast25@gmail.com',
        'AngeronaSignum-Password': 'koen25'
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
  entity: Person.create()
});

view.entity.addObserver('name', function (a, b, c) {
  console.log(view.entity.get('name'));
  console.log(view.entity.get('passwordHash')); 
  var decrypted = view.entity.get('passwordHash');
  console.log(JSON.stringify(view.entity.getProperties('name', 'email', 'passwordHash')));
  view.entity.save();
})

App.MyNameField = Ember.TextField.extend({
});

App.MyEmailField = Ember.TextField.extend({
});

view.appendTo('#mainEntity');


