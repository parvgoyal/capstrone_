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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState('male')
  const [idealWeight, setIdealWeight] = useState<{ min: number; max: number } | null>(null)
  const toast = useToast()

  const calculateIdealWeight = () => {
    if (!height) {
      toast({
        title: 'Error',
        description: 'Please enter your height',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const heightInCm = Number(height)
    const heightInInches = heightInCm / 2.54

    // Devine Formula
    let baseWeight
    if (gender === 'male') {
      baseWeight = 50 + 2.3 * (heightInInches - 60)
    } else {
      baseWeight = 45.5 + 2.3 * (heightInInches - 60)
    }

    // Calculate range (±10% of base weight)
    const minWeight = Math.round(baseWeight * 0.9)
    const maxWeight = Math.round(baseWeight * 1.1)

    setIdealWeight({ min: minWeight, max: maxWeight })
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} px={4}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Heading size="lg">Ideal Weight Calculator</Heading>
            
            <FormControl>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter your height in centimeters"
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

            <Button colorScheme="blue" onClick={calculateIdealWeight} width="full">
              Calculate Ideal Weight
            </Button>

            {idealWeight && (
              <Box textAlign="center" width="full">
                <Text fontSize="xl" fontWeight="bold">
                  Your Ideal Weight Range
                </Text>
                <Text fontSize="lg" color="blue.500">
                  {idealWeight.min} - {idealWeight.max} kg
                </Text>
                <Text fontSize="md" color="gray.500">
                  This range is based on the Devine Formula and includes a ±10% margin
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default IdealWeightCalculator 