# Vue Cheatsheet

Only the snippets

## Essentials

* import vue.js

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

* Output a Value `{{message}}`
* Conditional Output `v-if=seen`
* Loop `v-for="todo in todos"`
* On Click `v-on:click="reverseMessage"`
* Component

```js
Vue.component('component-name', {
    template: '<li>This is a todo</li>'
});
```

```html
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
```

* Passing Data into Component

```js
Vue.component('todo-item', {
    template: '<li>{{todo.text}}</li>',
    props: ['todo']
});
```

* Passing Data into Component With Iteration

```html
<todo-item
    v-for="item in collection"
    v-bind:todo="item"
    v-bind:key="item.id"
>
</todo-item>
```

## Reusability and Composition

### Mixins

* create Mixins

```js
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// define a component that uses this mixin
var Component = Vue.extend({
  mixins: [myMixin]
})


var component = new Component() // => "hello from mixin!"

```
