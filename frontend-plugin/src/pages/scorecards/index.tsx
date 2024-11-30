import { Header, Page, RoutedTabs } from "@backstage/core-components";
import React from "react";
import { useOutlet } from "react-router-dom";
import { ScorecardsInitiativesPage } from "./initiatives";
import { ScorecardsSummaryPage } from "./summary";

const ScorecardsPageInner = () => {
  const routes = [
    {
      path: "/",
      title: "Summary",
      children: <ScorecardsSummaryPage />,
    },
    {
      path: "/initiatives",
      title: "Initiatives",
      children: <ScorecardsInitiativesPage />,
    },
  ];

  return (
    <Page themeId="home">
      <Header title="Scorecards" />
      <RoutedTabs routes={routes} />
    </Page>
  );
};

export const ScorecardsPage = () => {
  const outlet = useOutlet();

  return <>{outlet || <ScorecardsPageInner />}</>;
};
