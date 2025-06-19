import z from "zod/v4";

const getZDocumentsHighlights = <ZSearchPaths extends z.ZodTypeAny = z.ZodAny>(
  zSearchPaths: ZSearchPaths
) =>
  z.object({
    _id: z.string(),
    highlights: z.array(
      z.object({
        score: z.number(),
        path: zSearchPaths,
        texts: z.array(
          z.object({
            value: z.string(),
            type: z.enum(["hit", "text"]),
          })
        ),
      })
    ),
  });

type IDocumentsHighlights<SearchPaths> = Omit<
  z.infer<ReturnType<typeof getZDocumentsHighlights>>,
  "highlights"
> & {
  highlights: (Omit<
    z.infer<ReturnType<typeof getZDocumentsHighlights>>["highlights"][number],
    "path"
  > & {
    path: SearchPaths;
  })[];
};

const getZDocumentsWithHighlights = <
  ZDocumentType extends z.ZodTypeAny = z.ZodAny,
  ZSearchPaths extends z.ZodTypeAny = z.ZodAny,
>(
  zDocument: ZDocumentType,
  zSearchPaths: ZSearchPaths
) =>
  z.object({
    documents: z.array(zDocument),
    documentsHighlights: z.array(getZDocumentsHighlights(zSearchPaths)),
  });

type IDocumentsWithHighlights<DocumentType, SearchPaths> = Omit<
  z.infer<ReturnType<typeof getZDocumentsWithHighlights>>,
  "documents" | "documentsHighlights"
> & {
  documents: DocumentType[];
  documentsHighlights: IDocumentsHighlights<SearchPaths>[];
};

export { getZDocumentsHighlights, getZDocumentsWithHighlights };
export type { IDocumentsHighlights, IDocumentsWithHighlights };
