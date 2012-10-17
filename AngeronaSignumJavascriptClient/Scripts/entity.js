var App = Em.Application.create({
  //rootElement: '#mainEntity'
});

var textArea = Ember.TextArea.create({
  valueBinding: 'Person.fullname'
});

Person = Ember.Object.extend({
  // these will be supplied by `create`
  name: 'Koen',
  email: 'koenvbaast25@gmail.com',
  password: 'koen25',
  save: function () {
    // assuming you are using jQuery, but could be other AJAX/DOM framework
    $.post({
      url: "http://localhost:50000/",
      data: JSON.stringify(this.toArray()),
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
  console.log(this.name);
  console.log(view.entity.get('name'));
  console.log(view.entity.get('email'));
  console.log(view.entity.get('password'));
})

App.MyNameField = Ember.TextField.extend({
});

App.MyEmailField = Ember.TextField.extend({
});

view.appendTo('#mainEntity');


