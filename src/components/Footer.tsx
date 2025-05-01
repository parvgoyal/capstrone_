import React from 'react'
import { Box, Container, Text, Link, HStack, Icon } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

// Social media links
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: FaGithub },
  { name: 'Twitter', url: 'https://twitter.com', icon: FaTwitter }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <Box as="footer" bg="gray.100" _dark={{ bg: 'gray.700' }} py={6} mt="auto">
      <Container maxW="1200px">
        <HStack justify="space-between" align="center">
          <Text>© {currentYear} Health Calculator. All rights reserved.</Text>
          <HStack spacing={4}>
            {socialLinks.map(social => (
              <Link 
                key={social.name} 
                href={social.url} 
                isExternal
                aria-label={social.name}
              >
                <Icon as={social.icon} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Footer 