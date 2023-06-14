const db = require("../../database/db");
const Notes = db.models.notes;
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  create: async function (data, cb) {
    try {
      const note = await Notes.findOne({ where: { title: data?.title } })
      if (note) return cb("The title already exists.", null, "The title already exists.", 400);
      else {
        const newNote = await Notes.create(data);
        return cb(null, newNote, "The note has been created successfully.", 201);
      }
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
  getAll: async function (data, cb) {
    try {
      const page = data?.page || 0
      const limit = 10
      const offset = page ? (page - 1) * limit : 0;

      var filter = []
      if (data?.title) filter.push(Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), { [Op.like]: `%${data?.title?.toLowerCase()}%` }))
      if (Object.hasOwn(data, 'status')) filter.push({ status: data?.status })
      var order = []

      if (data.created_at === "DESC") order.push(['created_at', 'DESC'])
      if (data.created_at === "ASC") order.push(['created_at', 'ASC'])

      if (data.updated_at === "DESC") order.push(['updated_at', 'DESC'])
      if (data.updated_at === "ASC") order.push(['updated_at', 'ASC'])

      const total = await Notes.count({ where: { [Op.and]: filter } })
      const notes = await Notes.findAll({
        where: { [Op.and]: filter },
        order: order,
        limit: limit,
        offset: offset,
      })
      return cb(null, { total, totalPages: Math.ceil(total / limit), notes }, "Notes find successfully.", 201);
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
  update: async function (data, cb) {
    try {
      const updatedNote = await Notes.update(data, { where: { id: data.id } });
      return cb(null, updatedNote, "Note update successfully.", 200);
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
  delete: async function (data, cb) {
    try {
      const deletedNote = await Notes.destroy({ where: { id: data?.id } });
      return cb(null, deletedNote, "Note delete successfully.", 200);
    } catch (error) {
      return cb(error, null, "Something went worng.", 500);
    }
  },
}
