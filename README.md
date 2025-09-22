# 🕵️ Classified Operative Dossier - Spy Portfolio

A sophisticated, spy-themed portfolio website featuring a classified dossier design with dark/light mode switching, terminal-style animations, and professional project showcases.

![Portfolio Preview](https://img.shields.io/badge/Status-CLASSIFIED-red?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue?style=for-the-badge&logo=github)

## 🎯 Live Demo

**🔗 [View Live Site](https://vishincode.github.io/spy-portfolio/)**

*Replace `VishInCode` with your actual GitHub username*

## ✨ Features

### 🎨 Design & Theme
- **Spy-Themed Interface**: Professional classified dossier aesthetic
- **Dark/Light Mode Toggle**: Seamless theme switching with enhanced readability
- **Terminal-Style Animations**: Loading screens with typing effects
- **Responsive Design**: Optimized for all devices and screen sizes
- **Professional Color Schemes**: Multiple color variants (Purple, Navy, Green/Orange/Blue)

### 🚀 Interactive Elements
- **Smooth Scrolling Navigation**: Fixed header with section navigation
- **Modal System**: Detailed project view with image galleries
- **Constellation Animations**: Animated spy network visualizations
- **Contact Form**: Secure transmission terminal interface
- **Social Media Integration**: Professional links with hover effects

### 💻 Technical Features
- **Optimized Performance**: Fast loading animations and transitions
- **Clean Code Structure**: Organized CSS and JavaScript
- **GitHub Pages Ready**: Properly configured for deployment
- **SEO Optimized**: Meta tags and structured content
- **Cross-Browser Compatible**: Works on all modern browsers

## 🗂️ Project Structure

```
spy-portfolio/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── script.js         # JavaScript functionality
│   ├── images/               # Profile and project images
│   │   ├── profile.png
│   │   ├── pic.jpg
│   │   ├── DIn.png
│   │   ├── ECOM.png
│   │   └── Dosseir.png
│   └── videos/               # Demo videos
│       ├── Timeline.mp4
│       ├── ping pong.mp4
│       ├── ping pong2.mp4
│       └── vid.mp4
├── docs/
│   └── RESUME.pdf           # Resume/CV file
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Option 1: GitHub Pages Deployment

1. **Fork this repository** or **Create a new repository**
2. **Upload your files** to the repository
3. **Go to repository Settings**
4. **Scroll to Pages section**
5. **Select "Deploy from a branch"**
6. **Choose "main" branch and "/ (root)" folder**
7. **Save and wait for deployment**

Your site will be available at: `https://yourusername.github.io/repository-name`

### Option 2: Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/spy-portfolio.git
   cd spy-portfolio
   ```

2. **Serve locally:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000`

## 🛠️ Customization Guide

### 1. Personal Information
Edit the main content in `index.html`:
- Replace profile images in `/assets/images/`
- Update personal details, skills, and projects
- Modify contact information and social links

### 2. Projects Section
Add your projects by editing the operations grid:
```html
<div class="operation-card" onclick="openModal('project-id')">
    <div class="card-header">
        <span class="operation-code">OP-001</span>
        <span class="security-level">TOP SECRET</span>
    </div>
    <div class="card-image">
        <img src="assets/images/your-project.png" alt="Project Name">
    </div>
    <div class="card-content">
        <h3 class="operation-name">Your Project</h3>
        <p class="operation-type">Project Type</p>
        <span class="status-badge status-active">Active</span>
    </div>
</div>
```

### 3. Color Schemes
The portfolio includes multiple color themes. Modify CSS variables in `assets/css/style.css`:
```css
:root {
    --color-terminal-purple: #9D4EDD;  /* Primary accent color */
    --color-bg-primary: #0A0A0F;      /* Background color */
    --color-classified-red: #FF4141;   /* Classified elements */
}
```

### 4. Animations & Effects
Adjust animation speeds in the CSS:
- Loading screen timing
- Transition durations
- Hover effects
- Constellation animations

## 📱 Browser Support

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)
- ✅ Mobile browsers

## 🎯 Performance Features

- **Fast Loading**: Optimized animations (350ms intervals vs 600ms)
- **Smooth Transitions**: 0.3s fade transitions
- **Responsive Images**: Optimized for all screen sizes
- **Minimal Dependencies**: Lightweight external resources only

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

Having issues? Here are some common solutions:

### GitHub Pages Not Working?
- Ensure `index.html` is in the root directory
- Check that all file paths use relative paths
- Verify repository is public (for free GitHub accounts)

### Images Not Loading?
- Check file paths in HTML
- Ensure images are in the correct `/assets/images/` directory
- Verify image file names match exactly (case-sensitive)

### Animations Not Working?
- Check browser compatibility
- Ensure JavaScript is enabled
- Clear browser cache and reload

## 🔗 Links

- **Live Demo**: [https://vishincode.github.io/spy-portfolio/]
- **Repository**: [https://github.com/VishInCode/spy-portfolio.git]
- **Issues**: [Repository Issues Page]
- **Documentation**: [This README]

---

**Created with 🕵️ by [Vishy]**  
*Professional Data Scientist & Developer*

> "In the world of data science, every algorithm is a mission, every dataset is classified, and every insight is a breakthrough." 

---

*Last Updated: September 2025*
