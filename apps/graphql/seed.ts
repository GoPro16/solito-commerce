import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const load = async () => {
  const productsToCreate = [
    {
      name: 'Cute Astronaut',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg',
    },
    {
      name: 'Cool Kid Astronaut',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/cute-cool-astronaut-with-jacket-jeans-cartoon-vector-icon-illustration-science-fashion-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3318.jpg',
    },
    {
      name: 'Peace Man Astronaut',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/astronaut-listening-music-with-headphone-peace-hand-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3375.jpg',
    },
    {
      name: 'Not an Astronaut',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/cute-cat-holding-fish-board-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-5221.jpg',
    },
    {
      name: 'Skater Naut?',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/cute-doughnut-playing-skateboard-cartoon-vector-icon-illustration-food-sport-icon-concept-isolated_138676-4494.jpg',
    },
    {
      name: 'Gangster Naut',
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: parseInt(faker.random.numeric(5)),
      img: 'https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg',
    },
  ]

  await prisma.product.createMany({
    data: productsToCreate as any,
  })
}

load()
