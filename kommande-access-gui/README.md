# Product Display Workflow

## Overview
The `ListCard` component fetches product data from the `/data` API and displays it based on the selected category (`type`). This document outlines the structure of the data and how the frontend manages product categorization and presentation.

## Data Format
Each product from the API contains the following fields:

- **serialNumber**: A unique identifier for the product.
- **productName**: The product's name, including specific model details.
- **brand**: The brand of the product.
- **model**: The product's specific model identifier.
- **description**: A brief description of the product’s key features and specifications.
- **price**: The price in USD.
- **image**: URL of the product image.
- **clicks**: The number of user clicks or views, indicating popularity.
- **type**: <font color='red'>**_TODO: Need Fix_**</font> The product's category, such as "phone" or "PC".

## Workflow Overview

1. **Data Fetching**:  
   The `ListCard` component makes a request to `/data` to fetch all product data.
   
2. **Category Filtering**:  
   Based on the user’s selected page, the `type` field is used to filter products for display. For example:
   - If the user selects the “smartphone” category, only products with `type: phone` are displayed.

3. **Rendering**:  
   Products matching the selected `type` are displayed as cards, with the following info: name, brand, model, description, price, clicks, and an image.

### Diagram for Display Pages

```mermaid
flowchart TD
    A(Home Page) --> B[Fetch All Products Basic Info from API]
    C -->|Using Search Function| G[Show Search Page]
    G --> H[Fetch Products with Key Words from API]
    H --> I[Display Products with Key Word]
    I -->|User selects a product| D
    B --> C[Display all products]
    C -->|User selects a product| D
    C -->|User selects sub-pages| E[Display Filtered Products]
    E -->|User selects a product| D[Fetch product details form API]
    D --> F(Show product details)
```
