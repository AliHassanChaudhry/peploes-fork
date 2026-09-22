import { HTTP_CONTENT_TYPE } from "@/lib/constants";
import { buildLlmsText, getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsText(getSiteUrl()), {
    headers: {
      "Content-Type": `${HTTP_CONTENT_TYPE.MARKDOWN}; charset=utf-8`,
    },
  });
}
