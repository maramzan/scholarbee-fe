import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface MenuItem {
  key: string;
  label: string;
  path: string;
  className?: string;
}

export type Position =
  | 'fixed'
  | 'absolute'
  | 'relative'
  | 'static'
  | 'sticky'
  | undefined;

export type TextAlign =
  | 'center'
  | 'left'
  | 'right'
  | 'justify'
  | 'initial'
  | 'inherit'
  | undefined;

export interface IconButtonProps {
  buttonIcon?: React.ReactNode;
  buttonStyles?: React.CSSProperties;
  title?: string;
  noBorder?: boolean;
  bgColor?: 'light-blue' | 'white';
  size?: 'large' | 'small';
}

export interface Program {
  id: number;
  title: string;
  location: string;
  rating: number;
  deadline: string;
  fee: string;
  // studyMode: 'Online' | 'Offline';
  studyMode: string;
  isScholarshipAvailable: boolean;
  imageUrl: string;
}

export interface ProgramsFilters {
  country?: string;
  university: string;
  universityId: string;
  studyLevel: string;
  major: string;
  courseFormat: string;
  fee: string;
  duration?: string;
  age: string;
  startDate: string;
  rating?: string;
  year: string;
  intake: string;
  courseForm: string;
}

export interface SocialIconType {
  href: string;
  src: string | StaticImport; // Specify the type for the src property
  alt: string;
}
export interface ContactUs {
  title: string;
  icon: StaticImport;
  description: string;
  buttonText: string;
  buttonIcon?: StaticImport;
}

export interface WhyChooseUs {
  id: number;
  title: string;
  desc: string;
  focused?: boolean;
}

export interface HeroSectionInterface {
  illustrationImage?: StaticImport;
  heading: string;
  upperHeading?: string;
  upperHeadingIcon?: StaticImport;
  lowerText?: string;
  illustrationSize?: number;
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export type ScholarshipsFiltersKeys =
  | 'studyLevel'
  | 'majorCourse'
  | 'courseFormat'
  | 'fee'
  | 'year'
  | 'intake';
// | 'country'
// | 'university'
// | 'duration'
// | 'startDate';
// | 'rating';

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  nationality?: string;
  email: string;
  phone_number?: string;
  fatherEmailAddress?: string;
  fatherPhoneNumber?: string;
  provinceOfDomicile?:
    | 'khyber_pakhtunkhwa'
    | 'punjab'
    | 'sindh'
    | 'balochistan';
  districtOfDomicile?: string;
  stateOrProvince?: string;
  city?: string;
  postalCode?: string;
  streetAddress?: string;
  address_id?: string; // Assuming this references another collection
  user_type: 'Student' | 'Admin';
  registration_no?: string;
  university_id?: string; // Assuming this references another collection
  campus_id?: string; // Assuming this references another collection
  user_profile_id?: string; // Assuming this references another collection
  profile_image_url?: string;
  educational_backgrounds?: EducationalBackground[];
  national_id_card?: NationalIDCard;
  created_at: string; // Date field, should be a string representing a date
  verifyToken?: string;
  _verified?: boolean;
}

// Nested structures
interface EducationalBackground {
  education_level?:
    | 'Matriculation'
    | 'Intermediate/FSc/FA'
    | 'Bachelors'
    | 'Masters'
    | 'PhD';
  field_of_study?: string;
  school_college_university?: string;
  marks_gpa?: MarksGPA;
  year_of_passing?: string;
  board?: string;
  transcript?: string; // URL of the transcript
}

interface MarksGPA {
  total_marks_gpa?: string;
  obtained_marks_gpa?: string;
}

interface NationalIDCard {
  front_side?: string; // URL of the front side
  back_side?: string; // URL of the back side
}

export interface FilterSectionProps {
  formData: ProgramsFilters;
  handleChange: (name: string, value: string) => void;
  handleUniversityChange: (name: string, value: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilters: () => void;
  showFilters: boolean;
  isFetching: boolean;
  isSmallScreen: boolean;
}
