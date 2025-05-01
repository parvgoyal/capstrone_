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
  Select,
} from '@chakra-ui/react'

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('1')
  const [waterIntake, setWaterIntake] = useState<number | null>(null)
  const toast = useToast()

  const calculateWaterIntake = () => {
    if (!weight) {
      toast({
        title: 'Error',
        description: 'Please enter your weight',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Base calculation: 30ml per kg of body weight
    let baseWater = Number(weight) * 30

    // Adjust for activity level
    const activityMultiplier = Number(activityLevel)
    const totalWater = baseWater * activityMultiplier

    // Convert to liters and round to 1 decimal place
    setWaterIntake(Number((totalWater / 1000).toFixed(1)))
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} px={4}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Heading size="lg">Water Intake Calculator</Heading>
            
            <FormControl>
              <FormLabel>Weight (kg)</FormLabel>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight in kilograms"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Activity Level</FormLabel>
              <Select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="1">Sedentary (little or no exercise)</option>
                <option value="1.2">Lightly active (light exercise 1-3 days/week)</option>
                <option value="1.4">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="1.6">Very active (hard exercise 6-7 days/week)</option>
                <option value="1.8">Extra active (very hard exercise & physical job)</option>
              </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={calculateWaterIntake} width="full">
              Calculate Water Intake
            </Button>

            {waterIntake !== null && (
              <Box textAlign="center" width="full">
                <Text fontSize="xl" fontWeight="bold">
                  Recommended Daily Water Intake: {waterIntake} liters
                </Text>
                <Text fontSize="md" color="gray.500">
                  This is approximately {Math.round(waterIntake * 4)} glasses of water per day
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default WaterIntakeCalculator 