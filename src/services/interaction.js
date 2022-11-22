import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInteraction = async ({
  userId,
  serverId,
  channelId,
  channelName,
}) => {
  return await prisma.interaction.create({
    data: {
      user: {
        connectOrCreate: {
          create: {
            discordId: userId,
          },
          where: {
            discordId: userId,
          },
        },
      },
      server: {
        connectOrCreate: {
          create: {
            destinationWallet: "test",
            discordId: serverId,
          },
          where: {
            discordId: serverId,
          },
        },
      },
      channel: {
        create: {
          name: channelName,
          discordId: channelId,
        },
      },
    },
  });
};

export const softDeleteInteraction = async (channelId) => {
  const interaction = await prisma.interaction.findFirst({
    where: {
      channel: {
        discordId: channelId,
      },
    },
  });

  return await prisma.interaction.update({
    where: {
      id: interaction.id,
    },
    data: {
      deletedAt: new Date(),
      channel: {
        update: {
          deletedAt: new Date(),
        },
      },
    },
  });
};

export const getInteractionDetails = async (channelId) => {
  return await prisma.interaction.findFirst({
    where: {
      channel: {
        discordId: channelId,
      },
    },
  });
};

export const addTranscript = async (channelId, chatTranscript) => {
  const deletedInteraction = await prisma.interaction.findFirst({
    where: {
      deletedAt: {
        not: null,
      },
      channel: {
        discordId: channelId,
      },
    },
  });

  if (!deletedInteraction) throw new Error("interaction-not-deleted");

  return await prisma.interaction.update({
    where: {
      id: deletedInteraction.id,
    },
    data: {
      chatTranscript,
    },
  });
};
