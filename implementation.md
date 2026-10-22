# Krithi — Personal Portfolio Website: Implementation Documentation

## 1. Project Overview

This project is a modern, responsive, accessible personal portfolio website built for **Krithi**, an undergraduate student pursuing a **Bachelor of Engineering in Computer Science & Engineering (Artificial Intelligence and Machine Learning)** at **AJ Institute of Engineering and Technology (AJIET)**, Mangaluru, Karnataka, India.

The portfolio is engineered with clean, semantic **HTML5**, **CSS3**, and **vanilla JavaScript (ES6+)**. It requires **zero paid libraries, no premium templates, no build tools, and no paid APIs**. It runs immediately when opening `index.html` in any web browser and is fully optimized for free hosting on **GitHub Pages**.

---

## 2. Source of Truth: Resume Details

All data, credentials, projects, employment history, and contact details are directly extracted from Krithi's verified resume (`DOC-20260924-WA0028.pdf`) without fabrication or invented claims:

### 2.1 Personal & Contact Details
- **Full Name**: Krithi
- **Professional Title**: Software Engineer / Computer Science (AI & ML) Undergraduate
- **Location**: Mangalore, Karnataka, India
- **Telephone**: `+91 7204206154` (or `7204206154`)
- **Email**: `krithi.sbv9@gmail.com`
- **LinkedIn**: [linkedin.com/in/krithi-bhandary](https://linkedin.com/in/krithi-bhandary)

### 2.2 Career Objective
> *"Enthusiastic and motivated Computer Science (AI & ML) undergraduate with a strong foundation in Java and web development. Interested in software development, problem solving, and building practical, real-world applications. A curious learner eager to grow technical skills and contribute meaningfully in a professional environment."*

### 2.3 Education
1. **Bachelor of Engineering (CSE - AIML)** (2024 – 2028)  
   *AJ Institute of Engineering and Technology, Mangaluru, Karnataka, India*
2. **Pre-University Course (PUC)**  
   *St. Agnes PU College, Bendur, Mangaluru, Karnataka, India*
3. **SSLC**  
   *Shubhodaya Vidyalaya, Vamanjur, Mangaluru, Karnataka, India*

### 2.4 Technical Skills
- **Java**
- **HTML**
- **CSS**
- **JavaScript**

### 2.5 Professional Skills
- **Java**
- **HTML/CSS/JS**
- **Problem Solving**
- **Critical Thinking**

### 2.6 Certifications
- **Python Fundamentals** — *Infosys Springboard*
- **Java for Beginners** — *Infosys Springboard*
- **Introduction to MS Excel** — *Simplilearn*

### 2.7 Employment History (Internship Experience)
- **Web Developer Intern** (2023)  
  *Thiranex*
  - Built web development projects using HTML, CSS, and JavaScript.
  - Gained practical exposure to how real-world development workflows work.

### 2.8 Personal Projects
1. **Weather Dashboard System**: A web application displaying real-time weather data in a clean dashboard.
2. **Student Attendance Management System**: A system to record and track student attendance, reducing manual paperwork.
3. **Arduino Human-Following Robot**: A robot built with Arduino that detects and follows human movement.
4. **Snake Game & Calculator**: Core programming logic projects built to strengthen fundamentals.

### 2.9 Languages Spoken
- **English** (Fluent)
- **Hindi** (Fluent)
- **Kannada** (Fluent)
- **Tulu** (Native)

---

## 3. UI/UX Design Decisions

### 3.1 Color Palette & Theme Strategy
- **Default Obsidian Slate Dark Mode**:
  - Primary Background: `#0a0e17`
  - Secondary Surface: `#0f172a`
  - Cards & Modules: Semi-transparent rgba surface (`rgba(18, 26, 43, 0.75)`) with `backdrop-filter: blur(12px)` and delicate borders (`rgba(255, 255, 255, 0.08)`).
- **Accents**:
  - Primary Cyan: `#38bdf8` (High contrast, modern, tech-forward)
  - Secondary Indigo: `#818cf8` (Gives depth and visual hierarchy)
  - Status Emerald: `#10b981` (Used for "Open to Internships" live indicator and verified certification badges)
- **Light Theme Support**:
  - Implemented cleanly via CSS Custom Properties under `[data-theme="light"]`, allowing switching between dark and light themes with state saved in `localStorage`.

### 3.2 Typography & Hierarchy
- **Primary Body Font**: `Inter`, system font stack (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`) ensuring fast loading and legibility.
- **Monospace Accent Font**: `JetBrains Mono` for developer badges, code terminal elements, date tags, and category chips.

### 3.3 Accessibility (a11y) & Usability
- **Semantic HTML5 Elements**: Uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` with descriptive headings (`h1` through `h4`).
- **Skip Navigation Link**: Allows keyboard screen reader users to jump straight to `#main-content`.
- **Keyboard Navigation**: All interactive elements (buttons, links, form controls, filter tabs, modal) have distinct `:focus-visible` styling with high contrast.
- **Accessible ARIA Attributes**: Includes `aria-expanded`, `aria-controls`, `aria-label`, `aria-required`, `aria-invalid`, `aria-describedby`, and `role="dialog"`.
- **Focus Trapping**: In the project details modal, focus is trapped within the dialog while open, and focus returns to the triggering button when closed.
- **Prefers-Reduced-Motion**: Media query disables transforms and animations for users requesting reduced motion in their OS settings.

### 3.4 Key Interactive Features
1. **Interactive Hero Terminal**: Visual card showcasing technical strengths in a styled code window.
2. **ScrollSpy & Sticky Header**: Sticky navbar with blurred backdrop and automatic link highlight as the user scrolls.
3. **Project Filtering**: Instant category filtering between "All", "Web Application", "Java & Logic", and "Robotics & Hardware".
4. **Project Details Modal**: Deep-dive popup for each project with architectural details and highlights.
5. **One-Click Copy**: Direct copy-to-clipboard buttons for email and telephone with visual feedback.
6. **Accessible Contact Form**: Real-time validation for name, email format, and message length, with feedback toasts and automatic `mailto:` launch fallback.
7. **Back-to-Top Button**: Smooth floating button appearing after 400px of scrolling.

---

## 4. File Structure

```text
krithi-portfolio/
├── index.html            # Complete semantic single-page portfolio layout
├── style.css             # Modular, modern CSS3 stylesheet (dark/light themes)
├── script.js             # Vanilla ES6+ interactions, validation, modal, theme toggle
├── krithi-resume.pdf     # Direct linkable copy of the uploaded resume
└── implementation.md     # Project documentation, architecture, and setup guide
```

---

## 5. Local Setup & Testing Instructions

No build steps, node modules, or compilers are needed.

### Option A: Direct Browser Opening (Quickest)
1. Navigate to the project directory:
   `C:\Users\KRITHI\.gemini\antigravity\scratch\krithi-portfolio\` (or `C:\Users\KRITHI\Downloads\krithi-portfolio\krithi-portfolio\`)
2. Double-click `index.html` or right-click and choose **Open with > Google Chrome** (or Edge, Firefox, Brave).

### Option B: Local HTTP Server with PowerShell
To test with an actual local HTTP server:
```powershell
cd "C:\Users\KRITHI\.gemini\antigravity\scratch\krithi-portfolio"
# Start a simple static server using Python (if installed):
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option C: VS Code Live Server
1. Open the folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## 6. How to Publish Free using GitHub Pages

Publishing this portfolio website on GitHub Pages is completely free and takes less than 3 minutes:

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account at [github.com](https://github.com).
2. Click the **+** (plus icon) in the top-right corner and select **New repository**.
3. Name your repository (e.g., `portfolio` or `krithi-portfolio`).
   - *Tip:* If you name it `<your-github-username>.github.io`, your site will be hosted directly at `https://<your-github-username>.github.io/`.
4. Choose **Public**.
5. Do not initialize with a README (since you already have files).
6. Click **Create repository**.

### Step 2: Upload or Push the Project Files
#### Method 1: Using the GitHub Web Interface (No Git CLI required)
1. On the new repository page, click the link that says **"uploading an existing file"**.
2. Drag and drop all 4 files from the project folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `krithi-resume.pdf`
   - `implementation.md`
3. Click **Commit changes**.

#### Method 2: Using Git in Terminal
```powershell
cd "C:\Users\KRITHI\.gemini\antigravity\scratch\krithi-portfolio"
git init
git add .
git commit -m "Initial commit of Krithi portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on the **Settings** tab at the top.
2. In the left sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Wait 60–90 seconds. Refresh the page, and GitHub will provide your live URL:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 7. Implementation Checklist

- [x] **Resume Accuracy**: All experience, education, projects, skills, and certifications directly matched to resume. No fabricated metrics, testimonials, or external links.
- [x] **Semantic HTML5**: Valid structure with landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`).
- [x] **Dark Theme Design**: Modern obsidian palette with cyan, indigo, and emerald accents.
- [x] **Light Mode Support**: Seamless toggle with `localStorage` persistence.
- [x] **Hero Section**: Eyebrow, bold typography, status pill, CTAs, direct contact details, and terminal code card.
- [x] **About Section**: Full career objective, core interest cards, and language proficiency bars.
- [x] **Skills Section**: Technical and Professional skills categorized with tags and descriptions.
- [x] **Experience Section**: Thiranex Web Developer Internship with responsibilities and tech stack chips.
- [x] **Projects Section**: All 4 projects with live category filtering and interactive detail modal.
- [x] **Education Section**: B.E. (AIML) at AJIET, PUC at St. Agnes, and SSLC at Shubhodaya.
- [x] **Certifications Section**: Infosys Springboard (Python, Java) and Simplilearn (MS Excel) with verification badges.
- [x] **Contact Section**: One-click copy email & phone, direct links, and validated client-side contact form.
- [x] **Accessibility**: Skip link, keyboard focus styling, ARIA roles, label associations, screen-reader support.
- [x] **Mobile Responsiveness**: Clean breakpoints across desktop, tablet, mobile, and small phone screens.
- [x] **No Paid Dependencies**: Vanilla HTML5, CSS3, and JavaScript only.
