import { describe, expect, it } from "vitest";
import { renderCoverDocument, type CoverInput } from "./render-cover";

const input = (patch: Partial<CoverInput> = {}): CoverInput => ({
  year: 2027,
  subtitle: "Ensino Fundamental I",
  topColor: "#006b82",
  bandColor: "#02748d",
  logo: null,
  ...patch,
});

// Só o <body>: o <style> embute fontes em base64.
const body = (html: string) => html.slice(html.indexOf("<body"));

describe("renderCoverDocument", () => {
  it("o ano vem da edição e o subtítulo sai escapado", () => {
    const html = body(renderCoverDocument(input({ subtitle: 'Hunters <script>x</script> "3º EM"' })));
    expect(html).toContain('<p class="capa-ano">2027</p>');
    expect(html).toContain("Hunters &lt;script&gt;x&lt;/script&gt; &quot;3º EM&quot;");
    expect(html).not.toContain("<script>");
  });

  it("cor fora do formato #rrggbb não chega ao CSS", () => {
    const html = body(renderCoverDocument(input({ topColor: "red; background-image: url(http://x)", bandColor: "#0a96a6" })));
    expect(html).not.toContain("url(http://x)");
    expect(html).toContain("background-color: #006b82");
    expect(html).toContain("background-color: #0a96a6");
  });

  it("logo extra só aparece quando existe", () => {
    expect(body(renderCoverDocument(input()))).not.toContain("capa-logo-extra");
    expect(body(renderCoverDocument(input({ logo: "data:image/png;base64,AAA" })))).toContain(
      '<img class="capa-logo-extra" src="data:image/png;base64,AAA" alt="">',
    );
  });
});
