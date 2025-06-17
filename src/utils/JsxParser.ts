const fixUnmatchedTags = (jsx: string): string => {
  const stack: string[] = [];
  const tagRegex = /<\/?([A-Za-z][A-Za-z0-9]*)(?:\s[^>]*)?>/g;
  let lastIndex = 0;
  let result = "";
  let match;

  while ((match = tagRegex.exec(jsx)) !== null) {
    const [fullMatch, tag] = match;
    const isSelfClosing = fullMatch.endsWith("/>");
    const isClosing = fullMatch.startsWith("</");

    result += jsx.slice(lastIndex, match.index);
    lastIndex = match.index + fullMatch.length;

    if (isSelfClosing) {
      result += fullMatch; // Keep self-closing tags as is
    } else if (isClosing) {
      if (stack[stack.length - 1] === tag) {
        stack.pop();
        result += fullMatch;
      }
      // Skip unmatched closing tags
    } else {
      stack.push(tag);
      result += fullMatch;
    }
  }

  // Add any unclosed tags
  while (stack.length > 0) {
    const tag = stack.pop();
    result += `</${tag}>`;
  }

  return result + jsx.slice(lastIndex);
};

export const JsxParser = (input: any): string => {
  let jsx = "";

  // Extract JSX from different response formats
  if (typeof input === "object" && input !== null) {
    if (input.jsx) {
      jsx = input.jsx;
    } else if (input.response) {
      const cleanText = input.response.replace(/\\/g, "");
      const jsxMatch = cleanText.match(/<[\s\S]*>/);
      jsx = jsxMatch ? jsxMatch[0] : cleanText;
    } else if (input.choices?.[0]?.message?.content) {
      jsx = input.choices[0].message.content;
    } else if (input.text) {
      jsx = input.text;
    }
  }

  // If we still don't have JSX, try to extract it from stringified response
  if (!jsx) {
    const stringResponse = JSON.stringify(input);
    const jsxMatch = stringResponse.match(/<[a-zA-Z][\s\S]*?<\/[a-zA-Z]+>/);
    if (jsxMatch) {
      jsx = jsxMatch[0];
    }
  }

  if (!jsx) return "";

  // First, clean up all the standard escape sequences and whitespace
  jsx = jsx
    .replace(/\\n/g, " ") // Replace escaped newlines with space
    .replace(/\\t/g, " ") // Replace escaped tabs with space
    .replace(/[\n\t]/g, " ") // Replace actual newlines and tabs with space
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();

  // Handle the specific pattern of 'n' followed by a space that appears in the JSX
  // This targets only the 'n ' that appears between tags or at the start/end
  jsx = jsx
    .replace(/>\s*n\s+</g, "><") // 'n' between tags
    .replace(/^\s*n\s+</, "<") // 'n' at start
    .replace(/>\s*n\s*$/, ">") // 'n' at end
    .replace(/\s+/g, " ") // Clean up any new multiple spaces
    .trim();

  // Handle 'n' and 't' sequences that appear between tags or at boundaries
  jsx = jsx
    .replace(/>\s*n\s*t+(\s*<)/g, ">$1") // Handle 'nt' between tags
    .replace(/>\s*n+(\s*<)/g, ">$1") // Handle 'n' between tags
    .replace(/\s+/g, " ") // Clean up any new multiple spaces
    .trim();

  // Fix self-closing tags
  jsx = jsx.replace(/<([A-Za-z][A-Za-z0-9]*)([^>]*)>/g, (match, tag, rest) => {
    if (rest.endsWith("/") || (!rest.includes("/>") && !match.endsWith("</"))) {
      return match;
    }
    return match;
  });

  jsx = fixUnmatchedTags(jsx);

  // Final cleanup - only clean up actual concatenation artifacts
  return jsx
    .replace(/"\s*\+\s*"/g, "") // Remove string concatenation
    .replace(/\\"/g, '"') // Unescape quotes
    .trim();
};
