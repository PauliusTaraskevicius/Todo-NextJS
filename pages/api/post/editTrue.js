import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  const result = await prisma.task.update({
    where: {
      id: +req.query.id,
    },

    data: {
      completed: {
        set: true
      },
    },
  });
  res.status(201).json(result);
}
