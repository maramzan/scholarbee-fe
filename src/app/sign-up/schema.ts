import { z } from 'zod';
export const schema = z
  .object({
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    phone_number: z
      .string()
      .min(10, 'Phone Number must be at least 10 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>?~\-\s]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
    agree: z.boolean().refine((v) => v === true, {
      message: 'You must agree to the terms and conditions'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type FormData = z.infer<typeof schema>;
