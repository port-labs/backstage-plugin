import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} documentation`}
      description="Port's Backstage plugin documentation"
    >
      <main>
        <h1>Hello</h1>
      </main>
    </Layout>
  );
}
