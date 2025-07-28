# Property Listing Dashboard

🚀 **Live Demo**: [https://venerable-pavlova-432517.netlify.app](https://venerable-pavlova-432517.netlify.app)

A modern, responsive property listing dashboard built with React, TypeScript, and Tailwind CSS. Features advanced search and filtering, property management, and a beautiful dark mode interface.

![Property Dashboard](https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🏠 Property Management
- **Property Listings**: Browse through beautiful property cards with image galleries
- **Add New Properties**: Comprehensive form to add new listings with validation
- **Property Details**: Full-screen modal with detailed property information
- **Image Galleries**: Multiple images per property with carousel navigation
- **Property Status**: Available/Sold status indicators

### 🔍 Search & Filtering
- **Real-time Search**: Search by title, location, or description
- **Advanced Filters**: Filter by type, price range, bedrooms, bathrooms, and location
- **Filter Persistence**: Filters remain active while browsing
- **Clear Filters**: One-click filter reset functionality

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between beautiful dark and light themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Loading States**: Elegant loading spinners and states
- **Error Handling**: Graceful error handling with user feedback

### 💾 Data Management
- **Mock API**: Simulated API calls with realistic data
- **Local Storage**: User-added properties persist between sessions
- **State Management**: React Context for global state management
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header with dark mode toggle
│   ├── SearchAndFilters.tsx  # Search bar and filter controls
│   ├── PropertyCard.tsx # Individual property card component
│   ├── PropertyModal.tsx     # Property details modal
│   ├── AddPropertyForm.tsx   # Add new property form
│   └── LoadingSpinner.tsx    # Loading state component
├── context/             # React Context providers
│   └── AppContext.tsx   # Global application state
├── types/               # TypeScript type definitions
│   └── index.ts         # Property and app types
├── utils/               # Utility functions
│   └── mockApi.ts       # Mock API for property data
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎯 Key Components

### AppContext
Global state management using React Context API:
- Property data management
- Search and filter state
- Dark mode preferences
- Modal and form visibility
- Local storage integration

### PropertyCard
Interactive property cards featuring:
- Image carousel with navigation
- Property details and pricing
- Like/favorite functionality
- Hover animations and effects
- Status indicators

### PropertyModal
Full-featured property detail modal:
- Large image gallery with thumbnails
- Complete property information
- Feature listings
- Contact and tour buttons
- Social sharing options

### AddPropertyForm
Comprehensive form for adding properties:
- Form validation with error messages
- Dynamic image URL fields
- Feature management
- Property type selection
- Availability toggle

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **Code**: Monospace font family

### Spacing
- Consistent 8px spacing system
- Responsive breakpoints for all screen sizes
- Proper visual hierarchy with whitespace

## 🔧 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library
- **ESLint** - Code linting and formatting

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

All components adapt gracefully to different screen sizes with optimized layouts and touch-friendly interactions.

## 🌙 Dark Mode

The application features a comprehensive dark mode implementation:
- System preference detection
- Manual toggle in header
- Persistent user preference
- Smooth transitions between themes
- Optimized contrast ratios for accessibility

## 💡 Usage Examples

### Adding a New Property
1. Click the "Add Property" button in the header
2. Fill out the comprehensive form with property details
3. Add multiple image URLs for the gallery
4. List property features and amenities
5. Submit to add the property to your local collection

### Searching and Filtering
1. Use the search bar to find properties by keywords
2. Apply filters for property type, price range, and specifications
3. Combine multiple filters for precise results
4. Clear all filters with one click to reset the view

### Viewing Property Details
1. Click on any property card to open the detail modal
2. Navigate through the image gallery
3. View complete property information and features
4. Use contact buttons to connect with agents

## 🤝 Contributing

1. Fork the repository
2. Visit the main repository at [https://github.com/iankit-sachan](https://github.com/iankit-sachan)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Created by [Ankit Sachan](https://github.com/iankit-sachan)
- Property images from [Pexels](https://pexels.com)
- Icons from [Lucide React](https://lucide.dev)
- Design inspiration from modern real estate platforms

---
