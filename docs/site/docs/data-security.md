---
sidebar_position: 7
---

# Data handling & security

We do not store any secrets in Port SaaS. All secrets remain within your own infrastructure, and we never access them in the SaaS.

The way we solve it is by using Ocean, our open-source data integration tool. which you can run on-prem. read more about it [here](https://ocean.getport.io/).

The following diagram shows how the data flows between Ocean - on your own infrastructure - and Port, with only outgoing requests from your infrastructure to Port:
![Ocean architecture](/img/ocean-architecture.svg)

Read more about how we handle data and security in our [official documentation](https://docs.getport.io/security).
