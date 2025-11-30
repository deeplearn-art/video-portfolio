# Video Portfolio Website

A modern, responsive website for showcasing your video portfolio using Streamable embeds.

## Features

- 🎥 **Streamable Integration**: Easy embedding of videos from Streamable
- 📱 **Responsive Design**: Looks great on all devices
- ⚡ **Fast Loading**: Optimized for performance
- 🎨 **Modern UI**: Clean, professional design
- 🧭 **Smooth Navigation**: Smooth scrolling between sections
- 📝 **Easy Management**: Simple JavaScript API for adding/removing videos

## Setup Instructions

### 1. Get Your Streamable Video IDs

1. Upload your videos to [Streamable](https://streamable.com)
2. For each video, copy the video ID from the URL
   - Example: `https://streamable.com/abc123` → video ID is `abc123`

### 2. Add Your Videos

Open `script.js` and update the `videoData` array with your video information:

```javascript
const videoData = [
    {
        id: 'my-first-video',
        title: 'My Amazing Video',
        description: 'A description of what this video showcases.',
        streamableId: 'abc123' // Your actual Streamable video ID
    },
    {
        id: 'my-second-video',
        title: 'Another Great Video',
        description: 'Another creative project.',
        streamableId: 'def456' // Your actual Streamable video ID
    }
    // Add more videos as needed
];
```

### 3. Customize Your Information

Update the following in `index.html`:

- **Contact Email**: Replace `your.email@example.com` with your actual email
- **Social Links**: Update the social media links in the contact section
- **About Section**: Customize the about content to reflect your work

### 4. Launch Your Website

1. **Local Testing**: Open `index.html` in your web browser
2. **Web Hosting**: Upload all files to your web hosting service
3. **Custom Domain**: Point your domain to your hosting location

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Adding Videos Programmatically

You can also add videos using JavaScript:

```javascript
// Add a new video
addVideo('Video Title', 'Video Description', 'streamable-video-id');

// Remove a video
removeVideo('video-id');
```

## Customization

### Colors
The main color scheme uses:
- Primary: `#2563eb` (blue)
- Background: `#fafafa` (light gray)
- Text: `#333` (dark gray)

To change colors, update the CSS variables in `styles.css`.

### Layout
- Modify `styles.css` to change spacing, fonts, or layout
- Update `index.html` to add/remove sections
- Enhance `script.js` for additional functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Videos Not Loading
- Verify your Streamable video IDs are correct
- Check that the videos are public on Streamable
- Ensure you have a stable internet connection

### Styling Issues
- Clear your browser cache
- Check for any CSS syntax errors in the browser console

### Navigation Issues
- Ensure all section IDs match the navigation links
- Check that JavaScript is enabled in your browser

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all file paths are correct
3. Ensure all required files are uploaded to your hosting service

## License

This project is open source and available under the MIT License.

"# video-portfolio" 
