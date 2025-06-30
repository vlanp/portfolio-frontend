import { ITimelineDatas } from "@/types/ITimelineData";
import PageContainer from "../ui/page-container";
import Timeline from "../ui/timeline-page/timeline";
import { ILang } from "@/types/ILang";
import { IDictionary } from "../dictionaries/generated";
import { getDictionary } from "../dictionaries";

const timelineDatas: ITimelineDatas = {
  studies: [
    {
      _id: "master-informatique",
      title: {
        en: "Master's in Computer Science",
        fr: "Master en Informatique",
      },
      startDate: new Date(2020, 8), // Septembre 2020
      endDate: new Date(2022, 5), // Juin 2022
      description: {
        en: "Specialization in web development and artificial intelligence. Final project on advanced React applications.",
        fr: "Spécialisation en développement web et intelligence artificielle. Projet de fin d'études sur les applications React avancées.",
      },
      establishement: "Université de Technologie",
      place: "Paris, France",
      type: "studies",
    },
    {
      _id: "licence-informatique",
      title: {
        en: "Bachelor's in Computer Science",
        fr: "Licence Informatique",
      },
      startDate: new Date(2017, 8), // Septembre 2017
      endDate: new Date(2020, 5), // Juin 2020
      description: {
        en: "Comprehensive training in programming, databases and algorithms. Graduated with honors.",
        fr: "Formation complète en programmation, bases de données et algorithmique. Mention Bien.",
      },
      establishement: "Université Paris-Sud",
      place: "Orsay, France",
      type: "studies",
    },
    {
      _id: "dut-informatique",
      title: {
        en: "Technical Degree in Computer Science",
        fr: "DUT Informatique",
      },
      startDate: new Date(2015, 1), // Septembre 2015
      endDate: new Date(2015, 2), // Juin 2017
      description: {
        en: "Strong foundation in development and computer systems.",
        fr: "Bases solides en développement et systèmes informatiques.",
      },
      establishement: "IUT de Cachan",
      place: "Cachan, France",
      type: "studies",
    },
  ],
  experiences: [
    {
      _id: "senior-frontend-dev",
      title: {
        en: "Senior Frontend Developer",
        fr: "Développeur Frontend Senior",
      },
      startDate: new Date(2022, 6), // Juillet 2022
      endDate: new Date(2024, 11), // Décembre 2024
      description: {
        en: "Development of complex React applications, junior team mentoring, frontend performance optimization.",
        fr: "Développement d'applications React complexes, mentoring d'équipe junior, optimisation des performances frontend.",
      },
      enterprise: "TechCorp Solutions",
      place: "Paris, France",
      type: "experiences",
    },
    {
      _id: "fullstack-dev",
      title: {
        en: "Full-Stack Developer",
        fr: "Développeur Full-Stack",
      },
      startDate: new Date(2021, 1), // Février 2021
      endDate: new Date(2022, 5), // Juin 2022
      description: {
        en: "Complete e-commerce platform creation with React/Node.js. Technical architecture management.",
        fr: "Création d'une plateforme e-commerce complète avec React/Node.js. Gestion de l'architecture technique.",
      },
      enterprise: "StartupInnovante",
      place: "Lyon, France",
      type: "experiences",
    },
    {
      _id: "web-dev-intern",
      title: {
        en: "Web Developer Intern",
        fr: "Stagiaire Développeur Web",
      },
      startDate: new Date(2021, 5), // Juin 2020
      endDate: new Date(2021, 7), // Août 2020
      description: {
        en: "First professional contact with modern web technologies. Development of showcase and e-commerce websites.",
        fr: "Premier contact professionnel avec les technologies web modernes. Développement de sites vitrines et e-commerce.",
      },
      enterprise: "WebAgency Pro",
      place: "Marseille, France",
      type: "experiences",
    },
    {
      _id: "student-job-tech",
      title: {
        en: "Student Tech Support",
        fr: "Job étudiant Tech",
      },
      startDate: new Date(2018, 8), // Septembre 2018
      endDate: new Date(2019, 5), // Juin 2019
      description: {
        en: "Technical support and computer systems maintenance.",
        fr: "Support technique et maintenance de systèmes informatiques.",
      },
      enterprise: "TechSupport Ltd",
      place: "Paris, France",
      type: "experiences",
    },
  ],
  projects: [
    {
      _id: "project-management-platform",
      title: {
        en: "Project Management Platform",
        fr: "Plateforme de Gestion de Projets",
      },
      startDate: new Date(2024, 0), // Janvier 2024
      description: {
        en: "Complete project management application with real-time collaboration, push notifications and analytics dashboard.",
        fr: "Application complète de gestion de projets avec collaboration en temps réel, notifications push et tableau de bord analytique.",
      },
      technologies: "React, Node.js, MongoDB",
      status: {
        en: "Creation in progress",
        fr: "En cours de création",
      },
      type: "projects",
    },
    {
      _id: "fitness-mobile-app",
      title: {
        en: "Fitness Mobile App",
        fr: "Application Mobile de Fitness",
      },
      startDate: new Date(2023, 2), // Mars 2023
      endDate: new Date(2023, 8), // Septembre 2023
      description: {
        en: "Mobile app for physical exercise tracking with gamification, progress tracking and social community.",
        fr: "App mobile pour le suivi d'exercices physiques avec gamification, suivi des progrès et communauté sociale.",
      },
      technologies: "React Native, Firebase",
      status: {
        en: "Completed",
        fr: "Terminé",
      },
      type: "projects",
    },
    {
      _id: "personal-portfolio",
      title: {
        en: "Personal Portfolio Website",
        fr: "Site Portfolio Personnel",
      },
      startDate: new Date(2023, 0), // Janvier 2023
      endDate: new Date(2023, 2), // Mars 2023
      description: {
        en: "Personal website showcasing my projects and skills with smooth animations and responsive design.",
        fr: "Site web personnel showcasing mes projets et compétences avec animations fluides et design responsive.",
      },
      technologies: "Next.js, Tailwind CSS",
      status: {
        en: "Completed",
        fr: "Terminé",
      },
      type: "projects",
    },
    {
      _id: "discord-bot",
      title: {
        en: "Discord Bot",
        fr: "Bot Discord",
      },
      startDate: new Date(2022, 3), // Avril 2022
      endDate: new Date(2022, 6), // Juillet 2022
      description: {
        en: "Moderation and entertainment bot for Discord servers with custom commands.",
        fr: "Bot de modération et divertissement pour serveurs Discord avec commandes personnalisées.",
      },
      technologies: "Python, Discord.py",
      status: {
        en: "Completed",
        fr: "Terminé",
      },
      type: "projects",
    },
    {
      _id: "ecommerce-api",
      title: {
        en: "E-commerce REST API",
        fr: "API REST E-commerce",
      },
      startDate: new Date(2021, 0), // Janvier 2021
      endDate: new Date(2021, 4), // Mai 2021
      description: {
        en: "Complete REST API for online store with JWT authentication and order management.",
        fr: "API REST complète pour boutique en ligne avec authentification JWT et gestion des commandes.",
      },
      technologies: "Express.js, PostgreSQL",
      status: {
        en: "Completed",
        fr: "Terminé",
      },
      type: "projects",
    },
  ],
} satisfies ITimelineDatas;

const TimelinePage = async ({
  params,
}: {
  params: Promise<{ lang: ILang }>;
}) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const timelineDict: IDictionary["Timeline"] = (await getDictionary(lang))
    .Timeline;
  return (
    <PageContainer className="flex grow justify-center">
      <Timeline
        timelineDatas={timelineDatas}
        timelineDict={timelineDict}
        lang={lang}
      />
    </PageContainer>
  );
};

export default TimelinePage;
