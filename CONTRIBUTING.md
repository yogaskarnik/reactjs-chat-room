# Contributing Guidelines

## Development Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and configure Firebase
3. Run `npm install`
4. Run `npm start`

## Code Standards
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

## Commit Guidelines
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Keep commits atomic and focused
- Write clear commit messages

## Pull Request Process
1. Create feature branch from main
2. Make changes following code standards
3. Test thoroughly
4. Submit PR with clear description
5. Address review feedback

## File Structure
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── styles/        # CSS/styling files
└── firebase.js    # Firebase configuration
```
