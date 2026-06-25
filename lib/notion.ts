import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
});

export async function getCharacters() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_CHARACTERS_DB!,
    });

    return response.results.map((page: any) => ({
      id: page.id,
      name: page.properties.Name?.title?.[0]?.plain_text || "Unknown",
      description:
        page.properties.Description?.rich_text?.[0]?.plain_text || "",
      imageURL: page.properties.ImageURL?.url || "",
      rarity: page.properties.Rarity?.select?.name || "Common",
      price: page.properties.Price?.number || 0,
      isFreeVersion: page.properties.IsFreeVersion?.checkbox || false,
    }));
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}

export async function getDailyQuests() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_DAILY_QUESTS_DB!,
      filter: {
        property: "IsActive",
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Unknown",
      description:
        page.properties.Description?.rich_text?.[0]?.plain_text || "",
      xpReward: page.properties.XPReward?.number || 0,
      category: page.properties.Category?.select?.name || "Personal",
      isActive: page.properties.IsActive?.checkbox || false,
    }));
  } catch (error) {
    console.error("Error fetching daily quests:", error);
    return [];
  }
}

export async function getMainQuests() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_MAIN_QUESTS_DB!,
      filter: {
        property: "IsActive",
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Unknown",
      description:
        page.properties.Description?.rich_text?.[0]?.plain_text || "",
      xpReward: page.properties.XPReward?.number || 0,
      category: page.properties.Category?.select?.name || "Personal",
      isActive: page.properties.IsActive?.checkbox || false,
    }));
  } catch (error) {
    console.error("Error fetching main quests:", error);
    return [];
  }
}

export async function getSideQuests() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_SIDE_QUESTS_DB!,
      filter: {
        property: "IsActive",
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Unknown",
      description:
        page.properties.Description?.rich_text?.[0]?.plain_text || "",
      xpReward: page.properties.XPReward?.number || 0,
      category: page.properties.Category?.select?.name || "Personal",
      isActive: page.properties.IsActive?.checkbox || false,
    }));
  } catch (error) {
    console.error("Error fetching side quests:", error);
    return [];
  }
}
