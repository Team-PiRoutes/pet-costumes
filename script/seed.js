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
const faker = require('faker')
const { sizes } = require('../sizes')
const costumeTypes = [
  'Batman', 'Ben', 'Girl Scout', 'Wonder Woman', 'Pirate', 'Mermaid', 'Nurse', 'Vicar', 'Doctor', 'Robin Hood', 'Grace Hopper', 'Clown'
]
const costumeAdjectives = [
  'Vintage', 'Sexy', 'Rainbow', 'Zombie', 'Baby', 'Amazing', 'Waterproof'
]
const costumeAnimals = [
  'Dog', 'Cat', 'Bird', 'Turtle'
]

const randomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const { User, Product, Order, Cart, CartItem, Review, Category, OrderItem } = require('../server/db/models')

const makeProducts = (quantity) => {
  const products = []
  for (let i = 1; i <= quantity; i++) {
    products.push({
      size: randomFromArray(sizes),
      title: `${randomFromArray(costumeAdjectives)} ${randomFromArray(costumeAnimals)} ${randomFromArray(costumeTypes)}`,
      description: faker.lorem.sentences(2),
      priceInCents: Math.floor(Math.random() * 10000),
      quantity: Math.floor(Math.random() * 100)
    })
  }
  return products
}

// console.log(makeProducts(10))

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', isAdmin: true }),
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
      zip: '12345',
      customerId: 1
    }),
    Order.create({
      email: 'kathy-loves-cats@puppybook.com',
      orderStatus: 'created',
      addressLine1: '123 Kitty Rd',
      city: 'Meowville',
      state: 'IL',
      zip: '54321',
      customerId: 1
    }),
    Order.create({
      email: 'whyNotALizard@gmail.com',
      orderStatus: 'created',
      addressLine1: '123 Egon Rd',
      city: 'Coldblood Bluff',
      state: 'IL',
      zip: '99299',
      customerId: 2
    }),
  ])

  console.log(`seeding carts`)
  const carts = await Promise.all([
    Cart.create({
    }),
    Cart.create({
    })
  ])

  console.log(`seeding cartItems`)
  const cartItems = await Promise.all([
    CartItem.create({
      productId: 1,
      priceInCents: 1000,
      quantity: 3,
      cartId: 1
    }),
    CartItem.create({
      productId: 1,
      priceInCents: 4550,
      quantity: 5,
      cartId: 1
    }),
    CartItem.create({
      productId: 1,
      priceInCents: 1340,
      quantity: 2,
      cartId: 2
    })])

  console.log(`seeding orderItems`)
  const orderItems = await Promise.all([
    OrderItem.create({
      productId: 1,
      priceInCents: 1095,
      quantity: 1,
      orderId: 1
    }),
    OrderItem.create({
      productId: 2,
      priceInCents: 4595,
      quantity: 2,
      orderId: 1
    }),
    OrderItem.create({
      productId: 3,
      priceInCents: 1395,
      quantity: 3,
      orderId: 2
    })])


  console.log('seeding reviews')

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

  console.log('Seeding categories')

  const categories = await Promise.all([
    Category.create({ label: 'Pirate' }),
    Category.create({ label: 'Superhero' }),
    Category.create({ label: 'Dog' }),
    Category.create({ label: 'Cat' }),
    Category.create({ label: 'Bird' }),
    Category.create({ label: 'Turtle' }),
  ])

  console.log('seeding random products')

  makeProducts(99).forEach(async prod => {
    let product = await Product.create(prod)
    if (product.title.indexOf('Dog') >= 0) {
      await categories[2].addProduct(product)
    } else if (product.title.indexOf('Cat') >= 0) {
      await categories[3].addProduct(product)
    } else if (product.title.indexOf('Bird') >= 0) {
      await categories[4].addProduct(product)
    } else if (product.title.indexOf('Turtle') >= 0) {
      await categories[5].addProduct(product)
    }
  })

  const randomProducts = await Product.bulkCreate(makeProducts(99))

  await Promise.all([
    categories[0].addProduct([
      products[0], products[1], products[2]
    ]),
    categories[1].addProduct([
      products[3]
    ]),
    categories[2].addProduct([
      products[0], products[1], products[2]
    ]),
    categories[3].addProduct([
      products[3]
    ]),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${cartItems.length} cart items`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${orderItems.length} order items`)
  console.log(`seeded ${randomProducts.length} random products`)
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
    setTimeout(() => {
      db.close()
    }, 3000)

    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
