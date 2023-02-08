import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  const { text } = req.body;
  const result = await prisma.task.update({
    where: {
      id: req.query.id,
    },
    data: {
      text: text,
    },
  });
  res.status(201).json(result);
}
