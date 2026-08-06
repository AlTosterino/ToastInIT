---
title: 'Code presentation reference'
description: "Private reference for the blog's code blocks and diagram rendering."
publishedAt: 2099-01-01
tags: [engineering]
draft: true
featured: false
language: en
---

This draft is a private rendering reference, not a published article.

```python title="worker.py" {1,4} ins={5}
from dataclasses import dataclass

@dataclass(frozen=True)
class Job:
    name: str
```

```diff title="config.diff"
- timeout = 10
+ timeout = 30
```

```mermaid
flowchart LR
  API --> Queue --> Worker --> Store
```
