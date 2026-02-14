#### TODO: 1 (Flash-Sales)

/\*\*

- ARCHITECTURE NOTE:
-
- Current Implementation:
- ***
- Flash sale price filtering is applied on `products.price`.
- Discount logic is simplified because products do not yet have variations.
-
- Future Refactor Plan (When Product Variations Are Introduced):
- ***
-
- 1.  Move pricing responsibility from `products` to `product_variations`.
- Each variation will contain:
-      - price (base price)
-      - sale_price (discounted price, pre-calculated and stored)
-
- 2.  Add `sale_price` column to `product_variations`:
-      - Must be indexed
-      - Must be kept in sync during create/update operations
-
- 3.  Flash Sale Logic Update:
-      - Products should appear if ANY variation has a valid discount.
-      - Use `whereHas('variations', ...)` for filtering.
-
- 4.  Price Range Filter Update:
-      - Replace product-level price filtering
-      - Filter using variation `sale_price`
-
- 5.  UI Update:
-      - Display "From X" based on MIN(sale_price) among variations.
-
- This approach mirrors real-world e-commerce systems
- (Amazon, Daraz, Shopify) where pricing belongs to sellable units
- (variations), not parent products.
  \*/

#### TODO: 2 (Support Ticket System)

/\*\*

- Support ticket system: track all support requests from logged-in users.
-
- Admin-configured (set from admin panel):
- ***
- Ticket category (e.g. technical support, billing, account, etc.)
- Ticket status (e.g. open, closed, pending, etc.)
- Priority (e.g. low, medium, high, etc.)
-
- Optional:
- ***
- Attachment (e.g. image) from sender.
-
- Back and forth remarks:
- ***
- Admin and sender exchange remarks (e.g. admin replies needing more information, user replies with the information; after solving the issue, admin closes the ticket and sends a thank you message to the user).
  \*/
