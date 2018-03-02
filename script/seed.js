/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Product, Order, Review, Category } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])

  const products = await Promise.all([
    Product.create(
      {
        title: 'Dog pirate suit',
        description: 'Turn your pup into an adorable pirate!',
        priceInCents: 1999,
        quantity: 10,
        size: 'S'
      }
    ),
    Product.create(
      {
        title: 'Dog pirate suit',
        description: 'Turn your pup into an adorable pirate!',
        priceInCents: 1999,
        quantity: 4,
        size: 'M'
      }
    ),
    Product.create(
      {
        title: 'Dog pirate suit',
        description: 'Turn your pup into an adorable pirate!',
        priceInCents: 1999,
        quantity: 7,
        size: 'L'
      }
    ),
    Product.create(
      {
        title: 'Wonder Kitty',
        description: 'It\'s a cat! It\'s a plane! It\'s a Wonder Kitty!',
        priceInCents: 1399,
        photoUrl: '/img/wonder-kitty.jpg',
        quantity: 7,
        size: 'L'
      }
    )
  ])
  const orders = await Promise.all([
    Order.create({
      email: 'billy-loves-dogs@puppybook.com',
      orderStatus: 'created',
      addressLine1: '123 Puppy Rd',
      city: 'Dogville',
      state: 'IL',
      zip: '12345'
    }),
    Order.create({
      email: 'kathy-loves-cats@puppybook.com',
      orderStatus: 'created',
      addressLine1: '123 Kitty Rd',
      city: 'Meowville',
      state: 'IL',
      zip: '54321'
    }),
    Order.create({
      email: 'whyNotALizard@gmail.com',
      orderStatus: 'created',
      addressLine1: '123 Egon Rd',
      city: 'Coldblood Bluff',
      state: 'IL',
      zip: '99299'
    }),
  ])

  const reviews = await Promise.all([
    Review.create({
      rating: 5,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      productId: '1'
    }),
    Review.create({
      rating: 4,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      productId: '3'
    }),
    Review.create({
      rating: 3,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      productId: '2'
    }),
    Review.create({
      rating: 3,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      productId: '2'
    }),
    Review.create({
      rating: 3,
      message: 'Lorem ipsum dolor sit amet',
      productId: '1'
    }),
  ])

  const categories = await Promise.all([
    Category.create({ label: 'Pirate' }),
    Category.create({ label: 'Superhero'}),
    Category.create({ label: 'Dog'}),
    Category.create({ label: 'Cat'}),
    Category.create({ label: 'Bird'}),
  ])

  await Promise.all([
    categories[0].addProduct([
      products[0], products[1], products[2]
    ]),
    categories[1].addProduct([
      products[4]
    ]),
    categories[2].addProduct([
      products[0], products[1], products[2]
    ]),
    categories[3].addProduct([
      products[4]
    ]),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)
}


// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
