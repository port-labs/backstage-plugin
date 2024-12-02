---
sidebar_position: 2
---

# Scorecards

## What is a Scorecard?

**Scorecards** enable us to define and track metrics/standards for our Port entities, based on their properties. Each scorecard consists of a set of rules, where each rule defines one or more conditions that need to be met.

Each rule has a level property whose value can be defined per to the way you define standards in your organization, for example:

- Service maturity can be defined as `Basic`, `Bronze`, `Silver`, `Gold`.
- Security standards can be defined as `Low`, `Medium`, `High`, `Critical`.
- Production readiness can be defined as traffic light colors `Red`, `Orange`, `Yellow`, `Green`.
- Engineering quality can be defined as `Poor`, `Fair`, `Good`, `Excellent`.
- Service response time can be defined as `A`, `B`, `C`, `D`, `F`.

## Scorecard use cases

Scorecards can be used to evaluate the maturity, production readiness and engineering quality of any entity in your software catalog, for example:

Does a service has an on-call defined?
Does a README.md file exist in the repository?
Is Grafana defined for the K8s cluster?
Is the relation of a certain entity empty?

## Building a Scorecard

The scorecard is built in Port, and then you can use it in your Backstage instance.
Read more about how to build a scorecard [here](https://docs.getport.io/promote-scorecards/usage).

## Scorecards Page

For example, let's add the Scorecard component to the NavBar:

in the file: `packages/app/src/App.tsx`, add the route:

```typescript
<Route path="/scorecards" element={<ScorecardsPage />} />
```

and then add the link to the NavBar, in the file: `packages/app/src/components/Root/Root.tsx`:

```typescript
<SidebarItem icon={DoneAllIcon} to="scorecards" text="Scorecards" />
```

![Scorecards page](/img/scorecards.png)
