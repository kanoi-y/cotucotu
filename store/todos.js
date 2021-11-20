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
  updateTodo(state, { todo, documentId }) {
    state.todos.forEach((td, index) => {
      if (td.id === documentId) {
        console.log(td);
        state.todos.splice(index, 1, {...todo, id: documentId });
      }
    });
  },
  upTotal(state, documentId) {
    state.todos.forEach(todo => {
      if (todo.id === documentId) {
        todo.total++;
      }
    });
  },
  addDate(state, { documentId, today }) {
    state.todos.forEach(todo => {
      if (todo.id === documentId) {
        todo.dates.push(today);
      }
    });
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
        res.forEach(doc => {
          commit("addTodo", {...doc.data(), id: doc.id });
        });
      })
      .catch(error => {
        console.log("error : " + error);
      });
  },
  upTotal({ commit }, { userId, documentId }) {
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(documentId)
      .update({
        total: firebase.firestore.FieldValue.increment(1)
      })
      .then(docref => {
        commit("upTotal", documentId);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addDate({ commit }, { userId, documentId }) {
    const today = firebase.firestore.Timestamp.fromDate(new Date());
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(documentId)
      .update({
        dates: firebase.firestore.FieldValue.arrayUnion(today)
      })
      .then(docref => {
        commit("addDate", { documentId, today });
      })
      .catch(err => {
        console.log(err);
      });
  },
  addTodo({ commit }, { userId, todo }) {
    console.log(todo);
    todoRef
      .doc(userId)
      .collection("subTodos")
      .add({
        color: todo.color,
        dates: [],
        icon: todo.icon,
        title: todo.title,
        total: 0
      })
      .then(docRef => {
        console.log("成功");
        window.location.href = "/home";
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  },
  updateTodo({ commit }, { userId, todo, documentId }) {
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(documentId)
      .set({
        color: todo.color,
        dates: todo.dates,
        icon: todo.icon,
        title: todo.title,
        total: todo.total
      })
      .then(docRef => {
        console.log("成功");
        commit("updateTodo", { todo, documentId });
        alert("変更を保存しました！");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  },
  deleteTodo({ commit }, { userId, documentId }) {
    todoRef
      .doc(userId)
      .collection("subTodos")
      .doc(documentId)
      .delete()
      .then(docRef => {
        console.log("成功");
        window.location.href = "/home";
      })
      .catch(err => {
        console.error(err);
      })
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
