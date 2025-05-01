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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

const CalorieCalculator = () => {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('1.2')
  const [calories, setCalories] = useState<number | null>(null)
  const toast = useToast()

  const calculateCalories = () => {
    if (!age || !height || !weight) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Mifflin-St Jeor Formula
    let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age)
    if (gender === 'male') {
      bmr += 5
    } else {
      bmr -= 161
    }

    const maintenanceCalories = bmr * Number(activityLevel)
    setCalories(Math.round(maintenanceCalories))
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} px={4}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Heading size="lg">Daily Calorie Calculator</Heading>
            
            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup value={gender} onChange={setGender}>
                <Stack direction="row">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in centimeters"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Weight (kg)</FormLabel>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kilograms"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Activity Level</FormLabel>
              <Select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra active (very hard exercise & physical job)</option>
              </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={calculateCalories} width="full">
              Calculate Calories
            </Button>

            {calories !== null && (
              <Box textAlign="center" width="full">
                <Text fontSize="xl" fontWeight="bold">
                  Your Daily Maintenance Calories: {calories}
                </Text>
                <Text fontSize="md" color="gray.500">
                  This is the number of calories you need to maintain your current weight
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default CalorieCalculator 