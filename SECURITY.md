# Security Policy

## Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email security concerns to: [your-email@domain.com]
3. Include detailed steps to reproduce
4. Allow 48 hours for initial response

## Security Best Practices

### Firebase Security
- Never commit Firebase config to public repos
- Use environment variables for sensitive data
- Implement proper Firestore security rules
- Enable Firebase App Check in production

### Authentication
- Validate user input on both client and server
- Implement proper session management
- Use HTTPS in production
- Sanitize all user-generated content

### Data Protection
- Encrypt sensitive data at rest
- Implement proper access controls
- Regular security audits
- Monitor for suspicious activity
