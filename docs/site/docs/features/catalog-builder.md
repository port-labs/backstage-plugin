---
sidebar_position: 1
---

# Catalog builder

The catalog builder is a feature in Port that allows you to create and manage your software catalog.

You first

- integrate from all the data sources you have
- create blueprints which are basiaclly the table definitions for the data model
- And lastly you map the data from the data sources to the blueprint

## Example

1. Read repositories from GitHub
2. Build a data model of services which has a name, description, owner, and a langauge.
   ![Data model](/img/features/blueprint.png)
3. Map each repository to a the service blueprint using [JQ](https://jqlang.github.io/jq/), [JQ Playground](https://jq.getport.io/).
   - we basically map the JSON response from GitHub to the blueprint properties.

```yaml
resources:
  - kind: repository
    selector:
      query: "true"
    port:
      entity:
        mappings: # Mappings between one GitHub API object to a Port entity. Each value is a JQ query.
          currentIdentifier: ".name" # OPTIONAL - keep it only in case you want to change the identifier of an existing entity from "currentIdentifier" to "identifier".
          identifier: ".name"
          title: ".name"
          blueprint: '"service"'
          properties:
            description: ".description"
            url: ".html_url"
            defaultBranch: ".default_branch"
```

Read more about the catalog builder in the [Port's documentation](https://docs.getport.io/build-your-software-catalog/).
