function withValidProperties(
  properties: Record<string, undefined | string | string[]>
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) =>
      Array.isArray(value) ? value.length > 0 : !!value
    )
  );
}

export async function GET() {
  return Response.redirect(
    "https://api.farcaster.xyz/miniapps/hosted-manifest/0198fd14-6be3-fd68-3202-b459d18a4433",
    308
  );
}
