# 🎬 VidForge

>**VidForge** is a powerful and easy-to-use video processing web application built using Java Fullstack technologies. It enables users to upload, edit, and download videos directly from the browser.

---

## 🚀 Features

- 📁 Upload and store videos securely
- ✂️ Trim, crop, and merge videos(comming soon)
- 🎨 Add filters, watermarks, or text overlays(comming soon)
- 🔊 Extract or replace audio(comming soon)
- ⏱️ Adjust video speed
- 📥 Download edited videos
- 🧑‍💻 Admin dashboard for managing content and users

---

## 🛠️ Tech Stack

>**Frontend:**
- React.js or Thymeleaf (update as per your stack)
- HTML, CSS, JavaScript

>**Backend:**
- Java 17+
- Spring Boot
- Spring Mongodb
- Spring Security(Comming soon)
- RESTful APIs
- **FFmpeg for video processing**

>**Database:**
- Mongodb

>**Storage:**
- Local File System / AWS S3 (based on implementation)

---

## 🧰 FFmpeg Setup (Required)

VidForge uses **FFmpeg** to perform all video editing and transformation tasks like trimming, merging, watermarking, etc.

>### 🔧 Install FFmpeg

>#### On Windows:
1. Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract and add the `bin` folder to your system `PATH`

>#### On macOS (Homebrew):
```bash
brew install ffmpeg
```

>On Linux (Debian/Ubuntu):
```bash
sudo apt update
sudo apt install ffmpeg
```

>✅ Verify Installation

Run this in your terminal:
```bash
ffmpeg -version
```
You should see the FFmpeg version and configuration if it's correctly installed.

---
## ⚙️ Installation

>### 1. Clone the Repository
>### For Backend
```bash
git clone https://github.com/ddsha441981/vidforge-video-processing.git
cd vidforge-backend
```
>### 2. Backend Setup (Spring Boot + FFmpeg)
```bash
cd vidforge-backend
./mvnw clean install
./mvnw spring-boot:run
```
Make sure ffmpeg is accessible in your system PATH. The backend will use it via ProcessBuilder or external Java wrappers.

Make sure you update application.properties with your DB credentials and storage path.
>### 3. Frontend Setup (React)
```bash
cd vidforge-frontend-react
npm install
npm run dev
```
>For User
```bash
localhost:5173/video-upload
```
>For Admin
```bash
http://localhost:5173/dashboard
```

 ## Endpoints

| **Method** | **Endpoint**                                                                 | **Description**                          |
|------------|------------------------------------------------------------------------------|------------------------------------------|
| POST       | `/api/v1/videos/upload`                                                     | Upload a video                           |
| GET        | `/api/v1/admin/videos`                                                      | Get all videos                           |
| GET        | `/api/v1/admin/videos/{videoId}`                                            | Get video by ID                          |
| GET        | `/api/v1/admin/paginated?page=0&size=10`                                    | Get paginated list of all videos         |
| GET        | `/api/v1/admin/paginated/status?status=COMPLETED&page=3&size=5`             | Get paginated videos by status           |
| GET        | `/api/v1/admin/videos/status/COMPLETED`                                     | Get all videos by status                 |
| PUT        | `/api/videos/{id}/edit`                                                     | Edit video                               |
| DELETE     | `/api/v1/admin/videos/{videoId}`                                            | Delete a video                           |

---
> 📘 **Note:**  
> To explore your API using HAL Explorer, navigate to:  
> [http://localhost:9090/explorer/index.html#uri=/](http://localhost:9090/explorer/index.html#uri=/)  
>  
> Make sure your Spring Boot application is running and you've included the dependency:
> 
> ```xml
> <dependency>
>     <groupId>org.springframework.data</groupId>
>     <artifactId>spring-data-rest-hal-explorer</artifactId>
> </dependency>
> ```

---
## 📸 Screenshots

>### 🎞️ Dashboard View
![Dashboard](https://raw.githubusercontent.com/ddsha441981/vidforge-video-processing/main/screenshots/home.png)

>### 🔧 Video Gallery
![Player](https://raw.githubusercontent.com/ddsha441981/vidforge-video-processing/main/screenshots/gallery.png)


>### 🔧 Video Player Screen
![Player](https://raw.githubusercontent.com/ddsha441981/vidforge-video-processing/main/screenshots/player.png)

>### 🔧 Video Upload Screen
![Upload](https://raw.githubusercontent.com/ddsha441981/vidforge-video-processing/main/screenshots/upload1.png)
![Upload](https://raw.githubusercontent.com/ddsha441981/vidforge-video-processing/main/screenshots/upload2.png)
---
## ✍️ Author

>**Deendayal Kumawat**  
Java Fullstack Developer  

>[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/deendayal-kumawat/)  
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&logoColor=white)](https://github.com/ddsha441981)

---
📄 License

>This project is licensed under the MIT License.
---
⭐ Contribute

>Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

```bash
git checkout -b feature/your-feature
git commit -m "Added new feature"
git push origin feature/your-feature
```

---

🙌 Support

>If you like the project, give it a ⭐ and share with your friends.
Feel free to raise issues or ideas in the Issues section.

```bash
Want me to customize this with your actual endpoints, tech stack, or project structure? Just let me know — we can polish it even more!
```
---
💬 Questions?

>If you face any issues with FFmpeg integration, feel free to open an issue or connect with the community.

## Let me know:
```bash
- Do you use FFmpeg directly via `ProcessBuilder` in Java or via a library like `Xabe.FFmpeg`, `Jaffree`, or others?
- Want me to include a Java FFmpeg usage snippet inside the README or code section too?
```
---
