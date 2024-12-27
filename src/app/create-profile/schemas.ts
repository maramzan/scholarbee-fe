import { z } from 'zod';

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  date_of_birth: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  father_name: z.string().optional(),
  father_status: z.string().optional(),
  father_profession: z.string().optional(),
  father_income: z.string().optional(),
  mother_name: z.string().optional(),
  mother_status: z.string().optional(),
  mother_profession: z.string().optional(),
  mother_income: z.string().optional(),
  religion: z.string().optional(),
  special_person: z.string().optional(),
  profile_image_url: z.string().optional() // Add the profile image URL field
});

export const contactInfoSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phone_number: z.string().nonempty('Phone number is required'),
  fatherEmailAddress: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Invalid email address'
    }),
  fatherPhoneNumber: z.string().optional(),
  provinceOfDomicile: z.string().nonempty('Province of Domicile is required'),
  districtOfDomicile: z.string().nonempty('District of Domicile is required'),
  stateOrProvince: z.string().nonempty('State or Province is required'),
  city: z.string().nonempty('City is required'),
  postalCode: z.string().nonempty('Postal code is required'),
  streetAddress: z.string().nonempty('Street address is required')
});

export const educationalInfoSchema = z.object({
  education_level: z.string().nonempty('Education Level is required'),
  school_college_university: z.string().nonempty('School/College is required'),
  field_of_study: z.string().nonempty('Field of Study is required'),
  marks_gpa: z.object({
    total_marks_gpa: z.string().nonempty('Total Marks/GPA is required'),
    obtained_marks_gpa: z.string().nonempty('Obtained Marks/GPA is required')
  }),
  year_of_passing: z.string().nonempty('Year of Passing is required'),
  board: z.string().nonempty('Board is required'),
  transcript: z.string().optional() // Optional transcript URL
});
