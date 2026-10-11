import "../use.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { Shot } from "@/components/Shot";
import { ROUTES, USE_FIGURE_DIR } from "@/config/routes";
import { SITE } from "@/config/site";
import { findUseCase, labelOf, USE_CASES } from "@/content/use";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

/** 글의 수만큼 페이지를 빌드 때 만든다. 목록에 없는 주소는 「찾지 못했어요」다 */
export function generateStaticParams() {
  return USE_CASES.map((useCase) => ({ slug: useCase.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) return {};
  return pageMetadata({
    title: useCase.title,
    description: useCase.summary,
    path: ROUTES.article(useCase.slug),
    type: "article",
  });
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const others = USE_CASES.filter((other) => other.slug !== useCase.slug);
  const url = `${SITE.url}${ROUTES.article(useCase.slug)}`;
  const firstFigure = useCase.sections.flatMap((section) => section.figures ?? [])[0];

  return (
    <article className="use" data-kind={useCase.kind}>
      <JsonLd
        data={{
          "@type": "Article",
          headline: useCase.title,
          description: useCase.summary,
          inLanguage: "ko",
          mainEntityOfPage: url,
          ...(firstFigure ? { image: `${SITE.url}${USE_FIGURE_DIR}/${firstFigure.file}.png` } : {}),
          publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }}
      />
      {/* 검색 결과에 「달살림 › 활용 › 글」 경로가 보이게 */}
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: SITE.name,
              item: `${SITE.url}${ROUTES.home}`,
            },
            { "@type": "ListItem", position: 2, name: "활용", item: `${SITE.url}${ROUTES.use}` },
            { "@type": "ListItem", position: 3, name: useCase.title, item: url },
          ],
        }}
      />
      <div className="wrap">
        <header>
          <p className="crumb">
            <Link href={ROUTES.use}>활용</Link> › {labelOf(useCase)}
          </p>
          <h1>{useCase.title}</h1>
          <p className="lede">{useCase.summary}</p>
        </header>

        <div className="body">
          {useCase.situation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {useCase.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points ? (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {section.figures ? (
                <div className="shots">
                  {section.figures.map((figure) => (
                    <Shot key={figure.file} figure={figure} />
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <nav className="more" aria-labelledby="more-title">
          <h2 id="more-title">다른 이야기</h2>
          <ul className="list">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={ROUTES.article(other.slug)}>{other.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
