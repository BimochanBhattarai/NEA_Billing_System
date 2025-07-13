# ⚡ NEA Billing System

This project is built with [Next.js](https://nextjs.org) using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It provides a robust platform for managing electricity billing with efficiency and ease. 🌟

## 🌐 Features

- **Admin Dashboard**: Manage branches, customers, employees, billing, and reports.
- **Customer Portal**: View bills, payment history, and make payments.
- **Employee Interface**: Access meter readings and update customer data.
- **Authentication**: Secure login and registration for different user roles.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL/PostgreSQL database setup

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/nea_billing_system.git
   cd nea_billing_system
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:

   Create a `.env` file and add your configuration:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```

4. **Run Database Migrations**:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to explore the platform!

   You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📋 Project Structure

```
nea_billing_system/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── customer/       # Customer portal pages
│   │   ├── employee/       # Employee interface pages
│   │   ├── auth/           # Authentication pages
│   │   └── api/            # API routes
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utility functions
│   └── hooks/             # Custom React hooks
├── prisma/                # Database schema and migrations
└── public/               # Static assets
```

## 🛠️ Technologies Used

- **Frontend**: React 19, Next.js 15, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL/PostgreSQL
- **Authentication**: JWT, bcrypt.js
- **UI Components**: Radix UI, Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React, Tabler Icons

## 🗄️ Database Schema

The application includes comprehensive database models:

- **Users**: Authentication and role management
- **Customers**: Customer information and service connections
- **Bills**: Electricity consumption and billing details
- **Payments**: Payment processing and transaction history
- **Branches**: Branch management and location details
- **Employees**: Staff management and role assignments
- **Demand Types**: Different electricity tariff categories
- **Payment Methods**: Various payment options

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before getting started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Have questions? Feel free to reach out!

## 📜 License

This project is licensed under the MIT License.

---

Thanks for checking out our project! We hope it serves your billing management needs with power and precision. 🔋⚡
