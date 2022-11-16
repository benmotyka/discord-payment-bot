import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const confirmUserTransaction = async ({ channelId, userId }) => {
//   try {
//     return await Transaction.findOneAndUpdate(
//       {
//         channelId,
//         userId,
//         deletedAt: null,
//       },
//       {
//         confirmedByUser: true,
//       }
//     );
//   } catch (error) {
//     console.log("Error in soft deleting transaction", error);
//   }
// };

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
