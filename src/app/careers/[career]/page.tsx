import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { careerConfigs, getAllCareerSlugs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import { getArticlesByCategory } from "@/lib/articles";
import CareerHubPage from "@/components/CareerHubPage";
import { BreadcrumbJsonLd, OccupationJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ career: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string }>;
}): Promise<Metadata> {
  const { career } = await params;
  const config = careerConfigs[career as CareerSlug];
  if (!config) return {};

  const cluster = clusterConfigs[config.cluster];

  return {
    title: `${config.title} Career Path`,
    description: config.heroDescription,
    keywords: [
      config.title,
      `${config.title} careers`,
      `${config.title} jobs`,
      `${config.title} salary`,
      cluster.title,
      "career guidance",
      "career path",
    ],
    alternates: {
      canonical: `https://careertalks.space/careers/${career}`,
    },
    openGraph: {
      title: `${config.title} Career Path | CareerTalks`,
      description: config.description,
      type: "website",
    },
  };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const { career } = await params;

  // Validate the career slug
  if (!careerConfigs[career as CareerSlug]) {
    notFound();
  }

  const config = careerConfigs[career as CareerSlug];
  const articles = getArticlesByCategory(career as CareerSlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: config.title, href: `/careers/${career}` },
        ]}
      />
      <OccupationJsonLd
        name={config.title}
        description={config.heroDescription}
        salary={config.stats.avgSalary.replace("$", "").replace(",", "")}
        growthRate={config.stats.growthRate}
        skills={config.stats.topRoles}
      />
      <CareerHubPage career={career as CareerSlug} articleCount={articles.length} />
    </>
  );
}
