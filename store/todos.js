import firebase from "~/plugins/firebase";
const db = firebase.firestore();
const todoRef = db.collection("todos");

export const state = () => ({
  todos: []
});

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo);
  },
  upTotal(state, index) {
    state.todos[index].total++;
  },
  addDate(state, { index, today }) {
    state.todos[index].dates.push(today);
  },
  allDelete(state) {
    state.todos = [];
  }
};

export const actions = {
  fetchTodos({ commit }, userUid) {
    commit("allDelete");
    todoRef
      .doc(userUid)
      .collection("subTodos")
      .get()
      .then(res => {
        // console.log(res.data());
        res.forEach(doc => {
          // console.log(doc.data());
          commit("addTodo", doc.data());
        });
      })
      .catch(error => {
        console.log("error : " + error);
      });
  },
  upTotal({ commit }, { userId, index }) {
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(String(index + 1))
      .update({
        total: firebase.firestore.FieldValue.increment(1)
      })
      .then(docref => {
        commit("upTotal", index);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addDate({ commit }, { userId, index }) {
    const today = firebase.firestore.Timestamp.fromDate(new Date());
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(String(index + 1))
      .update({
        dates: firebase.firestore.FieldValue.arrayUnion(today)
      })
      .then(docref => {
        commit("addDate", { index, today });
      })
      .catch(err => {
        console.log(err);
      });
  },
  addTodo({ commit, state }, { userId, todo }) {
    const number = state.todos.length + 1;
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(String(number))
      .set({
        color: todo.color,
        dates: [],
        icon: todo.icon,
        title: todo.title,
        total: 0
      })
      .then(docRef => {
        console.log("成功");
        const newTodo = { todo, dates: [], total: 0 };
        commit("addTodo", newTodo);
        window.location.href = "/home";
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  },
  allDelete({ commit }) {
    commit("allDelete");
  }
};

export const getters = {
  getTodos(state) {
    return state.todos;
  }
};
