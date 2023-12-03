
# Data Transfer Object as Interaction Between Layers (Part 1)

In the world of software development, creating robust and maintainable code requires a thoughtful approach to organizing and structuring your application. One key aspect of this is how different layers of your application communicate with each other. One pattern that comes in handy for smooth communication between layers is the Data Transfer Object (DTO). In this blog post, we'll explore what a DTO is, why it's useful, and how you can leverage it in your Python applications.

## What is a Data Transfer Object (DTO)?

A Data Transfer Object, or DTO for short, is a design pattern used to transfer data between software application subsystems or layers that might have different structures. The primary goal is to simplify the communication between these layers by encapsulating the data in a simple object.

## Why Use DTOs?

Imagine you have a web application with a front end, a business logic layer, and a data access layer. Each layer may have its own representation of data, and passing complex objects between them could lead to confusion and potential bugs. This is where DTOs come to the rescue.

DTOs allow you to define a clear and consistent interface for data exchange between layers, reducing the coupling between them. This separation makes it easier to update or modify one layer without affecting the others, promoting a more modular and maintainable codebase.

## DTOs in Python

Let's dive into some Python examples to illustrate how DTOs can be implemented. In this scenario, we'll create a simple e-commerce application with a front end, a service layer, and a data access layer.

### Step 1: Define the DTO

DTOs can be defined in a lot of different ways. My personal favourites are:
- Dataclasses
- Pydantic

```python
# dto.py
from .value_objects import Price

# Dataclass example
from dataclasses import dataclass

@dataclass(frozen=True)
class CreateProductDto:
    name: str
    price: Price
    description: str

# Pydantic example
from pydantic import BaseModel

class CreateProductDto(BaseModel):
    name: str
    price: Price
    description: str

	class Config:
	    frozen = True
```

### Step 2: Use the DTO in the Service Layer


```python
# service.py
from .dto import CreateProductDto

# With DTO

class CreateProduct:
    def execute(self, dto: CreateProductDto) -> None:
        # Business logic of creating product

# Without DTO

class CreateProduct:
    def execute(self, name: str, price: Price, description: str) -> None:
	    # ... and many more args/kwargs for creation of product
        # Business logic of creating product
```

### Step 3: Utilize the DTO in the interface layer

```python
# main.py
from product_dto import ProductDTO
from product_service import ProductService

# Assume user input e.g. from REST API
product_data = {
    'name': 'Smartphone',
    'price': Price(499),
    'description': 'A feature-packed smartphone.'
}

# Create a DTO from user input
product_dto = ProductDTO(**product_data)

# Use the service layer to create the product
product_service = ProductService()
product_service.create_product(dto=product_dto)
```
