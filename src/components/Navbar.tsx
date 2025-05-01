import React from 'react'
import { Box, Flex, Button, Link, useColorMode, IconButton, useDisclosure, VStack, HStack, CloseButton } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'

// Navigation links for the app
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'BMI Calculator', path: '/bmi-calculator' },
  { name: 'Calorie Calculator', path: '/calorie-calculator' },
  { name: 'Water Intake', path: '/water-intake-calculator' },
  { name: 'Ideal Weight', path: '/ideal-weight-calculator' }
]

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Theme toggle button
  const ThemeToggle = () => (
    <Button onClick={toggleColorMode} size="sm">
      {colorMode === 'light' ? '🌙' : '☀️'}
    </Button>
  )

  return (
    <Box as="nav" bg="gray.100" _dark={{ bg: 'gray.700' }} py={4} position="sticky" top={0} zIndex={10}>
      <Flex maxW="1200px" mx="auto" px={4} align="center" justify="space-between">
        {/* Logo */}
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          Health Calculator
        </Link>
        
        {/* Desktop Navigation */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map(link => (
            <Link key={link.path} as={RouterLink} to={link.path}>
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </HStack>

        {/* Mobile Navigation Button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          icon={<HamburgerIcon />}
          variant="ghost"
          aria-label="Open Menu"
        />
      </Flex>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <Box
          display={{ base: 'block', md: 'none' }}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="white"
          _dark={{ bg: 'gray.800' }}
          zIndex={20}
          p={4}
        >
          <Flex justify="flex-end" mb={4}>
            <CloseButton onClick={onClose} />
          </Flex>
          <VStack spacing={4} align="stretch">
            {navLinks.map(link => (
              <Link key={link.path} as={RouterLink} to={link.path} onClick={onClose}>
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default Navbar 