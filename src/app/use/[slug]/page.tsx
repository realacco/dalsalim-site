import "../use.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { Shot } from "@/components/Shot";
import { ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";
import { findUseCase, labelOf, USE_CASES } from "@/content/use";

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
  return {
    title: useCase.title,
    description: useCase.summary,
    alternates: { canonical: ROUTES.article(useCase.slug) },
    openGraph: {
      type: "article",
      title: useCase.title,
      description: useCase.summary,
      url: ROUTES.article(useCase.slug),
    },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const others = USE_CASES.filter((other) => other.slug !== useCase.slug);

  return (
    <article className="use" data-kind={useCase.kind}>
      <JsonLd
        data={{
          "@type": "Article",
          headline: useCase.title,
          description: useCase.summary,
          inLanguage: "ko",
          mainEntityOfPage: `${SITE.url}${ROUTES.article(useCase.slug)}`,
          publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
