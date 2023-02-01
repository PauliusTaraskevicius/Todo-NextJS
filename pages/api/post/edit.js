import prisma from "../../../prisma/prisma";

export default async function handle(req, res) {
  const { title, text } = req.body;
  const result = await prisma.task.update({
    where: {
      id: req.query.id,
    },
    data: {
      title: title,
      text: text,
    },
  });
  res.status(201).json(result);
}
