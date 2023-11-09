import api from "./api";

export default {
  async getTodo() {
    return api
      .get("todos")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("Error making GET request:", error);
      });
  },

  async addTodo(payload) {
    return api.post(
      "todos",
      { id: "", title: payload, completed: false },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async editTodo(payload) {
    return api.put(`todos/${payload.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  async deleteTodo(payload) {
    console.log("payload", payload);
    return api
      .delete(`todos/${payload.id}`)
  },
};
