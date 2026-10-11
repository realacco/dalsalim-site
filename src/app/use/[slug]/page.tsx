import "../use.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findUseCase, KIND_LABEL, USE_CASES } from "@/content/use";

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
    alternates: { canonical: `/use/${useCase.slug}/` },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = findUseCase(slug);
  if (!useCase) notFound();

  const others = USE_CASES.filter((other) => other.slug !== useCase.slug);

  return (
    <article className="use mock" data-kind={useCase.kind}>
      <div className="wrap">
        <header>
          <p className="crumb">
            <Link href="/use/">활용</Link> › {KIND_LABEL[useCase.kind]}
          </p>
          <h1>{useCase.title}</h1>
          <p className="lede">{useCase.summary}</p>
        </header>

        <div className="body">
          {useCase.situation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* 꾸미는 그림이다. 같은 내용이 본문에 글로 있다 */}
        <div className="example" aria-hidden="true">
          <p className="tiny">{useCase.example.caption}</p>
          <div>
            {useCase.example.rows.map((row) => (
              <div className="row" key={row.name}>
                <span>
                  {row.name}
                  {row.note ? <span className="sub">{row.note}</span> : null}
                </span>
                <span className="amount">
                  {row.value}
                  {row.valueNote ? (
                    <span className={row.valueNote.includes("+") ? "sub delta" : "sub"}>
                      {row.valueNote}
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="body">
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
