import React from "react";
import { render } from "react-dom";
import { getSnapshot, types } from "mobx-state-tree";
// import { observer } from "mobx-react";

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setName(newName: string) {
      self.name = newName;
    },

    toggle() {
      self.done = !self.done;
    },
  }));

const User = types.model({
  name: types.optional(types.string, ""),
});

const john = User.create();
const eat = Todo.create({ name: "new eat" });

const RootStore = types
    .model({
        users: types.map(User),
        todos: types.map(Todo)
    })
    .actions(self => ({
        addTodo(id: any, name: string) {
            self.todos.set(id, Todo.create({ name }))
        }
    }))

const store = {
  users: {},
};

console.log("John:", getSnapshot(john));
console.log("Eat TODO:", getSnapshot(eat));

render(
  <div>
    John: {JSON.stringify(getSnapshot(john))}
    <br />
    Eat TODO: {JSON.stringify(getSnapshot(eat))}
  </div>,
  document.getElementById("root")
);
