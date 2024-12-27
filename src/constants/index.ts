import {
  CountryType,
  MenuItem,
  ScholarshipsFiltersKeys,
  SocialIconType
} from '@/types';
import facebookIcon from '/public/assets/svg/facebook.svg';
import instagramIcon from '/public/assets/svg/instagram.svg';
import twitterIcon from '/public/assets/svg/twitter.svg';
import linkedInIcon from '/public/assets/svg/linkedin.svg';
import settingsIcon from '/public/assets/svg/settings.svg';
import callUsIcon from '/public/assets/svg/callUs.svg';
import emailIcon from '/public/assets/svg/email.svg';
import chatbotIcon from '/public/assets/svg/chatbot.svg';
import { getNextTenYears } from '@/utils/helperFunctions';

export const carouselImages = [
  '/assets/png/cover1.jpg',
  '/assets/png/cover2.png',
  '/assets/png/cover1.jpg',
  '/assets/png/cover2.png'
];

export const VIDEO_DATA = [
  {
    name: 'University',
    imageUrl: '/assets/png/video1.png',
    title: 'Why Choose Scholar Bee?',
    description:
      'Your one-stop platform for simplifying admissions and discovering scholarships. Achieve more with less stress.'
  },
  {
    focused: true,
    name: 'ScholarBee',
    imageUrl: '/assets/png/video2.png',
    title: 'How Scholar Bee Works?',
    description:
      'We connect your goals with top universities, simplifying every step of the admission process.'
  },
  {
    name: 'Student',
    imageUrl: '/assets/png/video3.png',
    title: 'How to Apply?',
    description:
      '50+ top universities and their application forms just a click away. ScholarBee provides you with multiple options all in one place! '
  }
];

export const dropdownOptions = [
  {
    value: '1',
    label: 'Not Identified'
  },
  {
    value: '2',
    label: 'Closed'
  },
  {
    value: '3',
    label: 'Communicated'
  },
  {
    value: '4',
    label: 'Identified'
  },
  {
    value: '5',
    label: 'Resolved'
  },
  {
    value: '6',
    label: 'Cancelled'
  }
];

export const imageWidth = [182, 270, 170, 262];

export const PROGRAMS_DATA = [
  {
    id: 1,
    title:
      'Bachelor of Arts and Bachelor of Computer and Information Sciences Conjoint programs',
    location: 'New York City, USA',
    rating: 4.0,
    deadline: '24-11-2024',
    fee: '20000',
    studyMode: 'Online',
    isScholarshipAvailable: false,
    imageUrl: '/assets/png/program1.png'
  },
  {
    id: 2,
    title: 'Masters of Applied Physics and Atomic Energy Conjoint programs',
    location: 'New York City, USA',
    rating: 4.0,
    deadline: '24-11-2024',
    fee: '20000',
    studyMode: 'Online',
    isScholarshipAvailable: true,
    imageUrl: '/assets/png/program2.png'
  },
  {
    id: 3,
    title: 'Masters of Applied Physics and Atomic Energy Conjoint programs',
    location: 'New York City, USA',
    rating: 4.0,
    deadline: '24-11-2024',
    fee: '20000',
    studyMode: 'Online',
    isScholarshipAvailable: false,
    imageUrl: '/assets/png/program3.png'
  }
];

export const STATS = [
  {
    title: 'Sign ups',
    value: '5000+'
  },
  {
    title: 'Universities in Pakistan',
    value: '20+'
  },
  {
    title: 'Universities in UAE',
    value: '10+'
  }
  // {
  //   title: 'Scholarships',
  //   value: '4200+'
  // }
];

export const menuItems: MenuItem[] = [
  { key: 'explore', label: 'Home', path: '/', className: 'menuItem' },
  { key: 'features', label: 'Programs', path: '/programs' },
  { key: 'about', label: 'Scholarships', path: '/scholarships' },
  { key: 'contact', label: 'Community', path: '/community' }
];

export const RESOURCES = [
  {
    label: 'HEC',
    path: '/'
  },
  {
    label: 'Australian Embassy',
    path: '/'
  },
  {
    label: 'Pakistan Hight Commission',
    path: '/'
  },
  {
    label: 'Poland School of Languages',
    path: '/'
  }
];

export const PARTNERS = [
  {
    label: 'RIPHAH International',
    path: '/'
  },
  {
    label: 'FAST',
    path: '/'
  },
  {
    label: 'COMSATS',
    path: '/'
  }
];

export const LINKS = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Programs',
    path: '/'
  },
  // {
  //   label: 'Scholarships',
  //   path: '/'
  // },
  {
    label: 'About',
    path: '/'
  },
  {
    label: 'Blogs',
    path: '/'
  }
];

export const SOCIAL_ICONS: SocialIconType[] = [
  {
    href: '/#',
    src: facebookIcon,
    alt: 'facebook icon'
  },
  { href: '/#', src: twitterIcon, alt: 'twitter icon' },
  {
    href: '/#',
    src: instagramIcon,
    alt: 'instagram icon'
  },
  { href: '/#', src: linkedInIcon, alt: 'linkedin icon' }
];

export const FOOTER_SECTIONS = [
  { title: 'Resources', items: RESOURCES },
  { title: 'Partners', items: PARTNERS },
  { title: 'Links', items: LINKS },
  {
    title: 'Contacts',
    items: [
      {
        label:
          'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E',
        path: '#'
      },
      { label: 'Call Us: +1 23456789', path: '#' },
      { label: 'test@gmail.com', path: '#' }
    ]
  }
];

export const reviewCards = [
  { key: 1, highlighted: false },
  { key: 2, highlighted: true },
  { key: 3, highlighted: false }
];
export const FOOTER_LINKS = [
  { title: 'Home', link: '/' },
  { title: 'Programs', link: '/programs' },
  // { title: 'Scholarships', link: '/scholarships' },
  { title: 'About Us', link: '/aboutus' },
  { title: 'Blog', link: '/blogs' },
  { title: 'Contact Us', link: '/contact-us' }
];

export const pages = [
  { title: 'Home', link: '/' },
  { title: 'Programs', link: '/programs' }
  // { title: 'Scholarships', link: '/scholarships' }
  // { title: 'Community', link: '/community' }
];

export const responsiveMenu = ['Home', 'Product', 'Pricing', 'Account'];

export const TOP_UNIVERSITIES = [
  {
    value: "Sardar Bahadur Khan Women's University",
    label: "Sardar Bahadur Khan Women's University"
  },
  { value: 'COMSATS', label: 'COMSATS' },
  { value: 'Harvard', label: 'Harvard' },
  { value: 'Stanford', label: 'Stanford' },
  { value: 'MIT', label: 'MIT' },
  { value: 'Oxford', label: 'Oxford' },
  { value: 'Cambridge', label: 'Cambridge' }
];

export const PROGRAM_TYPES = [
  { label: 'Bachelors', value: 'Bachelor' },
  { label: 'Masters', value: 'Master' }
];

export const SPECIALIZATIONS = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Business', label: 'Business' },
  { value: 'Design and Arts', label: 'Design and Arts' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Medicine', label: 'Medicine' }
];

export const SEARCHES = [
  {
    id: 2,
    title: 'Program Type',
    name: 'studyLevel',
    data: PROGRAM_TYPES
  },
  {
    id: 3,
    name: 'major',
    title: 'Specialization',
    data: SPECIALIZATIONS
  }
];
export const FAQ_DATA = [
  {
    id: 'faq1',
    question: 'What is Scholar Bee?',
    answer:
      'Scholar Bee is a platform that connects students to global universities and scholarships, all in one place.'
  },
  {
    id: 'faq2',
    question: 'Can I use Scholar Bee to study abroad?',
    answer:
      'Yes! Scholar Bee helps students find international universities worldwide.'
  },
  {
    id: 'faq3',
    question: 'What documents do I need to apply?',
    answer:
      'You’ll need transcripts, language proof (if needed), and ID documents. Scholar Bee’s checklist makes it easy.'
  },
  {
    id: 'faq4',
    question: 'Can I apply to multiple universities at once?',
    answer:
      'Yes! Apply to several universities with one simple application through Scholar Bee.'
  },
  {
    id: 'faq5',
    question: 'Who can use Scholar Bee?',
    answer:
      'Anyone! Scholar Bee is for students of all ages, from undergraduate to postgraduate.'
  },
  {
    id: 'faq6',
    question: 'Is Scholar Bee free to use?',
    answer:
      'Yes! Creating a profile and exploring universities is 100% free on Scholar Bee.'
  },
  {
    id: 'faq7',
    question: 'Do I need a high GPA to apply for scholarships?',
    answer:
      'Not always! Scholar Bee has options for merit-based, need-based, and other scholarships.'
  }
];

export const CONTACT_DATA = [
  {
    title: 'Call Us',
    icon: callUsIcon,
    description:
      'Keen to chat with one of our Expert? Go on, we don’t bite. Give us a call on the number below.',
    buttonText: ' 12345 246189'
  },
  {
    title: 'Email Us',
    icon: emailIcon,
    description:
      'Email us now about any problem you face with your business. Do share your concern with us',
    buttonText: '@ Email Us Now',
    focused: true
  },
  {
    title: 'Support',
    icon: settingsIcon,
    description:
      'If you are an existing ScholarBee user looking for any support please open chat bot',
    buttonText: 'Open Chat Bot',
    buttonIcon: chatbotIcon
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: 'Comprehensive Scholarship Database',
    desc: "Our platform boasts a vast and meticulously curated database of scholarships from around the world. Whether you're seeking funding for undergraduate, graduate, or postgraduate studies, Scholarbee provides access to thousands of opportunities."
  },
  {
    id: 2,
    title: 'Personalized Matching Algorithm',
    desc: "At Scholarbee, we understand that every student is unique, with their own set of skills, interests, and aspirations. That's why we've developed a personalized matching algorithm that helps you find scholarships tailored specifically to your profile."
  },
  {
    id: 3,
    title: 'Vibrant Community Engagement',
    desc: 'Join a vibrant and supportive community of students, mentors, and experts on Scholarbee. Engage in discussions, share insights, and seek advice from peers who are navigating similar educational journeys.',
    focused: true
  },
  {
    id: 4,
    title: 'Dedicated Support and Resources',
    desc: "Navigating the world of scholarships and higher education can be overwhelming, but you don't have to do it alone. Scholarbee offers dedicated support and resources to guide you every step of the way."
  }
];

export const BLOGS_CATEGORIES = [
  'Scholarships',
  'Admission',
  'Study Tips',
  'Career Advice'
];

export const COUNTRIES: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971'
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268'
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387'
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61'
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243'
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236'
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242'
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809'
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500'
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691'
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500'
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672'
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246'
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98'
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869'
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850'
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856'
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373'
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590'
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389'
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670'
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508'
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970'
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47'
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239'
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721'
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963'
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649'
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262'
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868'
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan',
    phone: '886'
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255'
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379'
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784'
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284'
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340'
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' }
];

export const OPTIONS: Record<
  ScholarshipsFiltersKeys,
  { value: string; label: string; range?: string }[]
> = {
  studyLevel: [
    { value: 'Bachelor', label: 'Bachelors' },
    { value: 'Master', label: 'Masters' },
    { value: 'PhD', label: 'PhD' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Diploma', label: 'Diploma' }
  ],
  courseFormat: [
    { value: 'Online', label: 'Online' },
    { value: 'Onsite', label: 'Onsite' },
    { value: 'Hybrid', label: 'Hybrid' }
  ],
  majorCourse: [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Business', label: 'Business' },
    { value: 'Design and Arts', label: 'Design and Arts' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Medicine', label: 'Medicine' }
  ],
  fee: [
    { value: 'Annual', label: 'Annual' },
    { value: 'Semester', label: 'Semester' },
    { value: 'Credit Hour', label: 'Credit Hour' }
  ],
  year: getNextTenYears(),
  intake: [
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' }
  ]
};

export const ADMISSION_REQUIREMENTS_DATA = [
  {
    label: 'Eligibility Criteria',
    heading: '1. Eligibility Criteria',
    content:
      'High school diploma or equivalent with a minimum GPA of 3.0 on a 4.0 scale.'
  },
  {
    label: 'Pre Requisite',
    heading: '2. Pre Requisite',
    content:
      'Submission of standardized test scores (SAT, ACT, GRE, GMAT) as per program requirements.'
  },
  {
    label: 'Entry Test',
    heading: '3. Entry Test',
    content: 'Successful completion of the university’s entrance examination.'
  },
  {
    label: 'Interviews',
    heading: '4. Interviews',
    content: 'Participation in an interview with the admissions committee.'
  }
];

// export const FEE_DATA = [
//   {
//     id: 1,
//     label: 'Per Semester',
//     amount: '$20,000',
//     description:
//       'The semester fee is a recurring charge paid by students at the beginning of each academic semester or term.  each academic semester or term'
//   },
//   {
//     id: 2,
//     label: 'Admission Fee',
//     amount: '$5000',
//     description:
//       "This fee is paid by students upon acceptance of their admission offer to the university or college. It covers administrative costs associated with processing the admission application and enrolling the student in the institution's system."
//   },
//   {
//     id: 3,
//     label: 'Tuition Fee',
//     amount: '$1000',
//     description:
//       'The tuition fee is charged based on the number of credit hours or courses a student enrolls in for a particular semester or academic term.'
//   }
// ];

export const RANKING_INFO_ITEMS = [
  { title: '34 Ranking', subtitle: 'World Wide' },
  { title: '24 Ranking', subtitle: 'HEC Rankinge' },
  { title: 'Campus', subtitle: 'Islamabad' },
  { title: 'Found In', subtitle: 'July 1995' }
];

export const PROGRAM_INFO = [
  { title: 'Masters', subtitle: 'Study Level' },
  { title: 'Online', subtitle: 'Study Mode' },
  { title: 'MSc', subtitle: 'Degree' },
  { title: 'Data Science', subtitle: 'Main Subject' }
];
