import firebase from "~/plugins/firebase";
const db = firebase.firestore();
const todoRef = db.collection("todos");

export const state = () => ({
  todos: []
});

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo);
  }
};

export const actions = {
  fetchTodos({ commit }, userUid) {
    todoRef
      .doc(userUid)
      .get()
      .then(res => {
        if (res.data() === undefined) return;
        res.data().todos.forEach(doc => {
          commit("addTodo", doc);
        });
      })
      .catch(error => {
        console.log("error : " + error);
      });
  },
  upTotal({ commit }, userId, index) {
    // console.log(todo);
    // todoRef
    //   .doc(userId)
    //   .update({
    //       "todos[].total": firebase.firestore.FieldValue.increment(1),
    //   })
    //   .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //     commit("addTodo", todo);
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
  }
};

export const getters = {
  getTodos(state) {
    return state.todos;
  }
};
