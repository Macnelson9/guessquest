export async function GET() {
  return Response.json({
    frame: {
      name: "GuessQuest",
      version: "1",
      iconUrl: "https://guessquest-seven.vercel.app/image.png",
      homeUrl: "https://guessquest-seven.vercel.app",
      imageUrl: "https://guessquest-seven.vercel.app/image.png",
      buttonTitle: "Open GuessQuest",
      splashImageUrl: "https://guessquest-seven.vercel.app/image.png",
      splashBackgroundColor: "#000000",
      webhookUrl: "https://guessquest-seven.vercel.app/api/webhook",
      subtitle: "A fun guessing game",
      description: "Guess the answer to win!",
      primaryCategory: "games",
      tags: ["games", "social", "fun", "casual", "exciting"],
      heroImageUrl: "https://guessquest-seven.vercel.app/hero.png",
      tagline: "Play instantly, win together",
      ogTitle: "GuessQuest - Fast, fun, social",
      ogDescription: "Fast, fun, social",
      ogImageUrl: "https://guessquest-seven.vercel.app/hero.png",
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjEzMTAzMDcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhDM2UwRjA3NTAzQUIwMTA5OEI0YTkwNzc2N0M2NWY1NDljODJBOGU3In0",
      payload: "eyJkb21haW4iOiJndWVzc3F1ZXN0LXNldmVuLnZlcmNlbC5hcHAifQ",
      signature:
        "BnuHpqIKAFF7Z36sK2vm0+YfMLxWCbZSRZxluke9q9439TYNEmfYTyyB3GrcdQ8XP3xkseqES5lD/1g3r+kGvxw=",
    },
  });
}
