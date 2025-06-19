import { getHighlightConcatsTexts } from "@/lib/utils";
import { IDocumentsWithHighlights } from "@/types/IDocumentsWithHighlights";

const HighlightedText = ({
  text,
  highlights,
}: {
  text: string;
  highlights: IDocumentsWithHighlights<
    unknown,
    unknown
  >["documentsHighlights"][number]["highlights"];
}) => {
  const textArray: [string, boolean][] = text.split("").map((c) => [c, false]);
  highlights.forEach((highlight) => {
    const concatsTexts = getHighlightConcatsTexts(highlight);
    const hits = highlight.texts
      .filter((text) => text.type === "hit")
      .map((text) => text.value);
    if (hits.length < 1) {
      throw new Error(
        "There should be at least one hit in an highlight. There were " +
          hits.length
      );
    }
    hits.forEach((hit, i) => {
      const startIndex = text.indexOf(concatsTexts[i]);
      if (startIndex === -1) {
        throw new Error(
          `The concatText \"${concatsTexts[i]}\" has not been found in the text \"${text}\".`
        );
      }
      const index = text.indexOf(hit, startIndex);
      if (index === -1) {
        throw new Error(
          `The hit \"${hit}\" has not been found in the text \"${text}\".`
        );
      }
      const hitLength = hit.length;
      for (let i = index; i < index + hitLength; i++) {
        textArray[i][1] = true;
      }
    });
  });
  const substrings: [string, boolean][] = [];
  textArray.forEach((cb) => {
    if (substrings.length === 0 || substrings[-1]?.[1] !== cb[1]) {
      substrings.push([cb[0], cb[1]]);
    } else {
      substrings[-1][0] = substrings[-1][0] + cb[0];
    }
  });
  return (
    <span>
      {substrings.map((substring, index) => {
        return substring[1] ? (
          <span key={index} className="text-red-600">
            {substring[0]}
          </span>
        ) : (
          substring[0]
        );
      })}
    </span>
  );
};

export default HighlightedText;
