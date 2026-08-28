import { auth } from "@clerk/nextjs/server";
import {
  getOnePagerPdfSource,
  ONE_PAGER_PDF_SLUGS,
} from "@/lib/pdf/one-pager-registry";
import { generatePdfFromSource } from "@/lib/pdf/generate-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const source = getOnePagerPdfSource(slug);

  if (!source) {
    return Response.json(
      {
        error: "Unknown one-pager slug",
        allowedSlugs: ONE_PAGER_PDF_SLUGS,
      },
      { status: 404 }
    );
  }

  const { userId } = await auth();

  if (!source.allowPublicApi && !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pdf = await generatePdfFromSource(source);

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${source.filename}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error(`[pdf] Failed to generate PDF for ${slug}:`, error);

    return Response.json(
      {
        error: "PDF generation failed",
        hint: "Ensure the dev server is running and Playwright Chromium is installed.",
      },
      { status: 500 }
    );
  }
}
