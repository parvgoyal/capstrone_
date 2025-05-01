import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react'

// BMI categories and their ranges
const BMI_CATEGORIES = [
  { range: [0, 18.5], category: 'Underweight', color: 'blue.500' },
  { range: [18.5, 25], category: 'Normal', color: 'green.500' },
  { range: [25, 30], category: 'Overweight', color: 'orange.500' },
  { range: [30, Infinity], category: 'Obese', color: 'red.500' }
]

const BMICalculator = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [categoryColor, setCategoryColor] = useState('')
  const toast = useToast()

  // Calculate BMI and determine category
  const calculateBMI = () => {
    // Validate inputs
    if (!height || !weight) {
      toast({
        title: 'Error',
        description: 'Please enter both height and weight',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Calculate BMI
    const heightInMeters = Number(height) / 100
    const weightInKg = Number(weight)
    const bmiValue = weightInKg / (heightInMeters * heightInMeters)
    const roundedBMI = Number(bmiValue.toFixed(1))
    setBmi(roundedBMI)

    // Determine BMI category
    for (const { range, category, color } of BMI_CATEGORIES) {
      if (roundedBMI >= range[0] && roundedBMI < range[1]) {
        setCategory(category)
        setCategoryColor(color)
        break
      }
    }
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} px={4}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Heading size="lg">BMI Calculator</Heading>
            
            {/* Height input */}
            <FormControl>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in centimeters"
              />
            </FormControl>

            {/* Weight input */}
            <FormControl>
              <FormLabel>Weight (kg)</FormLabel>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kilograms"
              />
            </FormControl>

            {/* Calculate button */}
            <Button colorScheme="blue" onClick={calculateBMI} width="full">
              Calculate BMI
            </Button>

            {/* Results display */}
            {bmi !== null && (
              <Box textAlign="center" width="full">
                <Text fontSize="xl" fontWeight="bold">
                  Your BMI: {bmi}
                </Text>
                <Text fontSize="lg" color={categoryColor}>
                  Category: {category}
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default BMICalculator 