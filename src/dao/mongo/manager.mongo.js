import User from "./models/user.models.js";
import Dish from "./models/dish.models.js";
import notFoundOne from "../../middlewares/notFoundOne.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(obj) {
    try {
      let { filter, order } = obj;
      if (!order) {
        order = { name: 1 };
      }
      const all = await this.model.find(filter).sort(order);
      if (all.length === 0) {
        const error = new Error("No hay documentos");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

// export {users, dishes}
// export default MongoManager

const users = new MongoManager(User);
const dishes = new MongoManager(Dish);

export { users, dishes };
