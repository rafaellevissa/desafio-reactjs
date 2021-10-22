import http from "../http-common";

class ApiService {
  getAllUsers() {
    return http.get("/user");
  }

  getUser(id) {
    return http.get(`/user/${id}`);
  }

  createUser(data) {
    return http.post("/user", data);
  }

  updateUser(id, data) {
    return http.put(`/user/${id}`, data);
  }

  deleteUser(id) {
    return http.delete(`/user/${id}`);
  }

  getAllOrders() {
    return http.get("/order");
  }

  getOrder(id) {
    return http.get(`/order/${id}`);
  }

  createOrder(data) {
    return http.post("/order", data);
  }

  updateOrder(id, data) {
    return http.put(`/order/${id}`, data);
  }

  deleteOrder(id) {
    return http.delete(`/order/${id}`);
  }

}

export default new ApiService();