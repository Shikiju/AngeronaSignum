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
  alertMyName: function () {
    alert(this.name);
  }
});
var view = Ember.View.create({
  templateName: 'mainEntity',
  entity: Person.create()
});

view.entity.addObserver('name', function (a, b, c) {
  console.log(this.name);
  console.log(view.entity.get('name'));
  this.whatmaname();
})

App.MyNameField = Ember.TextField.extend({
});

App.MyEmailField = Ember.TextField.extend({
});

view.appendTo('#mainEntity');


