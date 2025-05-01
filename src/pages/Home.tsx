import React from 'react'
import { Box, SimpleGrid, Heading, Text, Link, Card, CardBody, Container, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const calculators = [
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get your weight category',
    path: '/bmi-calculator',
  },
  {
    title: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs based on your activity level',
    path: '/calorie-calculator',
  },
  {
    title: 'Water Intake Calculator',
    description: 'Determine your recommended daily water intake',
    path: '/water-intake-calculator',
  },
  {
    title: 'Ideal Weight Calculator',
    description: 'Find your ideal weight range based on height and gender',
    path: '/ideal-weight-calculator',
  },
]

const Home = () => {
  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>Health Calculators</Heading>
          <Text fontSize="lg" color="gray.600">Use our calculators to track your health and fitness goals</Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {calculators.map((calc) => (
            <Link as={RouterLink} to={calc.path} key={calc.path} _hover={{ textDecoration: 'none' }}>
              <Card
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                }}
                transition="all 0.2s"
                height="100%"
              >
                <CardBody>
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{calc.title}</Heading>
                    <Text color="gray.600">{calc.description}</Text>
                  </VStack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Home 