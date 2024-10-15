import { Header, Page, RoutedTabs } from "@backstage/core-components";
import React from "react";
import { ScorecardsInitiativesPage } from "./initiatives";
import { ScorecardsSummaryPage } from "./summary";

type SubRoute = Parameters<typeof RoutedTabs>[0]["routes"];

export const ScorecardsPage = () => {
  const routes: SubRoute = [
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
