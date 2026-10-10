import "../use.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { type Figure, findUseCase, labelOf, USE_CASES } from "@/content/use";

type Props = { params: Promise<{ slug: string }> };

/** 내보낸 화면 사진의 폭. 화면에서는 이보다 작게 보여서 고해상도 화면에서도 또렷하다 */
const FIGURE_WIDTH = 720;

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
    alternates: { canonical: `/use/${useCase.slug}/` },
    openGraph: {
      type: "article",
      title: useCase.title,
      description: useCase.summary,
      url: `/use/${useCase.slug}/`,
    },
  };
}

function Shot({ figure }: { figure: Figure }) {
  return (
    <figure className="shot">
      {/* 정적으로 내보내서 이미지 최적화 서버가 없다. 크기를 맞춰 둔 파일을 그대로 싣는다 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/use/${figure.file}.png`}
        alt={figure.alt}
        width={FIGURE_WIDTH}
        height={figure.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        {figure.caption}
        {figure.drawn ? <span> 앱 화면을 본떠 그린 그림이에요.</span> : null}
      </figcaption>
    </figure>
  );
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const others = USE_CASES.filter((other) => other.slug !== useCase.slug);

  return (
    <article className="use" data-kind={useCase.kind}>
      <div className="wrap">
        <header>
          <p className="crumb">
            <Link href="/use/">활용</Link> › {labelOf(useCase)}
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
                <Link href={`/use/${other.slug}/`}>{other.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
