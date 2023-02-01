import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  const result = await prisma.task.delete({
    where: {
      id: +req.query.id,
    },
  });
  res.status(201).json(result);
}
