---
sidebar_position: 5
---

# Automations

Automations allow you to automatically respond to events that happen in your software catalog by triggering predefined actions. They help streamline routine tasks and enforce policies without manual intervention.

Read more about automations in the [Port's documentation](https://docs.getport.io/actions-and-automations/define-automations/).

## Overview

An automation consists of two main parts:

1. **Trigger** - The event that starts the automation
2. **Action** - The logic that executes when the trigger occurs

## Available Triggers

There are two types of triggers available:

### Entity Triggers

| Trigger           | Description                                           | Event Type               |
| ----------------- | ----------------------------------------------------- | ------------------------ |
| Entity Creation   | Triggered when an entity is created                   | `ENTITY_CREATED`         |
| Entity Update     | Triggered when an entity is updated                   | `ENTITY_UPDATED`         |
| Entity Deletion   | Triggered when an entity is deleted                   | `ENTITY_DELETED`         |
| Any Entity Change | Triggered on any entity change (create/update/delete) | `ANY_ENTITY_CHANGE`      |
| Timer Expiration  | Triggered when a timer property on an entity expires  | `TIMER_PROPERTY_EXPIRED` |

### Action Run Triggers

| Trigger               | Description                                         | Event Type       |
| --------------------- | --------------------------------------------------- | ---------------- |
| Action Run Creation   | Triggered when an action run is created             | `RUN_CREATED`    |
| Action Run Update     | Triggered when an action run is updated or approved | `RUN_UPDATED`    |
| Any Action Run Change | Triggered on any action run change                  | `ANY_RUN_CHANGE` |

## Configuring Automations

Automations are defined using JSON configuration. Here's a basic example:
