# Next.js PDF Annotation Application

## Setup and Running Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- npm or yarn (package manager)

### Installation Steps
1. Create a Next.js project (if not already created):
   ```bash
   npx create-next-app@latest my-pdf-app
   cd my-pdf-app
   ```
2. Install dependencies from `package.json`:
   ```bash
   npm install
   ```
3. Copy the provided artifact code into `pages/index.js`.

### Running the Development Server
To start the development server, run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Libraries and Tools Used
### Core Framework:
- **Next.js** – Chosen for its server-side rendering and optimized performance.

### Additional Libraries:
- **React-PDF** – Used for rendering PDF documents within the browser.
- **PDF-lib** – Enables PDF manipulation and embedding annotations.
- **TailwindCSS** – Provides a responsive and modern styling framework.
- **React Icons** – Ensures a consistent and visually appealing icon set.

---

## How to Use the Application
1. **Upload a PDF:**
   - Drag and drop the PDF file into the drop zone.
   - Alternatively, click to browse and select a file.

2. **Use the Annotation Toolbar:**
   - **Highlight Tool:** Select text to highlight with the chosen color.
   - **Underline Tool:** Select text to underline.
   - **Comment Tool:** Click anywhere on the document to add a comment.
   - **Signature Tool:** Draw and place your signature on the document.

3. **Navigate Between Pages:**
   - Use the pagination controls at the bottom to move between document pages.

4. **Export the Annotated PDF:**
   - Click the "Export PDF" button to download the modified document.

---

## Challenges Faced and Solutions
### Challenge: First-Time Document Implementation
- Required extensive research on PDF handling within a Next.js environment.
- Utilized AI tools and official documentation to optimize the integration.

---

## Future Enhancements
If given more time, the following features could be added:
- **Collaboration Features:** Allow multiple users to annotate in real-time.
- **Cloud Storage Integration:** Save and load documents from cloud services.
- **Advanced Annotation Tools:** Include strikethrough, text box, and sticky notes.
- **PDF Search Functionality:** Enable keyword search within the document.

---

This documentation provides a clear and structured overview of setting up, using, and improving the PDF annotation application. Let me know if you need further refinements!

