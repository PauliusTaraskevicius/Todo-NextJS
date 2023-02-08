import prisma from "../../../prisma/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!prismaUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { text } = req.body;

  const result = await prisma.task.create({
    data: {
      text: text,
      authorId: prismaUser.id,
    },
  });
  res.status(201).json(result);
}
