'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUserById(id) {
    return this.ctx.model.User.findById(id);
  }

  async getUsersByIds(ids) {
    const users = await this.ctx.model.User.findAll({
      where: {
        id: { $in: ids },
      },
    });

    if (!users.length > 0) {
      this.ctx.throw(404, 'users not found');
    }

    return users;
  }

  async list({ offset = 0, limit = 10, order_by = 'id', order = 'ASC' }) {
    return this.ctx.model.User.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      order: [[ order_by, order.toUpperCase() ]],
    });
  }

  async create(data) {
    return await this.ctx.model.User.create(data);
  }

  async update(data, id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id);

    if (!user) {
      ctx.throw(404, 'user not found');
    }

    return user.update(data);
  }

  async destroy(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id);

    if (!user) {
      this.ctx.throw(404, 'user not found');
    }

    return await this.ctx.model.User.destroy({ where: { id } });
  }
}

module.exports = UserService;
