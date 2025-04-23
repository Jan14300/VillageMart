# Village Mart - Rural E-commerce Platform

Village Mart is a responsive e-commerce platform designed specifically for delivering products to rural and village areas in India where regular e-commerce services typically don't reach.

## Features

- **Mobile-friendly UI** optimized for low-end devices
- **Rural delivery system** with PIN code and village name-based delivery checks
- **OTP-based phone authentication**
- **Rural-friendly address system** (village, landmark, nearest city)
- **Multiple payment options** (UPI, COD)
- **Order tracking** with estimated delivery times
- **Admin panel** for managing products, orders, and delivery routes
- **Offline mode** for browsing previously loaded products
- **Product request system** for unavailable items

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js, Firebase
- **Internationalization**: next-intl
- **Payments**: UPI Integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/village-mart.git
   cd village-mart
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.local.example` file to `.env.local` and fill in your configuration details.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js App Router
- `/src/components` - React components
- `/src/lib` - Utility functions and database models
- `/src/i18n` - Internationalization configuration and locales

## Deployment

This project can be deployed using Vercel or any other Next.js compatible hosting service.

```
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
