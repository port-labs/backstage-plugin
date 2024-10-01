# port


## Getting started

### Installation
``` bash
yarn --cwd packages/app add @port-/backstage-plugin
```

`/app-config.yaml`

```yaml
proxy:
  endpoints:
    '/getport':
      target: https://api.getport.io/v1
      credentials: dangerously-allow-unauthenticated
      headers:
        Authorization: Bearer ${PORT_TOKEN}
```

`EntityPage.tsx`

```tsx
const websiteEntityPage = (
  <EntityLayout>
    ...
    {
      ['getport.io/Jira_Project'].map(annotation => (
        <EntityLayout.Route path={`/port/${annotation}`} title={annotation.split('/')[1]} if={(entity) => !!entity.metadata.annotations?.[annotation]}>
          <EntityTabPortContent annotation={annotation} />
        </EntityLayout.Route>
      ))
    }
    ...
  </EntityLayout>
);

const serviceEntityPage = (
  <EntityLayout>
    ...
    {
      ['getport.io/Jira_Project'].map(annotation => (
        <EntityLayout.Route path={`/port/${annotation}`} title={annotation.split('/')[1]} if={(entity) => !!entity.metadata.annotations?.[annotation]}>
          <EntityTabPortContent annotation={annotation} />
        </EntityLayout.Route>
      ))
    }
    ...
  </EntityLayout>
);
```
```


