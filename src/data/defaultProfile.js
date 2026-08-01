export const defaultProfileData = {
  name: "Daffa Albani",
  title: "Mahasiswa Information Technology @ Universitas Brawijaya | Backend & IoT Developer",
  tagline: "Information Technology student with a solid foundation in backend development, database management, and Internet of Things (IoT) systems.",
  bio: "Saya adalah mahasiswa Information Technology di Fakultas Vokasi Universitas Brawijaya (2024–Present) yang berfokus pada backend development, database management (Laravel & MySQL), dan Internet of Things (IoT). Berpengalaman dalam merancang arsitektur API, pemodelan ERD, penulisan kode bersih, dokumentasi teknis, serta aktif dalam organisasi kemahasiswaan.",
  avatar: "/avatar-default.png",
  location: "Surabaya, Jawa Timur, Indonesia",
  email: "daffaalbani13@student.ub.ac.id",
  phone: "0882010016160",
  availability: "Terbuka untuk Magang, Freelance, & AI Tutor",
  socials: {
    github: "https://github.com/DaffaAlbani",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
  },
  stats: [
    { label: "Institusi Kampus", value: "Univ. Brawijaya" },
    { label: "Program Studi", value: "D3 IT (2024-Pres)" },
    { label: "Fokus Spesialisasi", value: "Backend & IoT" },
    { label: "Tech Stack Utama", value: "Laravel & MySQL" }
  ],
  skills: [
    { name: "PHP & Laravel Framework", category: "Backend", level: 92 },
    { name: "MySQL & Database Schema Design", category: "Database", level: 90 },
    { name: "C++ & Arduino IDE (ESP32 IoT)", category: "IoT & Embedded", level: 88 },
    { name: "JavaScript & HTML/CSS", category: "Web Frontend", level: 85 },
    { name: "API Architecture & ERD Modeling", category: "Architecture", level: 90 },
    { name: "Git & GitHub Version Control", category: "Tools", level: 88 },
    { name: "Log Analysis & Cybersecurity (picoCTF)", category: "Security", level: 82 },
    { name: "Technical Writing & Documentation", category: "Soft Skills", level: 85 }
  ],
  projects: [
    {
      id: 1,
      title: "IoT-Based Smart Trash Can System",
      category: "IoT & Hardware",
      description: "Sistem Tempat Sampah Pintar otomatis berbasis mikrokontroler ESP32 Wroom, sensor ultrasonik, dan motor servo. Dilengkapi backend PHP & MySQL untuk pencatatan data real-time serta dokumentasi standar akademik Harvard.",
      tags: ["ESP32", "C++", "PHP", "MySQL", "IoT"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://github.com/DaffaAlbani",
      githubUrl: "https://github.com/DaffaAlbani"
    },
    {
      id: 2,
      title: "Database & Web Application Systems",
      category: "Backend Development",
      description: "Pengembangan arsitektur backend aplikasi web menggunakan Laravel framework, perancangan skema SQL kompleks, serta pemodelan Entity-Relationship Diagram (ERD) untuk efisiensi manajemen data.",
      tags: ["Laravel", "PHP", "MySQL", "ERD", "GitHub"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://github.com/DaffaAlbani",
      githubUrl: "https://github.com/DaffaAlbani"
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Cybersecurity Training – picoCTF Classroom",
      issuer: "picoCTF / Cybersecurity Training",
      date: "2025",
      credentialUrl: "https://picoctf.org",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Associate Degree (D3) in Information Technology",
      issuer: "Universitas Brawijaya - Fakultas Vokasi",
      date: "2024 - Present",
      credentialUrl: "https://vokasi.ub.ac.id",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    }
  ],
  experiences: [
    {
      role: "Active Member / Staff",
      company: "Student Executive Board (BEM) - Universitas Brawijaya",
      period: "2024 - Present",
      description: "Berkolaborasi dalam tim lintas fungsi untuk mengelola program kerja kampus dan inisiatif mahasiswa.",
      achievements: [
        "Menyusun draf surat komitmen resmi, proposal kegiatan, dan laporan internal organisasi",
        "Mengkoordinasi pelaksanaan acara kemahasiswaan tingkat fakultas"
      ]
    }
  ]
};
