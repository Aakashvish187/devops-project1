/**
 * LACSO HUB — MongoDB Seed Script
 * Seeds all data from the original MySQL dump into MongoDB
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./src/models/User.model');
const Blog = require('./src/models/Blog.model');
const Service = require('./src/models/Service.model');
const Portfolio = require('./src/models/Portfolio.model');
const Testimonial = require('./src/models/Testimonial.model');
const Team = require('./src/models/Team.model');
const PricingPlan = require('./src/models/PricingPlan.model');
const AIKnowledge = require('./src/models/AIKnowledge.model');
const SiteSetting = require('./src/models/SiteSetting.model');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear all
  await Promise.all([
    User.deleteMany(), Blog.deleteMany(), Service.deleteMany(),
    Portfolio.deleteMany(), Testimonial.deleteMany(), Team.deleteMany(),
    PricingPlan.deleteMany(), AIKnowledge.deleteMany(), SiteSetting.deleteMany(),
  ]);
  console.log('🧹 Cleared all collections');

  // Admin user
  await User.create({
    username: 'boathead',
    email: 'aakash@lacsohub.com',
    password: await bcrypt.hash('Admin@1234', 10),
    role: 'super_admin',
  });
  console.log('👤 Admin user created (username: boathead, password: Admin@1234)');

  // Site settings
  await SiteSetting.insertMany([
    { key: 'site_name', value: 'LACSO HUB' },
    { key: 'tagline', value: 'AI-Powered Digital Growth Ecosystem' },
    { key: 'email', value: 'lacsohub@gmail.com' },
    { key: 'phone', value: '+91 88663 71807' },
    { key: 'whatsapp', value: '918866371807' },
    { key: 'address', value: 'Ahmedabad, Gujarat, India' },
    { key: 'instagram', value: 'https://instagram.com/lacsohub' },
    { key: 'twitter', value: 'https://twitter.com/lacsohub' },
    { key: 'linkedin', value: 'https://linkedin.com/company/lacsohub' },
    { key: 'youtube', value: 'https://youtube.com/@lacsohub' },
    { key: 'meta_title', value: 'LACSO HUB - Best Website Development Company in Gujarat' },
    { key: 'meta_desc', value: 'LACSO HUB offers AI-powered website & app development in Ahmedabad, Vadodara, Surat & Amreli. Affordable website development under ₹6999 in India.' },
  ]);

  // Services
  await Service.insertMany([
    { slug: 'ai-website-development', title: 'AI Website Development', shortDesc: 'Next-gen enterprise websites built for extreme performance and conversion.', fullDesc: 'We architect and build premium websites powered by modern frameworks. From dynamic content generation to intelligent UX personalization, every pixel serves a purpose.', icon: 'Monitor', features: ['Custom UI/UX Design','Performance Architecture','Mobile-first Design'], priceFrom: 25000, sortOrder: 1 },
    { slug: 'ai-automation', title: 'AI Automation', shortDesc: 'Intelligent workflows that work 24/7 for your business.', fullDesc: 'Deploy intelligent automation solutions that transform how your business operates. From lead capture bots to automated reporting systems, we build AI pipelines.', icon: 'Brain', features: ['Workflow Automation','CRM Integration','Zapier / Make'], priceFrom: 20000, sortOrder: 2 },
    { slug: 'seo-growth', title: 'SEO & Growth', shortDesc: 'Data-driven SEO strategies that put your brand at the top of Google.', fullDesc: 'Our advanced SEO strategies combine technical excellence with content intelligence. We build topical authority maps and execute campaigns that produce measurable growth.', icon: 'TrendingUp', features: ['Technical SEO Audit','Keyword Strategy','Link Building'], priceFrom: 15000, sortOrder: 3 },
    { slug: 'branding', title: 'Branding', shortDesc: 'Craft a brand identity so powerful it becomes the face of an industry.', fullDesc: 'From logo creation to complete visual identity systems, we build premium brands that command attention, communicate authority, and justify premium pricing.', icon: 'Palette', features: ['Logo Design','Brand Guidelines','Corporate Identity'], priceFrom: 18000, sortOrder: 4 },
    { slug: 'app-development', title: 'App Development', shortDesc: 'Build powerful mobile and web applications that scale with your ambitions.', fullDesc: 'From concept to launch, we engineer scalable applications using modern tech stacks. React Native, Flutter, and progressive web apps designed for high engagement.', icon: 'Smartphone', features: ['React Native / Flutter','Real-time Features','App Store Submission'], priceFrom: 35000, sortOrder: 5 },
    { slug: 'cloud-architecture', title: 'Cloud Architecture', shortDesc: 'Design and implementation of highly available cloud infrastructure.', fullDesc: 'We architect cloud systems designed for scale, security, and high availability. Whether multi-cloud or hybrid, we ensure your infrastructure can handle enterprise-grade traffic.', icon: 'Monitor', features: ['System Design','Load Balancing','Auto-scaling'], priceFrom: 50000, sortOrder: 6 },
    { slug: 'devops-consulting', title: 'DevOps Consulting', shortDesc: 'Streamline your development pipeline and accelerate deployment cycles.', fullDesc: 'We implement CI/CD pipelines, automate infrastructure provisioning, and establish monitoring protocols that allow your team to ship code faster and safer.', icon: 'Monitor', features: ['CI/CD Pipelines','Infrastructure as Code','Monitoring & Alerting'], priceFrom: 40000, sortOrder: 7 },
    { slug: 'docker-containerization', title: 'Docker Containerization', shortDesc: 'Package your applications for portability and consistent execution.', fullDesc: 'We dockerize your applications to ensure they run identically in development, staging, and production environments, eliminating "it works on my machine" issues forever.', icon: 'Monitor', features: ['Dockerfile Optimization','Multi-stage Builds','Docker Compose'], priceFrom: 20000, sortOrder: 8 },
    { slug: 'kubernetes-deployment', title: 'Kubernetes Deployment', shortDesc: 'Container orchestration for enterprise scale and absolute reliability.', fullDesc: 'We deploy, manage, and optimize Kubernetes clusters. Achieve true microservices architecture with zero-downtime deployments and self-healing infrastructure.', icon: 'Monitor', features: ['Cluster Setup','Helm Charts','Ingress Controllers'], priceFrom: 60000, sortOrder: 9 },
    { slug: 'aws-infrastructure', title: 'AWS Infrastructure', shortDesc: 'End-to-end deployment and management of Amazon Web Services.', fullDesc: 'As AWS experts, we leverage the full AWS ecosystem (EC2, S3, RDS, Lambda, ECS) to build cost-effective, scalable, and secure cloud environments.', icon: 'Monitor', features: ['EC2 / ECS Setup','RDS / DynamoDB','Lambda Serverless'], priceFrom: 45000, sortOrder: 10 }
  ]);

  // Portfolio
  await Portfolio.insertMany([
    { title: 'LACSO HUB Corporate Website', slug: 'lacso-hub-corporate', clientName: 'Internal', industry: 'Technology', serviceType: 'Website Development', category: 'Website Development', challenge: 'Building a modern, highly performant digital agency platform capable of showcasing advanced engineering capabilities.', solution: 'Engineered a lightning-fast MERN stack application featuring a premium glassmorphism UI, advanced Framer Motion animations, and an intelligent scalable backend.', results: ['Sub 1-second load times globally','Perfect 100 Lighthouse score','Fully responsive advanced UI','Scalable REST API architecture'], beforeMetric: 'N/A', afterMetric: '100% Performance', isFeatured: true, sortOrder: 1 },
    { title: 'Enterprise Cloud Migration', slug: 'enterprise-cloud-migration', clientName: 'FinServe Global', industry: 'Finance', serviceType: 'Cloud Architecture', category: 'Cloud Architecture', challenge: 'Legacy on-premise infrastructure causing severe downtime and scaling limitations during peak trading hours.', solution: 'Designed and executed a zero-downtime migration to AWS. Implemented auto-scaling EC2 clusters, RDS Multi-AZ, and comprehensive CloudWatch monitoring.', results: ['99.999% uptime achieved','Infrastructure costs reduced by 35%','Zero downtime during migration','Deployment speed increased 400%'], beforeMetric: '89% Uptime', afterMetric: '99.999% Uptime', isFeatured: true, sortOrder: 2 },
    { title: 'DevOps Automation Platform', slug: 'devops-automation-platform', clientName: 'TechScale Inc', industry: 'SaaS', serviceType: 'DevOps Consulting', category: 'DevOps Consulting', challenge: 'Manual deployment processes resulting in human errors, failed releases, and 2-week release cycles.', solution: 'Built a robust CI/CD pipeline using GitHub Actions, Docker, and Terraform. Implemented automated testing and zero-touch deployments.', results: ['Release cycle reduced to 2 hours','Deployment failure rate dropped to 0%','120 developer hours saved monthly','Automated security scanning integrated'], beforeMetric: '2 Week Release', afterMetric: '2 Hour Release', isFeatured: true, sortOrder: 3 },
    { title: 'Kubernetes Infrastructure Deployment', slug: 'k8s-infrastructure', clientName: 'HealthData Pro', industry: 'Healthcare', serviceType: 'Kubernetes Deployment', category: 'Kubernetes Deployment', challenge: 'Monolithic application struggling with massive data processing loads and strict HIPAA compliance requirements.', solution: 'Refactored monolith into microservices. Deployed a secure, isolated Kubernetes (EKS) cluster with strict RBAC, network policies, and Istio service mesh.', results: ['Successfully handled 10x traffic spike','Achieved HIPAA compliance audit','Resource utilization optimized by 60%','Self-healing pods eliminated manual restarts'], beforeMetric: 'Monolithic', afterMetric: 'Microservices', isFeatured: false, sortOrder: 4 },
    { title: 'AI Business Assistant', slug: 'ai-business-assistant', clientName: 'LegalTech Associates', industry: 'Legal', serviceType: 'AI Chatbots', category: 'AI Chatbots', challenge: 'Paralegals spending 70% of their time answering repetitive client case status inquiries.', solution: 'Trained a custom LLM on company documentation and case databases. Deployed an intelligent virtual assistant with secure CRM integration.', results: ['Handled 8,000+ queries in month one','Paralegal efficiency increased 300%','Client satisfaction score up 45%','Instant response times 24/7'], beforeMetric: '4hr response', afterMetric: 'Instant response', isFeatured: false, sortOrder: 5 },
    { title: 'E-Commerce Modernization', slug: 'ecommerce-modernization', clientName: 'RetailEdge', industry: 'E-Commerce', serviceType: 'React Development', category: 'React Development', challenge: 'Outdated frontend resulting in high cart abandonment and poor mobile experience.', solution: 'Rebuilt the storefront using Next.js/React. Implemented intelligent caching, optimized image delivery, and a seamless headless checkout flow.', results: ['Cart abandonment reduced by 42%','Mobile conversion rate doubled','Page load speed improved by 3.5s','Overall revenue increased 68%'], beforeMetric: '1.2% Conversion', afterMetric: '4.8% Conversion', isFeatured: true, sortOrder: 6 },
  ]);

  // Testimonials
  await Testimonial.insertMany([
    { clientName: 'Rajesh Kumar', clientTitle: 'CEO', clientCompany: 'RetailX India', quote: 'LACSO HUB did not just build us a website — they built us a revenue machine. Our monthly sales tripled in 90 days.', rating: 5, serviceUsed: 'AI Website Development', sortOrder: 1 },
    { clientName: 'Dr. Priya Mehta', clientTitle: 'Founder', clientCompany: 'GreenLeaf Dental', quote: 'We went from virtually invisible online to the #1 dental clinic in our city for 47 search terms. The ROI has been extraordinary.', rating: 5, serviceUsed: 'SEO & Growth', sortOrder: 2 },
    { clientName: 'Sanjay Patel', clientTitle: 'Sales Director', clientCompany: 'PropVista Realty', quote: 'The AI automation they deployed is genuinely mind-blowing. Our response time went from hours to seconds. We closed 3x more deals in the first quarter.', rating: 5, serviceUsed: 'AI Automation', sortOrder: 3 },
    { clientName: 'Ananya Singh', clientTitle: 'Marketing Head', clientCompany: 'TechStart Ventures', quote: 'Their branding work elevated us from a startup to feeling like a premium unicorn brand. World-class.', rating: 5, serviceUsed: 'Branding', sortOrder: 4 },
    { clientName: 'Mohammed Al-Hassan', clientTitle: 'Founder', clientCompany: 'GulfBiz Solutions', quote: 'Delivered on time, on budget, and the app quality exceeded every expectation. 4.8 stars on the app store.', rating: 5, serviceUsed: 'App Development', sortOrder: 5 },
  ]);

  // Team
  await Team.insertMany([
    { name: 'Aakash Vishwakarma', title: 'Founder', role: 'founder', bio: 'Highly skilled with deep knowledge in AI systems, automation, full-stack development, growth strategy, and digital architecture. Visionary leader driving LACSO HUB innovation.', education: 'Cloud Computing Student & Advanced Technical Expert', focus: 'AI Systems, Automation, Full-Stack Dev, Growth Strategy, Digital Architecture', linkedin: 'https://www.linkedin.com/in/aakash-vishwakarma-750b59334/', image: '/images/founder.png', sortOrder: 1 },
    { name: 'Vidhan Rajvi', title: 'Cloud Architect & DevOps Engineer', role: 'co-founder', bio: 'Cloud infrastructure maestro and DevOps architect. Vidhan designs highly available, secure, and infinitely scalable systems that power enterprise applications.', education: 'Systems Architecture & Cloud Engineering', focus: 'AWS, Docker, Kubernetes, Linux, CI/CD, Terraform, Cloud Infrastructure, DevOps Automation', linkedin: 'https://www.linkedin.com/in/vidhan-rajvi05/', image: '/images/vidhan.png', sortOrder: 2 },
  ]);

  // Pricing
  await PricingPlan.insertMany([
    { planKey: 'starter', title: 'Starter Website', price: '₹6,999', priceNote: 'One-time', description: 'Best for small businesses starting their digital presence.', features: [{text:'AI optimized website',included:true},{text:'Up to 5 pages',included:true},{text:'Mobile responsive design',included:true},{text:'Basic SEO setup',included:true},{text:'Contact form integration',included:true},{text:'1 month support',included:true},{text:'Custom AI-powered CMS',included:false},{text:'WhatsApp chatbot',included:false}], ctaText: 'Start Project', ctaUrl: '/contact?plan=starter', badge: '', isHighlight: false, sortOrder: 1 },
    { planKey: 'growth', title: 'Growth Website', price: '₹16,999', priceNote: 'One-time', description: 'Best for growing businesses needing automation and SEO growth.', features: [{text:'Everything in Starter',included:true},{text:'AI powered CMS',included:true},{text:'WhatsApp chatbot integration',included:true},{text:'Blog system',included:true},{text:'SEO architecture setup',included:true},{text:'Google analytics integration',included:true},{text:'Lead capture system',included:true},{text:'3 months support',included:true}], ctaText: 'Launch Growth Plan', ctaUrl: '/contact?plan=growth', badge: 'Most Popular', isHighlight: true, sortOrder: 2 },
    { planKey: 'platform', title: 'AI Business Platform', price: '₹50,000+', priceNote: 'Custom Quote', description: 'Best for businesses that want full AI digital infrastructure.', features: [{text:'Custom AI website system',included:true},{text:'Automation workflows',included:true},{text:'CRM integration',included:true},{text:'AI chatbot training',included:true},{text:'Advanced analytics dashboard',included:true},{text:'Custom backend CMS',included:true},{text:'API integrations',included:true},{text:'Priority support',included:true}], ctaText: 'Book Strategy Call', ctaUrl: '/contact?plan=platform', badge: 'Enterprise', isHighlight: false, sortOrder: 3 },
  ]);

  // AI Knowledge Base
  await AIKnowledge.insertMany([
    { keywords: ['company history','founded','origin','aakash','about us'], content: 'LACSO HUB was founded by Aakash Vishwakarma. Vidhan Rajvi serves as Cloud Architect & DevOps Engineer. We are a premium digital engineering and growth agency.', status: 'active' },
    { keywords: ['services','what do you offer','solutions','build','create'], content: 'We offer AI Website Development, AI Automation, SEO & Growth, Branding, App Development, Cloud Architecture, DevOps Consulting, Docker Containerization, Kubernetes Deployment, and AWS Infrastructure.', status: 'active' },
    { keywords: ['pricing','cost','plans','package','how much','fees'], content: 'We offer 3 plans: Starter ₹6,999 (one-time), Growth ₹16,999 (one-time), and AI Business Platform ₹50,000+ (custom). Contact us for custom enterprise architecture quotes.', status: 'active' },
    { keywords: ['team','leadership','founder','vidhan'], content: 'Aakash Vishwakarma is the Founder. Vidhan Rajvi is Cloud Architect & DevOps Engineer.', status: 'active' },
  ]);

  // Blogs
  await Blog.insertMany([
    { title: 'Why Every Business Needs an AI-First Website in 2025', slug: 'ai-first-website-2025', excerpt: 'The difference between businesses that thrive and those that fade is their ability to leverage AI.', content: '<h2>The AI Revolution is Not Coming — It is Here</h2><p>While traditional agencies debate design trends, forward-thinking businesses are deploying AI-powered websites that learn, adapt, and convert.</p><h2>Key Features of AI-First Websites</h2><ul><li>Dynamic content personalization based on user behavior</li><li>AI-driven SEO that adapts to algorithm changes</li><li>Intelligent chatbots that qualify leads 24/7</li><li>Predictive analytics dashboards</li></ul>', author: 'Aakash Vishwakarma', category: 'AI Strategy', tags: ['AI','Website','2025','Digital Transformation'], status: 'published', isPublished: true },
    { title: 'How AI Automation Saved Our Client 180 Hours Per Month', slug: 'ai-automation-case-study', excerpt: 'A real estate company was drowning in manual follow-ups. We deployed an AI automation stack that changed everything.', content: '<h2>The Problem</h2><p>PropVista Realty had a motivated sales team spending over 6 hours per day on manual lead follow-ups.</p><h2>The Solution</h2><p>We deployed an AI WhatsApp chatbot, automated property brochure delivery, lead scoring pipeline, and CRM integration.</p><h2>Results</h2><p>Response time dropped from 4 hours to 8 seconds. The team reclaimed 180 hours per month.</p>', author: 'Aakash Vishwakarma', category: 'Automation', tags: ['Automation','Real Estate','AI','WhatsApp','ROI'], status: 'published', isPublished: true },
    { title: 'The 2025 SEO Playbook: How AI is Rewriting the Rules', slug: 'seo-playbook-2025', excerpt: "Google's AI revolution has changed SEO forever. Here is the complete playbook for dominating search in 2025.", content: '<h2>SEO in 2025 is Fundamentally Different</h2><p>The old rules of keyword stuffing and backlink buying are not just ineffective — they are punishable.</p><h2>The New Ranking Factors</h2><ul><li>E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</li><li>Topical Authority clusters</li><li>Core Web Vitals</li><li>User engagement metrics</li></ul>', author: 'Aakash Vishwakarma', category: 'SEO', tags: ['SEO','Google','AI','2025','Rankings'], status: 'published', isPublished: true },
  ]);

  console.log('✅ All data seeded successfully!');
  console.log('📋 Summary: 1 admin, 5 services, 3 portfolio, 5 testimonials, 3 team, 3 pricing plans, 4 KB entries, 3 blogs');
  process.exit(0);
};

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
