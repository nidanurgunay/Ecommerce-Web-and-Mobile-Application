# Ecommerce-Web-and-Mobile-Application
Sabanci University Cs 308 Software Engineering lecture term project. As a course project, we had to be developing an online store, consisting of a website and a mobile application, which interact over the web to an application web-server. 

<img width="1414" alt="Screen Shot 2021-08-09 at 18 52 41" src="https://user-images.githubusercontent.com/48755655/128914489-0a15d91f-f4e8-47b4-945c-61382b0187fe.png">


The essential details
encompassing requirements are given as follows:

● The website and accompanying mobile app will present a number of products in
categories and let users select and add the desired product/products to the shopping
cart to purchase them.

● You are free to design your store for any kind of product that your team prefers. For
instance, it can be an electronics appliance store such as teknosa.com or clothing store
of a brand and so on.

● The store has a limited stock of items, when the user selects a product, the number of
items in the stock must be shown. When the shopping is done, that product should be
decreased from the stock and the order for delivery processing should be forwarded to
the delivery department, which will process the order for shipping. During order
processing the user should be able to see the status as: processing, in-transit, and
delivered.

● Users can browse the online store and add products to their shopping carts without
logged in to the system. They, however, should login before placing an order and making
payment. Once payment is made and confirmed by the banking entity, an invoice must
be shown on the screen and a pdf copy of the invoice should be emailed to the user.

● Users should be able to make comments and give ratings to the products. The ratings
typically are between 1 and 5 stars or 1 and 10 points. The comments should be
approved by the product manager before they become visible.

● The overall user interface of the website and mobile app should have an attractive and
professional-looking design, so that people should find the site appealing and trust to
buy products. This is not just a website or an app, but the shop window of your store.

● The user should be able to search products depending on their names or descriptions.
Additionally, the user should be able to sort products depending on their price or
popularity. If a product is out-of-stock the product must still be searchable, however it
should mention out-of-stock and the user should not be able to add it to the shopping
cart.

● The user should be able to browse and purchase the products either through website or
mobile application. However, the managerial operations of the store are not mandated to
be done through the mobile app; nonetheless the main website should provide an admin
interface for such managerial tasks. A user can choose to continue shopping by
switching between website and mobile app without any data loss.

● A product should have the following properties at the least: ID, name, model, number,
description, quantity in stocks, price, warranty status, and distributor information.

● There are three types of basic roles in this system; customers, sales managers, and
product managers.

● The sales managers are responsible for setting the prices of the products. They shall set
a discount on the selected items. When the discount rate and the products are given, the
system automatically sets the new price and notify the registered users about the
discount. They shall also view all the invoices in a given date range, can print them or
save them as “pdf” files. Last but not least, they shall calculate the revenue and
loss/profit in between given dates and view a chart of it.

● The product managers shall add/remove products and manage the stocks; everything
related to stock shall be done by the product manager. The product manager is also in
the role of delivery department since it controls the stock. This means, the product
manager shall view the invoices, products to be delivered, and the corresponding
addresses for delivery. A delivery list has the following properties: delivery ID, customer
ID, product ID, quantity, total price, delivery address, and a field showing whether the
delivery has been completed or not. Last but not least, the product managers shall
approve or disapprove the comments.

● The customers shall view the products, search for the products, comment on the
products, rate the products, place new orders, cancel existing orders, and return
previously purchased products. A customer has the following properties at the very least:
ID, name, tax ID, e-mail address, home address, and password.

● A customer should enter his/her credit card information to purchase a product. Credit
card verification and limit issues are out of scope of the project.

● A customer shall also be able to selectively return a product and ask for a refund. In
such a case, the customer will select an already purchased product from his/her order
history within 30 days of purchase. The sales manager will evaluate the refund request
and upon receiving the product back to the store will authorize the refund. The product
will be added back to the stock and the purchased price will be refunded to the
customer's account. Moreover, if the product was bought during a discount campaign
and the customer chooses to return the product after the campaign ends, the refunded
amount will be the same as the time of its purchase with the discount applied.

● Since the registration and payment process is sensitive in nature; your project
development and programming should reflect the necessary amount of security
aware-ONLINE-ness and defensive programming. The various user roles have their own
security privileges and they should not be mixed. Whatever your method of information
storage (databases, XML files etc.) is, sensitive information should be kept encrypted, so
that it's not easily compromised.

● Note that sensitive information includes the following at the very least: user passwords,
credit card information, the invoices, and the user accounts. Needless to say, your
software is expected to run smoothly and not to display any unexpected behavior while
functioning within its normal parameters. Additionally, since this system will serve a
potentially large number of users, you should keep concurrency in mind: Your system
should be able to handle multiple users of various roles working on it at the same time
and retain its normal functionality under such circumstances.
